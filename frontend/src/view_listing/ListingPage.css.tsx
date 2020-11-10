import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const listingPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: { paddingBottom: "200px" },
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
    
    starContainer: {
      position: "absolute",
      top: "40px",
      right: "calc(15vw + 10px)",
      cursor: "pointer",
      zIndex: 100000,
    },
    greyBackground: {
      margin: "20px -15vw",
      padding: "30px 15vw",
      backgroundColor: "#f3f4f5",
      position: "relative",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
