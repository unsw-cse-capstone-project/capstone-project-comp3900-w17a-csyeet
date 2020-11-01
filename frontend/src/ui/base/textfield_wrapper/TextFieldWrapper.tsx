import React from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, FormHelperText } from "@material-ui/core";
export interface TextFieldWrapperProps {
  field?: string;
  label: string;
  type?: string;
  adornment?: React.ReactNode;
  value?: string;
  error?: boolean;
  onBlur?: () => void;
  onChange?: (value: string, field: string) => void;
  readOnly?: boolean;
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
  readOnly,
}) => {
  const [v, setValue] = React.useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value, field as string);
    setValue(e.target.value);
    if (!error) setError(false);
  };

  const [e, setError] = React.useState<boolean>(false);
  const customOnBlur = () => {
    if (readOnly) return;
    v === "" ? setError(true) : setError(false);
    if (onBlur) onBlur();
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <TextField
        error={e || error ? true : false}
        fullWidth
        variant="outlined"
        value={v}
        label={label}
        type={type}
        onBlur={customOnBlur}
        onChange={handleChange}
        InputProps={{
          readOnly: readOnly,
          endAdornment: (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        }}
      />
      {error !== true && e && (
        <FormHelperText style={{ color: "red" }}>
          {label} is required*
        </FormHelperText>
      )}
    </div>
  );
};
