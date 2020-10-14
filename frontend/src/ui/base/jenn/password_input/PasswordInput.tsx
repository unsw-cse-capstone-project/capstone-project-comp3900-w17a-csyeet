import React from "react";
import { TextFieldWrapper } from "../textfield_wrapper/TextFieldWrapper";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

export const PasswordInput = ({
  onChange,
  verify,
  value,
}: {
  onChange: (value: string, field: string) => void;
  verify?: boolean;
  value?: string;
}) => {
  const [visible, setVisible] = React.useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <TextFieldWrapper
      field={verify ? "passwdVerify" : "passwd"}
      label={verify ? "Confirm Password" : "Password"}
      value={value}
      onChange={onChange}
      type={visible ? "text" : "password"}
      adornment={
        <div onClick={handleClick}>
          {visible ? (
            <VisibilityIcon style={{ color: "#828282" }} />
          ) : (
            <VisibilityOffIcon style={{ color: "#828282" }} />
          )}
        </div>
      }
    />
  );
};
