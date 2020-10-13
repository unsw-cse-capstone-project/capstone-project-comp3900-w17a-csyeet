import React from "react";
<<<<<<< HEAD
=======
import { InputAdornment, IconButton } from "@material-ui/core";
>>>>>>> 70c2d52c009a38022b19cd0cce5c16e180de6a28
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextFieldWrapper from "../textfield_wrapper/TextFieldWrapper";

const PasswordInput: React.FC<{
  onChange: (value: string, field: string) => void;
  verify?: boolean;
  value: string;
}> = ({ onChange, verify, value }) => {
  const [visible, setVisible] = React.useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  // const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  // };

  return (
    <TextFieldWrapper
      field={verify ? "passwdVerify" : "passwd"}
      label={verify ? "Confirm Password" : "Password"}
      value={value}
      onChange={onChange}
      type={visible ? "text" : "password"}
      adornment={
        <div onClick={handleClick}>
          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
      }
    />
  );
};

export default PasswordInput;
