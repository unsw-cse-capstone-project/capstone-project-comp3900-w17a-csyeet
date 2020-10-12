import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
// import { action } from "@storybook/addon-actions";
import TextFieldWrapper, { TextFieldWrapperProps } from "./TextFieldWrapper";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import { InputAdornment } from "@material-ui/core";

export default {
  title: "Form Components/Text Input",
  component: TextFieldWrapper,
} as Meta;

const Template: Story<TextFieldWrapperProps> = (args) => (
  <TextFieldWrapper {...args} />
);

const adornment = (
  <InputAdornment position="end">
    <PhoneAndroidOutlinedIcon />
  </InputAdornment>
);

const onChange = () => console.log("Input change handled");
export const Overview = Template.bind({});
Overview.args = {
  field: "name as stored",
  label: "Label",
  onChange: () => {}, // (Jenn) TODO: Add action linking
  adornment: adornment,
};
