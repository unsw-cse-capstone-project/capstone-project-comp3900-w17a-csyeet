import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import NumberFormat from "react-number-format";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import {
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { Password } from "../../input/Password";
import { TextFieldWrapper } from "../../input/TextFieldWrapper";
import { AddressForm } from "../../address_form/AddressForm";
import { SignUpStore } from "./SignUpStore";
import { isValidEmail } from "../../../util/helper";

export const Step0: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });

  // Email Validation
  const [emailError, setEmailError] = React.useState<string | undefined>(
    undefined
  );
  const validateEmail = () => {
    !isValidEmail(store.email)
      ? setEmailError("Invalid email format")
      : setEmailError(undefined);
  };

  // Password Strength
  const [passTooShort, setPassTooShort] = React.useState<string | undefined>(
    undefined
  );
  const checkPassword = () => {
    store.passwd.length < 5
      ? setPassTooShort("Password must be longer than 5 characters")
      : setPassTooShort(undefined);
  };

  // Password Validation
  const [passwdError, setPasswdError] = React.useState<string | undefined>(
    undefined
  );
  const validatePasswd = () => {
    store.passwd !== store.passwdVerify
      ? setPasswdError("Passwords do not match")
      : setPasswdError(undefined);
  };
  return (
    <div>
      <TextFieldWrapper
        value={store.usernm}
        field="usernm"
        label="Full Name"
        onChange={onChange}
        adornment={<PersonOutlineOutlinedIcon style={{ color: "#7b7b7b" }} />}
      />
      <TextFieldWrapper
        error={!!emailError}
        value={store.email}
        helperText={emailError}
        field="email"
        label="Email"
        onChange={onChange}
        onBlur={validateEmail}
        adornment={<AlternateEmailIcon style={{ color: "#7b7b7b" }} />}
      />
      <Password
        field="passwd"
        label="Password"
        onBlur={checkPassword}
        error={!!passTooShort}
        helperText={passTooShort}
        value={store.passwd}
        onChange={onChange}
      />
      <TextFieldWrapper
        error={!!passwdError}
        helperText={passwdError}
        value={store.passwdVerify}
        type="password"
        field="passwdVerify"
        label="Confirm Password"
        onChange={onChange}
        onBlur={validatePasswd}
      />
    </div>
  );
});

// Step 2

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

export const Step1 = observer(({ store }: { store: SignUpStore }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

  const [phoneError, setPhoneError] = React.useState<boolean>(false);
  const PhoneInput = observer((props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;
    return (
      <NumberFormat
        {...other}
        format="#### ### ###"
        mask="#"
        placeholder="04"
        value={store.phoneNo}
        onValueChange={(values) => {
          onChange(values.value, "phoneNo");
        }}
        onBlur={() => {
          store.phoneNo.length !== 10
            ? setPhoneError(true)
            : setPhoneError(false);
        }}
      />
    );
  });

  return (
    <FormControl fullWidth variant="outlined" error={phoneError} style={{marginTop: "10px"}}>
      <InputLabel
        htmlFor="outlined-adornment-card"
        style={{ background: "white" }}
      >
        Phone Number
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-card"
        endAdornment={
          <InputAdornment position="end">
            <PhoneAndroidOutlinedIcon style={{ color: "#7b7b7b" }} />
          </InputAdornment>
        }
        labelWidth={110}
        inputComponent={PhoneInput as any}
      />
      {phoneError && (
        <FormHelperText style={{ color: "red" }}>
          Phone format must be 04.. ... ...
        </FormHelperText>
      )}
    </FormControl>
  );
});

// Step 2
export const Step2: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any).address[name] = value;
  });

  return (
    <AddressForm
      where="signUp"
      addressData={store.address}
      onChange={onChange}
      style={{ display: "block" }}
    />
  );
});
