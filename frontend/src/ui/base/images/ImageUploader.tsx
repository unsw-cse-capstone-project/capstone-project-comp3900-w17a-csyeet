import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { ImagesStyles } from "./ImageUploader.css";

export const ImageUploader: React.FC<{
  onImageChange: (images: ImageListType) => void;
  value?: ImageType;
  imageHeight?: string;
  max?: number;
  style?: React.CSSProperties;
  className?: string;
}> = observer(
  ({
    onImageChange,
    value = [],
    imageHeight = "300px",
    max = 20,
    style,
    className,
  }) => {
    const [images, setImages] = React.useState<ImageListType>(
      value as ImageListType
    );
    const onChange = action(
      (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList);
        onImageChange(imageList);
      }
    );

    const classes = ImagesStyles();
    return (
      <div className={classNames(className)} style={style}>
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={max}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div>
              <div className={classes.previewContainer}>
                {imageList.map((image, index) => (
                  <div key={index} className={classes.imgContainer}>
                    <IconButton
                      className={classes.imgDelete}
                      onClick={() => onImageRemove(index)}
                    >
                      <HighlightOffIcon style={{ color: "#FFF" }} />
                    </IconButton>
                    <img
                      src={image.data_url}
                      alt="uploaded-img"
                      style={{
                        objectFit: "cover",
                        height: "300px",
                        width: "auto",
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outlined"
                  className={classes.dropzone}
                  style={{ height: imageHeight, width: imageHeight }}
                  color={isDragging ? "secondary" : "default"}
                  startIcon={<AddAPhotoOutlinedIcon />}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload Images
                </Button>
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    );
  }
);
