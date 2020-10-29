import React from "react";
import { observer } from "mobx-react";
import { action, computed } from "mobx";
import { FormHelperText } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import TextFieldWrapper from "../textfield_wrapper/TextFieldWrapper";
import { Password } from "../input/Password";
import SignUpStore from "./SignUpStore";

const Step0: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });

  // Email Validation
  const [emailError, setEmailError] = React.useState<boolean>();
  const validateEmail = () => {
    !store.email.includes("@") ? setEmailError(true) : setEmailError(false);
  };
  const emailErrorMsg = (
    <FormHelperText style={{ color: "red" }}>
      Email must be in the format jenn@example.com
    </FormHelperText>
  );

  // Password Validation
  const [passwdError, setPasswdError] = React.useState<boolean>();
  const validatePasswd = () => {
    store.passwd != store.passwdVerify
      ? setPasswdError(true)
      : setPasswdError(false);
  };

  const passwdErrorMsg = (
    <FormHelperText style={{ color: "red" }}>
      Passwords do not match
    </FormHelperText>
  );
  return (
    <div style={{ margin: "10px" }}>
      <TextFieldWrapper
        value={store.usernm}
        field="usernm"
        label="Full Name"
        onChange={onChange}
        adornment={<PersonOutlineOutlinedIcon style={{ color: "#7b7b7b" }} />}
      />
      <TextFieldWrapper
        error={emailError}
        value={store.email}
        field="email"
        label="Email"
        onChange={onChange}
        onBlur={validateEmail}
        adornment={<AlternateEmailIcon style={{ color: "#7b7b7b" }} />}
      />
      {emailError ? <>{emailErrorMsg}</> : <></>}
      <Password
        field="passwd"
        label="Password"
        value={store.passwd}
        onChange={onChange}
      />
      <Password
        field="passwdVerify"
        label="Confirm Password"
        value={store.passwdVerify}
        onChange={onChange}
        error={passwdError}
      />
      {passwdError ? <>{passwdErrorMsg}</> : <></>}
    </div>
  );
});

export default Step0;
