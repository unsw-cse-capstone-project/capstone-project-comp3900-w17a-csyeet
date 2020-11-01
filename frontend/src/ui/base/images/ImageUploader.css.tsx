import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const ImagesStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewContainer: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    imgContainer: {
      position: "relative",
      margin: "10px",
      height: "300px",
      width: "auto",
      "&:hover": {
        background: "#a9a9a9",
      },
    },
    imgEdit: {
      position: "absolute",
      top: "0px",
      left: "0px",
    },
    imgDelete: {
      position: "absolute",
      top: "0px",
      right: "0px",
    },
    dropzone: {
      margin: "10px",
    },
  })
);
