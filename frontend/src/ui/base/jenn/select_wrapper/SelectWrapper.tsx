import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

export interface SelectWrapperProps {
  label?: string;
  field: string;
  data: Array<string>;
  value?: string;
  onChange: (value: string, field: string) => void;
}
export const SelectWrapper = ({
  label = "",
  field,
  data,
  value = "",
  onChange,
}: SelectWrapperProps) => {
  const [selected, setSelected] = React.useState(value);
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string, field);
    setSelected(e.target.value as string);
  };
  return (
    <div>
      <FormControl
        variant="outlined"
        fullWidth
        style={{
          minWidth: "120px",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <InputLabel id="select-outlined-label">{label}</InputLabel>
        <Select
          labelId="select-outlined-label"
          id="select-outlined"
          value={selected}
          onChange={handleChange}
          label={label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((v, i) => (
            <MenuItem value={v} key={i}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
