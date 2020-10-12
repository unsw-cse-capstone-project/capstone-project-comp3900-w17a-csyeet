import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import TextFieldWrapper from "../../textFieldWrapper/TextFieldWrapper";
import SignInStore from "../SignUpStore";
import { InputAdornment } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PasswordInput from "../../passwordInput/PasswordInput";

const UserDetailForm: React.FC<{ store: SignInStore }> = observer(
  ({ store }) => {
    const onChange = action((value: string, field: string) => {
      (store as any)[field] = value;
      console.log("Update! ..", (store as any)[name]);
    });

    return (
      <>
        <TextFieldWrapper
          field="usernm"
          label="Full Name"
          onChange={onChange}
          adornment={
            <InputAdornment position="end">
              <PersonOutlineOutlinedIcon />
            </InputAdornment>
          }
        />
        <TextFieldWrapper
          field="email"
          label="Email"
          onChange={onChange}
          adornment={
            <InputAdornment position="end">
              <AlternateEmailIcon />
            </InputAdornment>
          }
        />
        <PasswordInput onChange={onChange} />
        <TextFieldWrapper
          field="passwdVerify"
          label="Confirm Password"
          onChange={onChange}
        />
      </>
    );
  }
);

export default UserDetailForm;
