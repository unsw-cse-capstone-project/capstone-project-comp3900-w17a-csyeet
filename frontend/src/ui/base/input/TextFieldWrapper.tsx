import React from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
export interface TextFieldWrapperProps {
  field?: string;
  label: string;
  type?: string;
  adornment?: React.ReactNode;
  value?: string;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  onBlur?: () => void;
  onChange?: (value: string, field: string) => void;
  readOnly?: boolean;
  style?: React.CSSProperties;
}

/**
 * Wrapper for material UI textfield component that allows
 * customised props
 * @param field
 * @param label
 * @param type
 * @param size
 * @param adornment
 * @param value
 * @param error
 * @param helperText
 * @param style
 * @param onBlur
 * @param onChange
 * @param readOnly
 */
export const TextFieldWrapper = ({
  field,
  label,
  type = "text",
  size = "medium",
  adornment = null,
  value = "",
  error,
  helperText,
  style,
  onBlur,
  onChange,
  readOnly,
}: TextFieldWrapperProps) => {
  const [v, setValue] = React.useState(value);
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
    <div style={{ marginTop: "5px" }}>
      <TextField
        error={e || error ? true : false}
        size={size}
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
