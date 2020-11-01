import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ImageUploader } from "./ImageUploader";
import { action } from "mobx";

export default {
  title: "ui/base/image uploader",
  component: ImageUploader,
} as Meta;

export const Single = () => (
  <ImageUploader
    multiple={false}
    onImageChange={() => action("onImageChange")}
  />
);

export const Multiple = () => (
  <ImageUploader
    multiple={true}
    onImageChange={() => action("onImageChange")}
  />
);
