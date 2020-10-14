import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const ModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
    modalContent: {
      minWidth: "400px",
    },
  })
);

export default ModalStyles;
