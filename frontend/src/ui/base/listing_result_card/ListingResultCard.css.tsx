import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ListingResultCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageContainer: {
      width: "100%",
      height: "300px",
      objectFit: "contain",
      backgroundColor: "rgba(0,0,0, 0.8)",
    },
    card: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    cardContent: {
      width: "100%",
      position: "relative",
      boxSizing: "border-box",
    },
    sliderContainer: {
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
      height: "300px",
    },
    detailBar: {
      display: "flex",
      margin: theme.spacing(1, 0, 0, 0),
      flexWrap: "wrap",
      alignContent: 'center',
    },
    icons: {
      display: "flex",
      flexWrap: "wrap",
      alignContent: 'center',
    },
    description: {
      boxSizing: "border-box",
      display: "-webkit-box",
      // eslint-disable-next-line
      ["-webkit-line-clamp"]: 3,
      // eslint-disable-next-line
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
      margin: theme.spacing(2, 0, 0, 0),
    },
    starContainer: {
      position: "absolute",
      top: theme.spacing(1.5),
      right: theme.spacing(1.5),
    },
    reserve_met: {
      color: theme.palette.success.main,
    },
    reserve_not_met: {
      color: theme.palette.success.main,
    },
    link: {
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "& h6, & h4": {
          color: theme.palette.primary.main,
        },
      },
      textDecoration: "none",
    },
    title: {
      paddingRight: "35px"
    },
    type: { textTransform: "capitalize", marginLeft: "12px" },
  })
);

export const ListingFeatureIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
    },
    text: {
      padding: theme.spacing(0, 1, 0, 1.5),
    },
    icon: {
      color: "black",
    },
  })
);
