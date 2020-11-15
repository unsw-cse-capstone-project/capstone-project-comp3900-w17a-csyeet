import React from "react";
import { Typography, FormHelperText, Button } from "@material-ui/core";
import { Password } from "../../ui/base/input/Password";
import { ProfileStore } from "../ProfilePresenter";
import { action } from "mobx";

/**
 * Form component that handles users updating their account password
 * @param store
 * @param onChangePassword
 */
export const PasswordResetForm: React.FC<{
  store: ProfileStore;
  onChangePassword: () => void;
}> = ({ store, onChangePassword }) => {
  const [passTooShort, setPassTooShort] = React.useState<boolean>(false);
  const [passMatchError, setPassMatchError] = React.useState<boolean>(false);
  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });
  return (
    <div>
      <Typography> Update your password</Typography>
      <Password
        field="old_password"
        label="Current Password"
        onChange={onChange}
      />
      <Password
        field="new_password"
        label="New Password"
        onChange={onChange}
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
        onChange={onChange}
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
    </div>
  );
};
