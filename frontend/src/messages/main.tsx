import { observer } from "mobx-react";
import * as React from "react";
import Talk from "talkjs";
import { useStore } from "../AuthContext";
import {
  MessagesPageStyles,
  MessagesPagePlaceholderStyles,
} from "./MessagesPage.css";
import { Typography, Snackbar } from "@material-ui/core";
import ReactPlaceholder from "react-placeholder/lib/ReactPlaceholder";
import { useQuery } from "../search/main";
import MuiAlert from "@material-ui/lab/Alert";
import { ErrorBoundaryPage } from '../ui/base/error_boundary/ErrorBoundary';

export const appId = () => {
  switch(process.env.REACT_APP_MESSAGE_MODE) {
    case 'prod':
      return "t2KS7sjh";
    case 'demo':
      return "tJD2Q1mh";
    default:
      return "tLGE8KKA";
  }
}
console.log(appId())
/**
 * Page where users can view history of all messages made andc communicate
 * with other buyers and sellers
 */
export const MessagesPage = observer(() => {
  const classes = MessagesPageStyles();
  const userStore = useStore();
  const talkJsContainer = React.createRef<HTMLDivElement>();
  const params = useQuery();
  const [error, setError] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    Talk.ready.then(async () => {
      if (!userStore || !userStore.user) {
        return null;
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

      const to = params.get("to");
      if (to) {
        try {
          const response = await fetch(`listings/${to}`);
          const listingObject = await response.json();
          if ("detail" in listingObject) {
            setError(listingObject.detail);
            return;
          }
          if (
            new Date().getTime() > new Date(listingObject.auction_end).getTime()
          ) {
            setError(
              `Listing: ${listingObject.street} is closed and cannot send messages to the seller`
            );
            return;
          }

          if (listingObject.owner.id === userStore.user.id) {
            setError(
              `You are the owner of listing: ${listingObject.street}, cannot send mesages to yourself`
            );
            return;
          }
          const other = new Talk.User({
            id: listingObject.owner.id,
            name: listingObject.owner.name,
            email: listingObject.owner.email,
            photoUrl: `/users/${listingObject.owner.id}/avatar`,
            role: "user",
          });
          const address = `${listingObject.street}, ${listingObject.suburb}, ${listingObject.state} ${listingObject.postcode}`;
          const conversation = (window as any).talkSession.getOrCreateConversation(
            `seller:${to}buyer:${userStore.user.id}listing:${to}`
          );
          conversation.setParticipant(me);
          conversation.setParticipant(other);
          conversation.setAttributes({
            subject: address,
            custom: { listingId: to },
          });
          const inbox = (window as any).talkSession.createInbox({
            selected: conversation,
          });
          if (!!talkJsContainer.current) {
            inbox.mount(talkJsContainer.current);
          }
        } catch (e) {
          setError("Error occurred when finding the listing");
        }
      } else {
        const inbox = (window as any).talkSession.createInbox();
        if (!!talkJsContainer.current) {
          inbox.mount(talkJsContainer.current);
        }
      }
    });
    // eslint-disable-next-line
  }, [userStore?.user, talkJsContainer, params]);
  return (
    <div className={classes.page}>
      <Typography variant="h3" className={classes.title}>
        Your Messages
      </Typography>
      <div ref={talkJsContainer} className={classes.messageBox}>
        <MessagePlaceholder />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!error}
      >
        <MuiAlert elevation={6} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </div>
  );
});

export const MessagePlaceholder = () => {
  const classes = MessagesPagePlaceholderStyles();
  return (
    <ErrorBoundaryPage>
      <div className={classes.centerStage}>
        <ReactPlaceholder
          showLoadingAnimation={true}
          type="rect"
          ready={false}
          style={{ maxWidth: 300, height: 100 }}
        >
          {null}
        </ReactPlaceholder>
        <ReactPlaceholder
          showLoadingAnimation={true}
          type="rect"
          ready={false}
          className={classes.chatBox}
        >
          {null}
        </ReactPlaceholder>
      </div>
    </ErrorBoundaryPage>
  );
};
