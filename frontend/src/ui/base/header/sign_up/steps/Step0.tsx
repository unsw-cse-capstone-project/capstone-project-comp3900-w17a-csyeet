import React from "react";
import { observer } from "mobx-react";
import { action, computed } from "mobx";
import { FormHelperText } from "@material-ui/core";
import { SignUpStore } from "../SignUpStore";
import { TextFieldWrapper } from "../../../textfield_wrapper/TextFieldWrapper";
import { PasswordInput } from "../../../password_input/PasswordInput";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

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
    <>
      <TextFieldWrapper
        value={store.usernm}
        field="usernm"
        label="Full Name"
        onChange={onChange}
        adornment={<PersonOutlineOutlinedIcon style={{ color: "#7b7b7b" }} />}
      />
      <TextFieldWrapper
        value={store.email}
        error={emailError}
        field="email"
        label="Email"
        onChange={onChange}
        onBlur={validateEmail}
        adornment={<AlternateEmailIcon style={{ color: "#7b7b7b" }} />}
      />
      <PasswordInput value={store.passwd} onChange={onChange} />
      <TextFieldWrapper
        error={passwdError}
        value={store.passwdVerify}
        type="password"
        field="passwdVerify"
        label="Password confirmation"
        onChange={onChange}
        onBlur={validatePasswd}
      />
      {passwdError ? <>{passwdErrorMsg}</> : <></>}
    </>
  );
});

export default Step0;
