import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const LandmarksPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      width: "100%",
    },
    lastRow: {
      borderBottom: "none",
    },
    firstCell: {
      fontWeight: "bold",
    },
    summary: {
      paddingLeft: "0px",
    },
    details: {
      paddingLeft: 0,
      paddingRight: 0,
      display: "flex",
      flexDirection: "column",
      borderTop: "solid 1px #eee",
    },
  })
);
