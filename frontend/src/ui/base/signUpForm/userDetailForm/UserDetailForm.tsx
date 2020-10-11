import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import TextFieldWrapper from "../../textFieldWrapper/TextFieldWrapper";
import SignInStore from "../SignUpStore";
import { InputAdornment } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const UserDetailForm: React.FC<{ store: SignInStore }> = observer(
  ({ store }) => {
    const onChange = action((value: string, name: string) => {
      (store as any)[name] = value;
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

        <TextFieldWrapper
          field="passwd"
          label="Password"
          onChange={onChange}
          adornment={
            <InputAdornment position="end">
              <VpnKeyOutlinedIcon />
            </InputAdornment>
          }
        />

        <TextFieldWrapper
          field="passwdVerify"
          label="Confirm Password"
          onChange={onChange}
          adornment={
            <InputAdornment position="end">
              <VpnKeyOutlinedIcon />
            </InputAdornment>
          }
        />
      </>
    );
  }
);

export default UserDetailForm;
