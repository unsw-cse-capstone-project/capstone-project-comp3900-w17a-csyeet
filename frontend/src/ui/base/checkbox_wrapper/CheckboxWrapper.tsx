import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

/**
 * Checkbox wraps around material ui checkbox
 * @param checked
 * @param field
 * @param label
 * @param style
 */
export const CheckboxWrapper: React.FC<{
  checked: boolean;
  field: string;
  label: string;
  style?: React.CSSProperties;
  onChange: (checked: boolean, field: string) => void;
}> = ({ checked = false, field, label, onChange, style }) => {
  const [value, setValue] = React.useState<boolean>(checked);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(!value);
            onChange(e.target.checked, field);
          }}
        />
      }
      label={label}
      style={style}
    />
  );
};
