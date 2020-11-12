import React from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";

export const TextFieldWrapper = ({
  field,
  label,
  type = "text",
  adornment = null,
  value = "",
  error,
  helperText,
  style,
  onBlur,
  onChange,
  readOnly,
}: {
  field?: string;
  label: string;
  type?: string;
  adornment?: React.ReactNode;
  value?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
  onChange?: (value: string, field: string) => void;
  readOnly?: boolean;
  style?: React.CSSProperties;
}) => {
  const [v, setValue] = React.useState<string>(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number" && e.target.value === "-1") return; // Disable Negative
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

  const errorText = () => {
    if (e) {
      return `${label} is required*`;
    }
    if (error) {
      return helperText;
    }
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <TextField
        error={e || error ? true : false}
        fullWidth
        style={style}
        variant={"outlined"}
        disabled={readOnly}
        value={v}
        label={label}
        type={type}
        onBlur={customOnBlur}
        onChange={handleChange}
        helperText={errorText()}
        InputProps={{
          readOnly: readOnly,
          endAdornment: (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        }}
      />
    </div>
  );
};
