import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const DetailStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    cancelButton: {
      position: "absolute",
      top: "10px",
      right: "100px",
    },
    editButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    addressFormStyle: {
      marginTop: "40px",
    },
  })
);
