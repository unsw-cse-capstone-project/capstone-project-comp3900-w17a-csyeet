import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export interface SelectWrapperProps {
  label: string;
  field: string;
  data: Array<string>;
  value?: string;
  onChange: (value: string, field: string) => void;
}
const SelectWrapper: React.FC<SelectWrapperProps> = ({
  label,
  field,
  data,
  value = "",
  onChange,
}) => {
  const [selected, setSelected] = React.useState(value);
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string, field);
    setSelected(e.target.value as string);
  };
  return (
    <div>
      <FormControl
        variant="outlined"
        style={{
          minWidth: "120px",
          marginTop: "10px",
          marginBottom: "10px",
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

export default SelectWrapper;
