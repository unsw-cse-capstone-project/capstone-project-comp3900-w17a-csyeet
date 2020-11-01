import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const ModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      padding: theme.spacing(2, "20%", 0, "20%"),
      display: "flex",
      flexDirection: "column",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default ModalStyles;
