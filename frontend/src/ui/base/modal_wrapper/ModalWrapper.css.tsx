import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const ModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      padding: theme.spacing(2, "20%", 0, "20%"),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2, "5%", 0, "5%"),
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      maxHeight: "calc(100% - 20%)",
      overflowY: "scroll",
    },
  })
);

export default ModalStyles;
