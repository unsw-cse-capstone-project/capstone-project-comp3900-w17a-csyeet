import React from "react";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { TextFieldWrapper } from "../textfield_wrapper/TextFieldWrapper";

export const Password = ({
  field,
  label,
  onChange,
  value,
  error,
  onBlur,
}: {
  field: string;
  label: string;
  onChange: (value: string, field: string) => void;
  value?: string;
  error?: boolean;
  onBlur?: () => void;
}) => {
  const [visible, setVisible] = React.useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <TextFieldWrapper
      error={error ? error : false}
      field={field}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur ? onBlur : undefined}
      type={visible ? "text" : "password"}
      adornment={
        <div onClick={handleClick}>
          {visible ? (
            <VisibilityIcon style={{ color: "#7b7b7b" }} />
          ) : (
            <VisibilityOffIcon style={{ color: "#7b7b7b" }} />
          )}
        </div>
      }
    />
  );
};
