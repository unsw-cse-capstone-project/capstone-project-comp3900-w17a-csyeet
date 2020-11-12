import React from "react";
import { TextField } from "@material-ui/core";

export const NumberPicker = ({
  value,
  onChange,
  label,
  className,
  readOnly = false,
  style,
  size = "small",
}: {
  value: any;
  onChange: any;
  label?: string;
  size?: "small" | "medium";
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <TextField
      className={className}
      disabled={readOnly}
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
