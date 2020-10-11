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
    sliderContainer: {
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
      height: "300px",
    },
    detailBar: {
      display: "flex",
      margin: theme.spacing(1, 0, 0, 0),
    },
    description: {
      boxSizing: "border-box",
      display: "-webkit-box",
      ["-webkit-line-clamp"]: 3,
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
      margin: theme.spacing(2, 0, 0, 0),
    },
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
  })
);
