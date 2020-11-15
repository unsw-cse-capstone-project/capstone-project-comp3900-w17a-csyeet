import { FormControlLabel, Checkbox as CheckboxBase } from "@material-ui/core";
import { action } from "mobx";
import React from "react";

/**
 * Wrapper for material ui Checkbox component
 * @param store
 * @param name
 * @param Label
 * @param style
 */
export const Checkbox = ({
  store,
  name,
  Label,
  style,
}: {
  store: any;
  name: string;
  Label: JSX.Element;
  style?: React.CSSProperties;
}) => {
  const [value, setValue] = React.useState<boolean>(store[name]);
  return (
    <FormControlLabel
      control={
        <CheckboxBase
          checked={value}
          onChange={action((event: React.ChangeEvent<HTMLInputElement>) => {
            store[name] = event.target.checked;
            setValue(event.target.checked);
          })}
          name="checkedB"
          color="primary"
        />
      }
      label={Label}
      style={style}
    />
  );
};
