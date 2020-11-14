import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const RecommendationsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      margin: 0,
      paddingRight: "24px",
    },
    leftIcon: {
      position: "absolute",
      left: "-50px",
      top: "50%",
      zIndex: 2,
      transform: "translateY(-50%)",
    },
    rightIcon: {
      position: "absolute",
      right: "-25px",
      zIndex: 2,
      top: "50%",
      transform: "translateY(-50%)",
    },
    swipeableView: {
      width: "100%",
      height: "100%",
    },
    emptyStateText: {
      width: "100%",
    }
  })
);
