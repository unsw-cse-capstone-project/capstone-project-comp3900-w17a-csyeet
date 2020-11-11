import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { ImageListType } from "react-images-uploading";
import { ListingStore } from "../ListingStore";
import { ImageUploader } from "../../ui/base/images/ImageUploader";

export const Images: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const onImageChange = action((images: ImageListType) => {
      store.images = images;
    });

<<<<<<< Updated upstream
    return <ImageUploader value={store.images} onImageChange={onImageChange} />;
=======
    const onDeleteImage = action((imageStr: string) => {
      store.listing.images = store.listing.images.filter(function (img) {
        return img !== imageStr;
      });
    });
    const classes = ImagesStyles();
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
>>>>>>> Stashed changes
  }
);
