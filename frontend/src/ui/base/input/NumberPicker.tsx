import React from "react";
import { TextField } from "@material-ui/core";

export const NumberPicker = ({
  value,
  onChange,
  label,
  className,
  style,
  size = "small",
}: {
  value: any;
  onChange: any;
  label?: string;
  className?: string;
  size?: "small" | "medium";
  style?: React.CSSProperties;
}) => {
  return (
    <TextField
      className={className}
      style={style}
      size={size}
      variant="outlined"
      value={value}
      onChange={onChange}
      type="number"
      InputProps={{ inputProps: { min: 1 } }}
      label={label}
    />
  );
};
