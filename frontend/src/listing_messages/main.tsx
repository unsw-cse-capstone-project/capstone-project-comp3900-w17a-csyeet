import { Snackbar, Typography } from "@material-ui/core";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ListingMessagesPageStyles } from "./ListingMessagesPage.css";
import { MessagePlaceholder, appId } from '../messages/main';
import { useStore } from "../AuthContext";
import Talk from "talkjs";
import MuiAlert from "@material-ui/lab/Alert";
import { BackButton } from "../ui/base/back_button/BackButton";
import { ErrorBoundaryPage } from "../ui/base/error_boundary/ErrorBoundary";

const authorisation = () => {
  switch(process.env.REACT_APP_MESSAGE_MODE) {
    case 'prod':
      return "Bearer sk_test_BiYORmy36eRLyEOeQXJdQqYf";
    case 'demo':
      return "Bearer sk_test_OVl1chkSAKFwzF2MjrcAx7mE";
    default:
      return "Bearer sk_test_5uJYlEu4E2Csed2XqVc7QnHd";
  }
}
console.log(authorisation());
/**
 * Page where an owner of a property can view all of the messages from potential
 * buyers relating to a specific property
 */
export const ListingMessagesPage = () => {
  const { id } = useParams<{ id: string }>();
  const classes = ListingMessagesPageStyles();
  const history = useHistory();
  const talkJsContainer = React.createRef<HTMLDivElement>();
  const userStore = useStore();
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [numConversations, setNumConversations] = React.useState(-1);
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
        appId: appId(),
        me: me,
      });

      const inbox = (window as any).talkSession.createInbox();
      inbox.mount(talkJsContainer.current);
      const filter = {custom: {listingId: ["==", `${id}`]}};
      const encodedFilter = encodeURIComponent(JSON.stringify(filter));
      const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.talkjs.com/v1/${appId()}/conversations?filter=${encodedFilter}`, {
        headers: {
          Authorization: authorisation(),
        }
      });
      const conversations = await res.json();
      if (conversations.data.length === 0) {
        setNumConversations(0);
      } else {
        inbox.setFeedFilter({ custom: { listingId: ["==", id] } });
      }
    });
    // eslint-disable-next-line
  }, [userStore?.user]);
  return (
    <ErrorBoundaryPage>
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
        {
          numConversations === 0 && <Typography variant="body1" align="center" color="textSecondary">No messages found</Typography>
        }
        {!error && numConversations !== 0 && (
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
    </ErrorBoundaryPage>
  );
};
