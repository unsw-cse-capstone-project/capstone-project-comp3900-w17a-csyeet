import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { Grid, Button, FormHelperText, Typography } from "@material-ui/core";
import { Password } from "../../ui/base/input/Password";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { DetailStore } from "./DetailPresenter";
import { ModalWrapper } from "../../ui/base/modal_wrapper/ModalWrapper";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import {
  AddressForm,
  AddressData,
} from "../../ui/base/address_form/AddressForm";
import { DetailStyles } from "./Detail.css";

export const Details: React.FC<{
  store: DetailStore;
  onUpdate: (store: DetailStore) => void;
  onChangePassword: (store: DetailStore) => void;
}> = observer(({ store, onUpdate, onChangePassword }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [readOnly, setReadOnly] = React.useState<boolean>(true);
  const [passTooShort, setPassTooShort] = React.useState<boolean>(false);
  const [passIncorrect, setPassIncorrect] = React.useState<boolean>(false);
  const [passMatchError, setPassMatchError] = React.useState<boolean>(false);
  const [phoneError, setPhoneError] = React.useState<boolean>(false);

  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });

  const addressData: AddressData = {
    street: store.street,
    suburb: store.suburb,
    postcode: store.postcode,
    state: store.state,
    country: store.country,
  };

  const classes = DetailStyles();
  return (
    <>
      <Typography>General</Typography>
      <TextFieldWrapper
        readOnly={readOnly}
        field="name"
        label="Full Name"
        value={store.name}
        onChange={onChange}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <TextFieldWrapper readOnly={true} label="Email" value={store.email} />
          <FormHelperText>Email cannot be changed </FormHelperText>
        </Grid>
        <Grid item xs>
          <TextFieldWrapper
            readOnly={readOnly}
            field="phone_number"
            label={"Phone Number"}
            onChange={onChange}
            value={store.phone_number}
            adornment={
              <PhoneAndroidOutlinedIcon style={{ color: "#7b7b7b" }} />
            }
            onBlur={() => {
              store.phone_number.length !== 10
                ? setPhoneError(true)
                : setPhoneError(false);
            }}
          />
          {phoneError && (
            <FormHelperText style={{ color: "red" }}>
              Invalid phone number
            </FormHelperText>
          )}
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
            onClick={() => {
              onUpdate(store);
              setReadOnly(true);
            }}
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
          field="currPasswd"
          label="Current Password"
          onChange={onChange}
        />
        {passIncorrect && (
          <FormHelperText style={{ color: "red" }}>
            Password incorrect, could not change password
          </FormHelperText>
        )}
        <Password
          field="newPasswd"
          label="New Password"
          onChange={onChange}
          onBlur={() => {
            if (store.newPasswd.length <= 5) setPassTooShort(true);
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
          field="newPasswdConfirm"
          label="Confirm Password"
          onChange={onChange}
          onBlur={() => {
            if (store.newPasswd !== store.newPasswdConfirm)
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
          onClick={() => {
            setOpen(false);
            onChangePassword(store);
          }}
          disabled={passTooShort || passMatchError}
        >
          Update Password
        </Button>
      </ModalWrapper>
    </>
  );
});
