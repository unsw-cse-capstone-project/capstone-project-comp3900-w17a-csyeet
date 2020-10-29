import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { useStore } from "../../AuthContext";
import { Password } from "../../ui/base/input/Password";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { Grid, Button, FormHelperText, Typography } from "@material-ui/core";
import { DetailStore } from "./DetailStore";

export const DetailWrapper: React.FC<{}> = () => {
  const userStore = useStore();
  if (!userStore) throw Error("User Store cannot be null");

  const store = new DetailStore();
  const fillDetailStore = action(() => {
    if (!userStore.user) throw Error("User does not exit");
    const {
      id,
      name,
      phoneNo,
      street,
      suburb,
      postcode,
      state,
      country,
    } = userStore.user;
    store.id = id;
    store.name = name;
    store.phoneNo = phoneNo;
    store.street = street;
    store.suburb = suburb;
    store.postcode = postcode;
    store.state = state;
    store.country = country;
  });

  const onUpdate = () => {
    console.log("Updating");
  };

  const onChangePassword = () => {
    console.log("Changing password");
  };
  fillDetailStore();

  // Show snacks on success, refresh the form on error
  return (
    <Details
      store={store}
      onUpdate={onUpdate}
      onChangePassword={onChangePassword}
    />
  );
};
export const Details: React.FC<{
  store: DetailStore;
  onUpdate: () => void;
  onChangePassword: () => void;
}> = observer(({ store, onUpdate, onChangePassword }) => {
  const [readOnly, setReadOnly] = React.useState<boolean>(true);
  const [updatePasswd, setUpdatePasswd] = React.useState<boolean>(false);
  const [passwdError, setPasswdError] = React.useState<boolean>(false);
  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });
  const onClick = () => {
    if (updatePasswd) onChangePassword();
    else readOnly ? setReadOnly(false) : onUpdate();
  };
  const checkPassword = () => {
    if (store.newPasswd === store.newPasswdConfirm) onChangePassword();
    else setPasswdError(true);
  };
  return (
    <>
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
          <TextFieldWrapper
            readOnly={readOnly}
            field="phoneNo"
            label="Phone Number"
            onChange={onChange}
          />
        </Grid>
      </Grid>
      {updatePasswd ? (
        <>
          <Typography> Update your password</Typography>
          <Password
            field="currPasswd"
            label="Current Password"
            onChange={onChange}
          />
          <Grid container spacing={2}>
            <Grid item xs>
              <Password
                field="newPasswd"
                label="New Password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs>
              <Password
                field="newPasswdConfirm"
                label="Confirm Password"
                onChange={onChange}
                error={passwdError}
              />
              {passwdError && (
                <FormHelperText style={{ color: "red" }}>
                  Passwords do not match
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Button variant="contained" onClick={checkPassword}>
            Change password
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => setUpdatePasswd(true)}
          disabled={!readOnly}
        >
          Change Password
        </Button>
      )}

      <TextFieldWrapper
        readOnly={readOnly}
        field="street"
        label="Address"
        onChange={onChange}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <TextFieldWrapper
            readOnly={readOnly}
            field="suburb"
            label="Suburb"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs>
          <TextFieldWrapper
            readOnly={readOnly}
            field="postcode"
            label="Postcode"
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <TextFieldWrapper
            readOnly={readOnly}
            field="state"
            label="State"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs>
          <TextFieldWrapper
            readOnly={readOnly}
            field="country"
            label="Country"
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={onClick} disabled={updatePasswd}>
        {readOnly ? "Edit" : "Save"}
      </Button>
    </>
  );
});
