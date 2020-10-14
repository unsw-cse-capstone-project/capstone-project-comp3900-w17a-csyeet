import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { SignUpStore } from "./SignUpStore";
import { TextFieldWrapper } from "../../textfield_wrapper/TextFieldWrapper";
import { PasswordInput } from "../../password_input/PasswordInput";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

export const Step0: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });

  return (
    <>
      <TextFieldWrapper
        value={store.usernm}
        field="usernm"
        label="Full Name"
        onChange={onChange}
        adornment={<PersonOutlineOutlinedIcon style={{ color: "#828282" }} />}
      />
      <TextFieldWrapper
        value={store.email}
        field="email"
        label="Email"
        onChange={onChange}
        adornment={<AlternateEmailIcon style={{ color: "#828282" }} />}
      />
      <PasswordInput value={store.passwd} onChange={onChange} />
      <PasswordInput
        value={store.passwdVerify}
        verify={true}
        onChange={onChange}
      />
    </>
  );
});
