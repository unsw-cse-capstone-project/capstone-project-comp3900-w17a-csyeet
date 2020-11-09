import { Snackbar, Typography } from "@material-ui/core";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ListingMessagesPageStyles } from "./ListingMessagesPage.css";
import { MessagePlaceholder } from "../messages/main";
import { useStore } from "../AuthContext";
import Talk from "talkjs";
import MuiAlert from "@material-ui/lab/Alert";
import { BackButton } from "../ui/base/back_button/BackButton";

export const ListingMessagesPage = () => {
  const { id } = useParams<{ id: string }>();
  const classes = ListingMessagesPageStyles();
  const history = useHistory();
  const talkJsContainer = React.createRef<HTMLDivElement>();
  const userStore = useStore();
  const [error, setError] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    Talk.ready.then(async () => {
      if (!userStore || !userStore.user) {
        return null;
      }

      try {
        const response = await fetch(`/listings/${id}`);
        const listing = await response.json();
        if ("details" in listing) {
          setError(listing.details);
          return;
        }

        if (listing.owner.id !== userStore.user.id) {
          setError("You are not the owner for this property");
          return;
        }
      } catch {
        setError("Listing not found please try a different listing.");
        return;
      }

      const me = new Talk.User({
        id: userStore.user.id,
        name: userStore.user.name,
        email: userStore.user.email,
        photoUrl: `/users/${userStore.user.id}/avatar`,
        role: "user",
      });

      (window as any).talkSession = new Talk.Session({
        appId: "tLGE8KKA",
        me: me,
      });

      const inbox = (window as any).talkSession.createInbox();
      inbox.mount(talkJsContainer.current);
      inbox.setFeedFilter({ custom: { listingId: ["==", id] } });
    });
    // eslint-disable-next-line
  }, [userStore?.user]);
  return (
    <div className={classes.page}>
      <div className={classes.buttonContainer}>
        <BackButton
          onClick={() => history.push(`/listing/${id}`)}
          text="Back to Listing"
        />
      </div>
      <Typography variant="h3" className={classes.title}>
        Your Messages
      </Typography>
      {!error && (
        <div ref={talkJsContainer} className={classes.messageBox}>
          <MessagePlaceholder />
        </div>
      )}
      <Snackbar
        open={error !== undefined}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
