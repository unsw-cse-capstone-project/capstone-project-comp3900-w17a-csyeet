import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const SuburbPanelStyle = makeStyles((theme: Theme) => ({
  accordianSummary: {
    paddingLeft: "0px",
    marginBottom: 0,
    borderBottom: "solid 1px #eee"
  },
  accordianDetails: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(3)
  },
  textContainer: {
    backgroundColor: theme.palette.secondary.light,
    opacity: 0.7,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.background.paper
  }
}));