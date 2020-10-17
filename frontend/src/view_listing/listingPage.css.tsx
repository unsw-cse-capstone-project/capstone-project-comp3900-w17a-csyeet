import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const listingPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: theme.spacing(2, "15%", 0, "15%"),
      display: "flex",
      flexDirection: "column",
    },
    backButton: {
      width: "fit-content",
    },
    header: {
      marginTop: theme.spacing(4),
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
      marginBottom: theme.spacing(1),
    },
    imageContainer: {
      width: "100%",
      height: "500px",
      objectFit: "contain",
      backgroundColor: "rgba(0,0,0, 0.8)",
    },
    sliderContainer: {
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      height: "500px",
    },
    title: {
      margin: theme.spacing(2, 0, 1, 0),
    },
    description: {
      margin: theme.spacing(0, 0, 3, 0),
    },
    detailBar: {
      display: "flex",
      margin: theme.spacing(2, 0),
      justifyContent: "flex-end",
      alignItems: "center",
    },
    badge: {
      "& span": {
        padding: theme.spacing(2),
        borderRadius: "10000px",
        // transform: "translate(50%, -20%)"
        transform: "translate(10%, 40%)",
        boxShadow: theme.shadows[1],
      },
    },
    photoGrid: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "space-between",
      },
      "& img": {
        objectFit: "cover",
        [theme.breakpoints.up("md")]: {
          width: "100%",
          height: "49%",
        },
        [theme.breakpoints.down("sm")]: {
          width: "49%",
        },
      },
    },
  })
);
