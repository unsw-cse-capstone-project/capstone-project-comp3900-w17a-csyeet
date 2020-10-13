import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const ModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
<<<<<<< HEAD
      zIndex: 1,
=======
>>>>>>> 70c2d52c009a38022b19cd0cce5c16e180de6a28
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default ModalStyles;
