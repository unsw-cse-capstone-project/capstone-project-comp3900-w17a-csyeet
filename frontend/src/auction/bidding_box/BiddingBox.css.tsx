import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const BiddingBoxStyle = makeStyles((theme: Theme) =>
  createStyles({
    bidderBox: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(6, 0),
      minHeight: theme.spacing(20),
    },
    tagContainer: {
      width: "50%",
    },
    inputContainer: {
      display: "flex",
      width: "70%",
      marginTop: theme.spacing(2),
    },
    placeBidButton: {
      minWidth: "min-content",
      whiteSpace: "nowrap",
      marginLeft: theme.spacing(2),
    },
  })
);
