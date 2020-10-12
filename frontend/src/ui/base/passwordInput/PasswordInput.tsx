import React from "react";
import {
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const PasswordInput: React.FC<{
  onChange: (value: string, field: string) => void;
}> = ({ onChange }) => {
  const [passwd, setPasswd] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, "passwd");
    setPasswd(e.target.value);
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={visible ? "text" : "password"}
        value={passwd}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
      }
    </FormControl>
  );
};

export default PasswordInput;
