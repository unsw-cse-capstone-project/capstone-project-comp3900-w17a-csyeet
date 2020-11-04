import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Button, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { ImagesStyles } from "./ImageUploader.css";

export const ImageUploader: React.FC<{
  onImageChange: (images: ImageListType) => void;
  value?: ImageType;
  imageHeight?: string;
  multiple?: boolean;
  max?: number;
  style?: React.CSSProperties;
  className?: string;
}> = observer(
  ({
    onImageChange,
    value = [],
    imageHeight = "300px",
    multiple = true,
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
          multiple={multiple}
          value={images}
          onChange={onChange}
          maxNumber={max}
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
                      alt="uploaded-img"
                      height={imageHeight}
                      width="auto"
                    />
                  </div>
                ))}
                {(multiple || (!multiple && images.length === 0)) && (
                  <Button
                    variant="outlined"
                    className={classes.dropzone}
                    style={{ height: imageHeight, width: imageHeight }}
                    color={isDragging ? "secondary" : "default"}
                    startIcon={<AddAPhotoOutlinedIcon />}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Upload Image{multiple && "s"}
                  </Button>
                )}
              </div>
              {multiple && (
                <Button onClick={onImageRemoveAll}>Remove all images</Button>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    );
  }
);
