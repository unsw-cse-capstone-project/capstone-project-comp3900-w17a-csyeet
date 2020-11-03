import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ProfilePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    userInfo: {
      position: "relative",
      backgroundColor: "#F3F4F5",
      padding: theme.spacing(5, 0),
      zIndex: 5,
      top: "0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
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
