import React from "react";
import { TextField } from "@material-ui/core";

/**
 * Select component for beds/baths/cars used on add listing form
 * @param value
 * @param onChange
 * @param label
 * @param className
 * @param readOnly
 * @param style
 * @param size
 */
export const NumberPicker = ({
  value,
  onChange,
  label,
  className,
  readOnly = false,
  style,
  size = "small",
  isCarPicker
}: {
  value: any;
  onChange: any;
  label?: string;
  size?: "small" | "medium";
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isCarPicker: boolean,
}) => {
  return (
    isCarPicker ?
      (<TextField
        className={className}
        disabled={readOnly}
        style={style}
        size={size}
        variant="outlined"
        value={value}
        onChange={onChange}
        type="number"
        InputProps={{
          inputProps: { min: 0, max: 10 },
          onKeyDown: (event) => {
            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode === 8 || event.keyCode === 9))) event.preventDefault()
          },
        }}
        label={label}
      />) : (
        <TextField
          className={className}
          disabled={readOnly}
          style={style}
          size={size}
          variant="outlined"
          value={value}
          onChange={onChange}
          type="number"
          InputProps={{
            inputProps: { min: 1, max: 10 },
            onKeyDown: (event) => {
              if (!((event.keyCode >= 49 && event.keyCode <= 57) || (event.keyCode === 8 || event.keyCode === 9))) event.preventDefault()
            },
          }}
          label={label}
        />
      )
  );
};
