import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, Typography, FormHelperText } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { SignInStore } from "./SignInStore";
import { TextFieldWrapper } from "../../textfield_wrapper/TextFieldWrapper";
import { ModalWrapper } from "../../modal_wrapper/ModalWrapper";
import logo from "../../../../images/logo.png";
import { Password } from "../../input/Password";
import { SignInStyles } from "./SignIn.css";

export interface SignInProps {}

export const SignIn: React.FC<{
  onSubmit: (email: string, passwd: string, onError: () => void) => void;
  store: SignInStore;
}> = observer(({ onSubmit, store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

  const closeModal = action(() => {
    store.open = false;
  });

  const [error, setError] = React.useState<boolean>(false);
  const handleError = () => setError(true);
  const classes = SignInStyles();
  return (
    <ModalWrapper open={store.open} onClose={closeModal}>
      <form
        className={classes.root}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit(store.email, store.passwd, handleError);
          if (!error) closeModal();
        }}
      >
        <img
          width="200px"
          src={logo}
          alt="Adobe logo"
          style={{ marginBottom: "10px" }}
        />
        <Typography> Welcome Back</Typography>
        <TextFieldWrapper
          error={error}
          field="email"
          label="Email"
          onChange={onChange}
          adornment={<AlternateEmailIcon />}
        />
        <Password
          error={error}
          field="passwd"
          label="Password"
          value={store.passwd}
          onChange={onChange}
        />
        {error && (
          <FormHelperText style={{ color: "red", margin: "5px" }}>
            Email or Password is invalid
          </FormHelperText>
        )}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: "10px" }}
          onClick={() => {
            onSubmit(store.email, store.passwd, handleError);
            if (!error) closeModal();
          }}
        >
          Sign In
        </Button>
      </form>
    </ModalWrapper>
  );
});
