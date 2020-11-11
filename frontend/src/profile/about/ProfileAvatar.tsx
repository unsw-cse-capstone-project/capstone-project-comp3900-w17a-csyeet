import React from "react";
import { Button, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Publish";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ImageUploading, { ImageListType } from "react-images-uploading";
export const AvatarStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: "200px",
      height: "200px",
      margin: theme.spacing(1, 1, 2, 1),
    },
    avatarStyle: {
      position: "relative",
      height: "200px",
      width: "200px",
      borderRadius: "50%",
      margin: theme.spacing(1, 1, 2, 1),
      "&:hover": {
        background: "#a9a9a9",
      },
    },
  })
);

export const ProfileAvatar = ({
  avatar = "",
  onUpload,
  className,
}: {
  onUpload: (image: File) => void;
  avatar?: string;
  className?: string;
}) => {
  const mode: boolean = avatar === "" ? true : false;
  const [edit, setEdit] = React.useState<boolean>(mode);
  const classes = AvatarStyles();
  return (
    <div className={className}>
      {edit ? (
        <ImageEditor
          onUpload={onUpload}
          onBack={() => setEdit(false)}
          avatarClassName={classes.avatarStyle}
        />
      ) : (
        <div className={classes.avatarStyle}>
          <img
            src={avatar}
            style={{
              objectFit: "cover",
              height: "200px",
              width: "200px",
              borderRadius: "50%",
            }}
            alt="uploaded-profile-img"
          />
          <Fab
            size="small"
            color="secondary"
            aria-label="Edit"
            onClick={() => setEdit(true)}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "0px",
            }}
          >
            <EditIcon fontSize={"small"} />
          </Fab>
        </div>
      )}
    </div>
  );
};

const ImageEditor = ({
  onUpload,
  onBack,
  avatarClassName,
}: {
  onUpload: (image: File) => void;
  onBack: () => void;
  avatarClassName: string;
}) => {
  const [images, setImages] = React.useState<ImageListType>([]);
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };
  return (
<<<<<<< Updated upstream
    <>
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ onImageUpload, onImageUpdate, onImageRemove }) => (
          <div>
            {images.length === 1 ? (
              <div>
                {images.map((image, index) => (
                  <div key={index} className={avatarClassName}>
                    <Button
                      size={"small"}
                      variant="contained"
                      onClick={() => onImageRemove(index)}
                      style={{
                        position: "absolute",
                        bottom: "45px",
                        right: "0px",
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size={"small"}
                      onClick={() => {
                        onUpload(
                          images[0].file as File,
                          images[0].dataURL as string
                        );
                        onBack();
                      }}
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "0px",
                      }}
                    >
                      Upload
                      <PublishIcon
                        style={{ marginLeft: "3px" }}
                        fontSize="small"
                      />
                    </Button>
=======
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ onImageUpload, onImageUpdate, onImageRemove }) => (
        <div>
          {images.length === 1 ? (
            <div>
              {images.map((image, index) => (
                <div key={index} className={avatarClassName}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => onImageRemove(index)}
                    className={classes.removeButton}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size={"small"}
                    onClick={() => {
                      onUpload(images[0].file as File);
                      onBack();
                    }}
                    className={classes.uploadButton}
                  >
                    Upload
                    <PublishIcon
                      style={{ marginLeft: "3px" }}
                      fontSize="small"
                    />
                  </Button>
>>>>>>> Stashed changes

                    <img
                      src={image.data_url}
                      style={{
                        objectFit: "cover",
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                      }}
                      alt="uploaded-profile-img"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Button
                variant="outlined"
                onClick={onImageUpload}
                className={avatarClassName}
              >
                <AddAPhotoOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                Drop/Upload
                <Button
                  size={"small"}
                  variant="contained"
                  onClick={() => onBack()}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "0px",
                  }}
                >
                  Back
                </Button>
              </Button>
            )}
          </div>
        )}
      </ImageUploading>
    </>
  );
};
