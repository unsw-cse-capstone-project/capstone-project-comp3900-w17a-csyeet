import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ProfilePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    userInfo: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
      },
      position: "relative",
      backgroundColor: "#F3F4F5",
      padding: theme.spacing(5, "15%", 5, "15%"),
      zIndex: 5,
      top: "0",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    blurbStyle: {
      marginTop: theme.spacing(1),
      width: "70%",
      
    },
    tabBar: {
      position: "sticky",
      backgroundColor: "white",
      padding: "20px",
      zIndex: 5,
      top: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
