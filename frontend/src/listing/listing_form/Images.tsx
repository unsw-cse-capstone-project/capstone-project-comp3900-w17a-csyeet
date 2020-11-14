import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { ListingStore } from "../ListingPresenter";
import { ImageUploader } from "../../ui/base/input/ImageUploader";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ImageListType } from "react-images-uploading";

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
    deleteButton: {
      position: "absolute",
      top: "0px",
      right: "0px",
    },
  })
);

export const Images: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const classes = ImagesStyles();
    const onImageChange = action((images: ImageListType) => {
      store.imageList = images;
    });

    const onDeleteImage = action((image: string) => {
      store.imagesToDelete.push(image);
      store.listing.images = store.listing.images.filter(function (img) {
        return img !== image;
      });
    });

    return (
      <div>
        <div className={classes.previewContainer}>
          {store.listing.images.map((image, i) => (
            <div key={i} className={classes.imgContainer}>
              <IconButton
                className={classes.deleteButton}
                onClick={() => onDeleteImage(image)}
              >
                <HighlightOffIcon style={{ color: "#FFF" }} />
              </IconButton>
              <img
                src={image}
                alt="uploaded-img"
                style={{
                  objectFit: "cover",
                  height: "300px",
                  width: "auto",
                }}
              />
            </div>
          ))}
        </div>
        <ImageUploader onImageChange={onImageChange} value={store.imageList} />
      </div>
    );
  }
);
