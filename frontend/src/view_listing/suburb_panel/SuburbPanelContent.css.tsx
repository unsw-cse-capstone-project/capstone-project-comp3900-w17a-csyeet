import { makeStyles, Theme } from "@material-ui/core";

export const SuburbPanelContentStyle = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  tabs: {
    [theme.breakpoints.up("md")]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      width: "fit-content",
    },
    [theme.breakpoints.down("sm")]: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      width: "100%",
    },
  },
  lastRow: {
    borderBottom: "none",
  },
  tab: {
    minWidth: "70px",
    paddingLeft: 0,
  },
}));

export const TabPanelStyle = makeStyles((theme: Theme) => ({
  box: {
    [theme.breakpoints.up("md")]: {
      padding: "0 10px 0 10px",
      width: "100%",
      boxSizing: "border-box",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
}));
