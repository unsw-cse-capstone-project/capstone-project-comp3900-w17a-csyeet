import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export const CheckboxWrapper: React.FC<{
  checked: boolean;
  field: string;
  label: string;
  onChange: (checked: boolean, field: string) => void;
}> = ({ checked = false, field, label, onChange }) => {
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
    />
  );
};
