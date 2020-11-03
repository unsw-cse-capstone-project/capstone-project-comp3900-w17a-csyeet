import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ProfilePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    userInfoContainer: {
      position: "sticky",
      backgroundColor: "#F3F4F5",
      padding: theme.spacing(2, "15%", 2, "15%"),
      zIndex: 5,
      top: "0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    blurbStyle: {
      marginTop: theme.spacing(5),
      borderWidth: "1px",
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
    avatar: {
      width: "200px",
      height: "200px",
      margin: theme.spacing(1, 1, 2, 1),
    },
  })
);
