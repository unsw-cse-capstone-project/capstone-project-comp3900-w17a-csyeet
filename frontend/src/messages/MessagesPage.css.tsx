import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { callbackify } from "util";

export const MessagesPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      paddingBottom: theme.spacing(10),
    },
    messageBox: {
        height: "70%",
        width: "100%",
    },
    title: {
        margin: theme.spacing(2),
    }
  })
);

export const MessagesPagePlaceholderStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerStage: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        maxWidth: "calc(300px + 20px + 420px)",
        margin: "0 auto",
    },
    chatBox: {
        width: "calc(60% - 20px)",
        marginLeft: "20px",
        maxWidth: "calc(100% - 270px)",
        height: "100%",
    }
  })
);
