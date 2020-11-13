import React from "react";
import { Avatar, Button, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useStore } from "../../AuthContext";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Close";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { createStyles, makeStyles, Theme, Avatar } from "@material-ui/core";
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
    avatarImage: {
      objectFit: "cover",
      height: "200px",
      width: "200px",
      borderRadius: "50%",
    },
    editIcon: {
      position: "absolute",
      bottom: "10px",
      right: "0px",
    },
  })
);

export const ProfileAvatar = ({
  avatar = "",
  onUpload,
  className,
}: {
  onUpload: (image: File, img_url: string) => void;
  avatar?: string;
  className?: string;
}) => {
  const userStore = useStore();
  if (!userStore) throw Error("Userstor should never be null");
  if (!userStore.user) throw Error("User not logged in");
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
          <Avatar
            src={`/users/${userStore?.user.id}/avatar`}
            style={{ width: "200px", height: "200px" }}
          />
          <Fab
            size="small"
            color="secondary"
            onClick={() => setEdit(true)}
            className={classes.editIcon}
          >
            <EditIcon fontSize={"small"} />
          </Fab>
        </div>
      )}
    </div>
  );
};

const ImageEditorStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadButton: {
      position: "absolute",
      bottom: "10px",
      right: "0px",
    },
    image: {
      objectFit: "cover",
      height: "200px",
      width: "200px",
      borderRadius: "50%",
    },
  })
);

const ImageEditor = ({
  onUpload,
  onBack,
  avatarClassName,
}: {
  onUpload: (image: File, img_url: string) => void;
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
  const classes = ImageEditorStyles();
  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ onImageUpload, onImageUpdate, onImageRemove }) => (
        <div>
          {images.length === 1 ? (
            <div>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={avatarClassName}
                  style={{ position: "relative" }}
                >
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => {
                      onUpload(
                        images[0].file as File,
                        images[0].dataURL as string
                      );
                      onBack();
                    }}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                    }}
                  >
                    <PublishIcon fontSize="small" />{" "}
                  </Fab>
                  <Fab
                    size="small"
                    color="default"
                    onClick={() => onImageRemove(index)}
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "45px",
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Fab>
                  <img
                    src={image.data_url}
                    className={classes.image}
                    alt="uploaded-profile-img"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <Button
                variant="outlined"
                onClick={onImageUpload}
                className={avatarClassName}
              >
                <AddAPhotoOutlinedIcon fontSize="small" />
                Drop/Upload
              </Button>
              <Fab
                size="small"
                color="default"
                onClick={onBack}
                style={{
                  position: "absolute",
                  bottom: "30px",
                  right: "10px",
                }}
              >
                <CloseIcon fontSize="small" />
              </Fab>
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};
