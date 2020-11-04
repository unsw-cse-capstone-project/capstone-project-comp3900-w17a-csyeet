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

    return <ImageUploader value={store.images} onImageChange={onImageChange} />;
  }
);
