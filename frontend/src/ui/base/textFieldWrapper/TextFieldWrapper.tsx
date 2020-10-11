import React from "react";
import TextField from "@material-ui/core/TextField";
<<<<<<< HEAD
export interface TextFieldWrapperProps {
=======
interface TextFieldWrapperProps {
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
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
<<<<<<< HEAD
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
=======
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
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
<<<<<<< HEAD
        onChange={handleChange}
=======
        onChange={onValueChange}
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
        InputProps={{
          endAdornment: adornment,
        }}
      />
    </div>
  );
};

export default TextFieldWrapper;
