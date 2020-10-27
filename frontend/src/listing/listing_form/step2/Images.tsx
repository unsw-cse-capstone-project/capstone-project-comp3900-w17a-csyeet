import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Button, IconButton } from "@material-ui/core";
import { ListingStore } from "../../ListingStore";
import { ImagesStyles } from "./Images.css";

export const Images: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const [images, setImages] = React.useState<ImageListType>([]);
    const maxNumber = 20;
    const onChange = action(
      (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        store.images = imageList;
      }
    );

    const [hover, setHover] = React.useState<boolean>(false);
    const classes = ImagesStyles();
    return (
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div>
            <div className={classes.previewContainer}>
              {imageList.map((image, index) => (
                <div key={index} className={classes.imgContainer}>
                  <IconButton
                    className={classes.imgEdit}
                    onClick={() => onImageUpdate(index)}
                  >
                    <EditIcon style={{ color: "#FFF" }} />
                  </IconButton>
                  <IconButton
                    className={classes.imgDelete}
                    onClick={() => onImageRemove(index)}
                  >
                    <HighlightOffIcon style={{ color: "#FFF" }} />
                  </IconButton>
                  <img
                    src={image.data_url}
                    alt="images"
                    height="300px"
                    width="auto"
                  />
                </div>
              ))}
              <Button
                variant="outlined"
                className={classes.dropzone}
                color={isDragging ? "secondary" : "default"}
                startIcon={<AddAPhotoOutlinedIcon />}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Images
              </Button>
            </div>
            <Button onClick={onImageRemoveAll}>Remove all images</Button>
          </div>
        )}
      </ImageUploading>
    );
  }
);
