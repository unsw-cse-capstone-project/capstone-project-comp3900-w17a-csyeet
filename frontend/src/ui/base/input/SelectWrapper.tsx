import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";

export interface SelectWrapperProps {
  label: string;
  field: string;
  data: Array<string>;
  onChange: (value: string, field: string) => void;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
}
export const SelectWrapper = ({
  label,
  field,
  data,
  value,
  readOnly = false,
  onChange,
  required = true,
}: SelectWrapperProps) => {
  const [selected, setSelected] = React.useState(value);
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string, field);
    setSelected(e.target.value as string);
  };

  const [error, setError] = React.useState<boolean>(false);
  return (
    <div>
      <FormControl
        fullWidth
        variant="outlined"
        style={{
          minWidth: "120px",
          marginTop: "10px",
        }}
      >
        <InputLabel id="select-outlined-label">{label}</InputLabel>
        <Select
          readOnly={readOnly}
          disabled={readOnly}
          labelId="select-outlined-label"
          variant={"outlined"}
          id="select-outlined"
          value={selected}
          onChange={handleChange}
          label={label}
          error={error}
        >
          <MenuItem disabled value="">
            <em>None</em>
          </MenuItem>
          {data.map((v, i) => (
            <MenuItem value={v} key={i}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{" "}
    </div>
  );
};
