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
  const handleBlur = () => {
    if (required && selected === "") setError(true);
    else setError(false);
  };

  return (
    <div>
      <FormControl
        fullWidth
        variant="outlined"
        style={{
          minWidth: "120px",
          marginTop: "20px",
        }}
      >
        <InputLabel id="select-outlined-label">{label}</InputLabel>
        <Select
          readOnly={readOnly}
          labelId="select-outlined-label"
          id="select-outlined"
          value={selected}
          onChange={handleChange}
          label={label}
          onBlur={handleBlur}
          error={error}
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
      {error && (
        <FormHelperText style={{ color: "red" }}>
          {label} is required*
        </FormHelperText>
      )}
    </div>
  );
};
