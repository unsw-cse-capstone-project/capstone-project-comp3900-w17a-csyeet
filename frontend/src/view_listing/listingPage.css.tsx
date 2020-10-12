import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const listingPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: theme.spacing(2, "15%", 0, "15%"),
      display: "flex",
      flexDirection: "column"
    },
    backButton: {
      width: "fit-content"
    },
    header: {
      margin: theme.spacing(4, 0, 0, 0)
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
      margin: theme.spacing(0, 0, 1, 0)
    },
    imageContainer: {
      width: "100%",
      height: "500px",
      objectFit: "contain",
      backgroundColor: "rgba(0,0,0, 0.8)"
    },
    sliderContainer: {
      [theme.breakpoints.up("md")]: {
        width: "100%"
      },
      height: "500px"
    },
    street: {
      padding: theme.spacing(2, 0, 0, 0)
    },
    title: {
      margin: theme.spacing(4, 0, 1, 0)
    },
    description: {
      margin: theme.spacing(0, 0, 3, 0)
    },
    detailBar: {
      display: "flex",
      margin: theme.spacing(1, 0, 0, 0),
      justifyContent: "flex-end",
      padding: theme.spacing(2, 0, "15%", 0)
    }
  })
);
