import { observer } from "mobx-react";
import * as React from "react";
import Talk from "talkjs";
import { useStore } from "../AuthContext";
import {
  MessagesPageStyles,
  MessagesPagePlaceholderStyles,
} from "./MessagesPage.css";
import { Typography } from "@material-ui/core";
import ReactPlaceholder from "react-placeholder/lib/ReactPlaceholder";
import { useQuery } from "../search/main";

export const MessagesPage = observer(() => {
  const classes = MessagesPageStyles();
  const userStore = useStore();
  const talkJsContainer = React.createRef<HTMLDivElement>();
  const params = useQuery();
  React.useEffect(() => {
    Talk.ready.then(async () => {
      if (!userStore || !userStore.user) {
        return null;
      }

      const me = new Talk.User({
        id: userStore.user.id,
        name: userStore.user.name,
        email: userStore.user.email,
        role: "user",
      });

      (window as any).talkSession = new Talk.Session({
        appId: "tLGE8KKA",
        me: me,
      });

      const to = params.get('to');
      const name = params.get('name');
      const email = params.get('email');
      const listing = params.get('listing');
      if (to && name && email && listing) {
        const other= new Talk.User({
          id: to,
          name: name,
          email: email,
          role: "user",
        });
        const response = await fetch(`listings/${listing}`);
        const listingObject = await response.json();
        const address = `${listingObject.street}, ${listingObject.suburb}, ${listingObject.state} ${listingObject.postcode}`;
        const conversation = (window as any).talkSession.getOrCreateConversation(`seller:${to}buyer:${userStore.user.id}listing:${listing}`);
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        conversation.setAttributes({subject: address, custom: {"listingId": listing}});
        const inbox = (window as any).talkSession.createInbox({selected: conversation});
        inbox.mount(talkJsContainer.current);
        // inbox.setFeedFilter({ custom: { "listingId": ["==", listing] } })
      } else {
        const inbox = (window as any).talkSession.createInbox();
        inbox.mount(talkJsContainer.current);
      }

    });
  }, [userStore?.user]);
  return (
    <div className={classes.page}>
      <Typography variant="h3" className={classes.title}>
        Your Messages
      </Typography>
      <div ref={talkJsContainer} className={classes.messageBox}>
        <MessagePlaceholder />
      </div>
    </div>
  );
});

export const MessagePlaceholder = () => {
  const classes = MessagesPagePlaceholderStyles();
  return (
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
        // style={{ maxWidth: 300, height: 100 }}
      >
        {null}
      </ReactPlaceholder>
    </div>
  );
};
