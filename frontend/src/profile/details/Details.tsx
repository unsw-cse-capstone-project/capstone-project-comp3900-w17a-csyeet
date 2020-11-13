import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import {
  Grid,
  Button,
  FormHelperText,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Password } from "../../ui/base/input/Password";
import NumberFormat from "react-number-format";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { ModalWrapper } from "../../ui/base/modal_wrapper/ModalWrapper";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import {
  AddressForm,
  AddressDetails,
} from "../../ui/base/address_form/AddressForm";
import { DetailStyles } from "./Detail.css";
import { ProfileStore } from "../ProfilePresenter";

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

export const Details: React.FC<{
  store: ProfileStore;
  onUpdateUserDetails: () => void;
  onChangePassword: () => void;
}> = observer(({ store, onUpdateUserDetails, onChangePassword }) => {
  const {
    name,
    email,
    phone_number,
    street,
    suburb,
    postcode,
    state,
    country,
  } = store.userDetails;

  const addressData: AddressDetails = {
    street: street,
    suburb: suburb,
    postcode: postcode,
    state: state,
    country: country,
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const [readOnly, setReadOnly] = React.useState<boolean>(true);
  const [passTooShort, setPassTooShort] = React.useState<boolean>(false);
  const [passMatchError, setPassMatchError] = React.useState<boolean>(false);

  const onChange = action((value: string, field: string) => {
    (store as any).userDetails[field] = value;
  });

  const onPasswordChange = action((value: string, field: string) => {
    (store as any)[field] = value;
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
        value={phone_number}
        onValueChange={(values) => {
          onChange(values.value, "phone_number");
        }}
        onBlur={() => {
          phone_number.length !== 10
            ? setPhoneError(true)
            : setPhoneError(false);
        }}
        disable={readOnly}
      />
    );
  });

  const [nameError, setNameError] = React.useState<boolean>(false);
  const classes = DetailStyles();
  return (
    <>
      <Typography>General</Typography>
      <TextField
        fullWidth
        variant={"outlined"}
        style={{ marginTop: "10px" }}
        label={"Name"}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value, "name")
        }
        helperText="Name is required*"
        InputProps={{
          readOnly: readOnly,
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs>
          <TextFieldWrapper
            field="email"
            label="Email"
            onChange={onChange}
            value={email}
          />
        </Grid>
        <Grid item xs>
          <FormControl
            fullWidth
            variant="outlined"
            error={phoneError}
            style={{ marginTop: "10px" }}
          >
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
                Invalid Phone Number
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <AddressForm
        onChange={onChange}
        addressData={addressData}
        readOnly={readOnly}
      />
      <div className={classes.buttonContainer}>
        {readOnly ? (
          <Button
            variant="contained"
            onClick={() => setReadOnly(false)}
            color="primary"
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onUpdateUserDetails}
            color="primary"
          >
            Save
          </Button>
        )}

        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          onClick={() => setOpen(true)}
          disabled={!readOnly}
        >
          Change Password
        </Button>
      </div>
      <ModalWrapper open={open} onClose={() => setOpen(false)}>
        <Typography> Update your password</Typography>
        <Password
          field="old_password"
          label="Current Password"
          onChange={onPasswordChange}
        />
        <Password
          field="new_password"
          label="New Password"
          onChange={onPasswordChange}
          onBlur={() => {
            if (store.new_password.length <= 5) setPassTooShort(true);
            else setPassTooShort(false);
          }}
          error={passTooShort}
        />
        {passTooShort && (
          <FormHelperText style={{ color: "red" }}>
            Password has to be at least 5 characters
          </FormHelperText>
        )}
        <Password
          field="new_password_confirm"
          label="Confirm Password"
          onChange={onPasswordChange}
          onBlur={() => {
            if (store.new_password !== store.new_password_confirm)
              setPassMatchError(true);
            else setPassMatchError(false);
          }}
          error={passMatchError}
        />
        {passMatchError && (
          <FormHelperText style={{ color: "red" }}>
            Passwords do not match
          </FormHelperText>
        )}

        <Button
          style={{ marginTop: "15px", display: "flex", flex: 1 }}
          color="primary"
          variant="contained"
          onClick={onChangePassword}
          disabled={passTooShort || passMatchError}
        >
          Update Password
        </Button>
      </ModalWrapper>
    </>
  );
});
