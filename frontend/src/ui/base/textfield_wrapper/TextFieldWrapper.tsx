import React from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
export interface TextFieldWrapperProps {
  field: string;
  label: string;
  onChange: (value: string, field: string) => void;
  type?: string;
  adornment?: React.ReactNode;
  value?: string;
}
export const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  field,
  label,
  onChange,
  type = "text",
  adornment = null,
  value = "",
}) => {
  const [v, setValue] = React.useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, field);
    setValue(e.target.value);
  };
  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={v}
        label={label}
        type={type}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        }}
      />
    </div>
  );
};
