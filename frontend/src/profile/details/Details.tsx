import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { useStore } from "../../AuthContext";
import {
  Grid,
  Button,
  FormHelperText,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { Password } from "../../ui/base/input/Password";
import NumberFormat from "react-number-format";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { DetailStore } from "./DetailStore";
import { ModalWrapper } from "../../ui/base/modal_wrapper/ModalWrapper";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import {
  AddressForm,
  AddressData,
} from "../../ui/base/address_form/AddressForm";
import { DetailStyles } from "./Detail.css";

export const DetailWrapper = () => {
  const userStore = useStore();
  if (!userStore) throw Error("User Store cannot be null");

  const store = new DetailStore();
  const fillDetailStore = action(() => {
    if (!userStore.user) throw Error("User does not exit");
    const {
      id,
      name,
      phone_number,
      street,
      suburb,
      postcode,
      state,
      country,
    } = userStore.user;
    store.id = id;
    store.name = name;
    store.phone_number = phone_number;
    store.street = street;
    store.suburb = suburb;
    store.postcode = postcode;
    store.state = state;
    store.country = country;
  });

  const onUpdate = () => {
    // (Jenn) TODO: Update
    console.log("Updating");
  };

  const onChangePassword = (onError: () => void) => {
    // (Jenn) TODO: Update
    console.log("Changing password");
  };
  fillDetailStore();

  return (
    <Details
      store={store}
      onUpdate={onUpdate}
      onChangePassword={onChangePassword}
    />
    // Snack for error on update here.
    // Snack for success update here.
  );
};

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

export const Details: React.FC<{
  store: DetailStore;
  onUpdate: () => void;
  onChangePassword: (onError: () => void) => void;
}> = observer(({ store, onUpdate, onChangePassword }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [readOnly, setReadOnly] = React.useState<boolean>(true);
  const [passTooShort, setPassTooShort] = React.useState<boolean>(false);
  const [passIncorrect, setPassIncorrect] = React.useState<boolean>(false);
  const [passMatchError, setPassMatchError] = React.useState<boolean>(false);

  const onChange = action((value: string, field: string) => {
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
        value={store.phone_number}
        onValueChange={(values) => {
          onChange(values.value, "phone_number");
        }}
        onBlur={() => {
          store.phone_number.length != 10
            ? setPhoneError(true)
            : setPhoneError(false);
        }}
        readOnly={readOnly}
      />
    );
  });

  const addressData: AddressData = {
    street: store.street,
    suburb: store.suburb,
    postcode: store.postcode,
    state: store.street,
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
        onChange={onChange}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <TextFieldWrapper
            readOnly={readOnly}
            field="email"
            label="Email"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs>
          <FormControl
            fullWidth
            variant="outlined"
            error={phoneError}
            style={{ marginTop: "20px" }}
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
                Phone format must be 04.. ... ...
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
          <Button variant="contained" onClick={onUpdate} color="primary">
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
        <Grid container spacing={2}>
          <Grid item xs>
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
          </Grid>
          <Grid item xs>
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
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: "15px" }}
          variant="contained"
          onClick={() => {
            setPassIncorrect(false);

            onChangePassword(() => setPassIncorrect(true));
          }}
          disabled={passTooShort || passMatchError}
        >
          Update Password
        </Button>
      </ModalWrapper>
    </>
  );
});
