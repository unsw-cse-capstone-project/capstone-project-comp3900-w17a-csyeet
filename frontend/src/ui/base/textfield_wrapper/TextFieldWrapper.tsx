import React from "react";
import TextField from "@material-ui/core/TextField";
export interface TextFieldWrapperProps {
  field: string;
  label: string;
  onChange: (value: string, field: string) => void;
  adornment?: React.ReactNode;
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  field,
  label,
  onChange,
  adornment = null,
}) => {
  const [value, setValue] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, field);
    setValue(e.target.value);
  };
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        label={label}
        onChange={handleChange}
        InputProps={{
          endAdornment: adornment,
        }}
      />
    </div>
  );
};

export default TextFieldWrapper;
