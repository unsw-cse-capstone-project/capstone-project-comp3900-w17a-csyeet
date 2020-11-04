import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const ListingFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabContainer: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
    header: {
      position: "sticky",
      backgroundColor: "white",
      paddingTop: "30px",
      zIndex: 5,
      top: "0",
    },
    headerContent: {
      display: "flex",
      flexDirection: "column",
    },
    body: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    backToEditingButton: {
      width: "fit-content",
      marginBottom: theme.spacing(2),
    },
    headerButtons: {
      display: "flex",
      justifyContent: "space-between",
    },
    footer: {
      marginTop: "30px",
      display: 'flex',
      justifyContent: "center",
    }
  })
);
