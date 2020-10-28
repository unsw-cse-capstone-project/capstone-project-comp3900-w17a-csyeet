import React from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, FormHelperText } from "@material-ui/core";
export interface TextFieldWrapperProps {
  field: string;
  label: string;
  type?: string;
  adornment?: React.ReactNode;
  value?: string;
  error?: boolean;
  onBlur?: () => void;
  onChange: (value: string, field: string) => void;
}
export const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  field,
  label,
  type = "text",
  adornment = null,
  value = "",
  error,
  onBlur,
  onChange,
}) => {
  const [v, setValue] = React.useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, field);
    setValue(e.target.value);
    if (!error) setError(false);
  };

  const [e, setError] = React.useState<boolean>(false);
  const errorMsg = (
    <FormHelperText style={{ color: "red" }}>
      {label} is required*
    </FormHelperText>
  );

  const customOnBlur = () => {
    v === "" ? setError(true) : setError(false);
    if (onBlur) onBlur();
  };
  return (
    <div>
      <TextField
        style={{ marginTop: "10px" }}
        fullWidth
        error={e || error}
        variant="outlined"
        value={v}
        label={label}
        type={type}
        onBlur={customOnBlur}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        }}
      />
      {e && !error ? <>{errorMsg}</> : <></>}
    </div>
  );
};
