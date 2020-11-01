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
import { TextFieldWrapper } from "../../textfield_wrapper/TextFieldWrapper";
import { AddressForm } from "../../address_form/AddressForm";
import { SignUpStore } from "./SignUpStore";

export const Step0: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });

  // Email Validation
  const [emailError, setEmailError] = React.useState<boolean>();
  const validateEmail = () => {
    !store.email.includes("@") ? setEmailError(true) : setEmailError(false);
  };

  // Password Strength
  const [passTooShort, setPassTooShort] = React.useState<boolean>();
  const checkPassword = () => {
    if (store.passwd.length < 5) setPassTooShort(true);
  };

  // Password Validation
  const [passwdError, setPasswdError] = React.useState<boolean>();
  const validatePasswd = () => {
    store.passwd != store.passwdVerify
      ? setPasswdError(true)
      : setPasswdError(false);
  };
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
      {emailError && (
        <FormHelperText style={{ color: "red" }}>
          Email must be in the format jenn@example.com
        </FormHelperText>
      )}
      <Password
        field="passwd"
        label="Password"
        onBlur={checkPassword}
        error={passTooShort}
        value={store.passwd}
        onChange={onChange}
      />
      {passTooShort && (
        <FormHelperText style={{ color: "red" }}>
          Password must be longer than 5 characters
        </FormHelperText>
      )}
      <TextFieldWrapper
        error={passwdError}
        value={store.passwdVerify}
        type="password"
        field="passwdVerify"
        label="Confirm Password"
        onChange={onChange}
        onBlur={validatePasswd}
      />
      {passwdError && (
        <FormHelperText style={{ color: "red" }}>
          Passwords do not match
        </FormHelperText>
      )}
    </div>
  );
});

// Step 2

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

export const Step1: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
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
          store.phoneNo.length != 10
            ? setPhoneError(true)
            : setPhoneError(false);
        }}
      />
    );
  });

  return (
    <div style={{ marginBottom: "10px" }}>
      <FormControl fullWidth variant="outlined" error={phoneError}>
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
    </div>
  );
});

// Step 2
export const Step2: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

  return <AddressForm onChange={onChange} />;
});
