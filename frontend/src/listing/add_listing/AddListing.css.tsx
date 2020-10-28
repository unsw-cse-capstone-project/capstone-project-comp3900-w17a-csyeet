import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const AddListingStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "hidden",
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "500px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    form: {
      padding: "20px",
      maxWidth: "800px",
      flexGrow: 1,
    },
  })
);
