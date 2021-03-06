import {
  Grid,
  Typography,
  Button,
  Divider,
  Link,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { SignInArgs, SignInGoogleArgs } from "../../../../AuthContext";
import { isValidEmail } from "../../../util/helper";
import Logo from "../../logo/Logo";
import { SignInStyle } from "./SignIn.css";
import MuiAlert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { GoogleLogin } from "../google_auth/GoogleAuth";

/**
 * Handle sign in flow 
 * @param switchMode
 * @param onSubmit
 * @param closeModal
 */
export const SignIn = ({
  switchMode,
  onSubmit,
  onSubmitGoogle,
  closeModal,
}: {
  switchMode: () => void;
  onSubmit: (args: SignInArgs) => void;
  onSubmitGoogle: (args: SignInGoogleArgs) => void;
  closeModal: () => void;
}) => {
  const classes = SignInStyle();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [googleError, setGoogleError] = React.useState<string | undefined>(
    undefined
  );
  const onError = (error: string) => setError(error);
  const onGoogleError = (error: string) => setGoogleError(error);
  const onSuccess = () => {
    setEmail("");
    setPassword("");
    setError(undefined);
    setGoogleError(undefined);
    closeModal();
  };
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, onError, onSuccess });
  };
  const onGoogleSuccess = ({
    email,
    name,
    token,
  }: {
    email: string;
    name: string;
    token: string;
  }) => {
    onSubmitGoogle({ email, token, onError: onGoogleError, onSuccess });
  };

  return (
    <form onSubmit={onFormSubmit} onChange={() => setError(undefined)}>
      <Grid container direction="column" spacing={2}>
        <Grid item className={classes.logo}>
          <Logo size="large" />
        </Grid>
        <Grid item>
          <Typography variant="h5" align="center">
            <b>Welcome Back</b>
          </Typography>
        </Grid>
        <Grid item>
          <GoogleLogin
            onSuccessLogin={onGoogleSuccess}
            label="Sign In with Google"
          />
        </Grid>
        {!!googleError && (
          <Grid item>
            <MuiAlert severity="error">{googleError}</MuiAlert>
          </Grid>
        )}
        <Grid item className={classes.dividerContainer}>
          <Divider className={classes.divider} />
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            or
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item>
          <EmailInput email={email} setEmail={setEmail} />
        </Grid>
        <Grid item>
          <PasswordInput password={password} setPassword={setPassword} />
        </Grid>
        {!!error && (
          <Grid item>
            <MuiAlert severity="error">{error}</MuiAlert>
          </Grid>
        )}
        <Grid item>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValidEmail(email) || password.length === 0}
          >
            Log In
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ display: "inline-block" }}>
            New to Abode?
          </Typography>
          <Link
            onClick={switchMode}
            style={{ display: "inline-block", marginLeft: "5px" }}
          >
            Sign Up
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

/**
 * Password component for sign in form
 * @param password
 * @param setPassword
 */
export const PasswordInput = ({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (password: string) => void;
}) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [visible, setVisible] = React.useState(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    setPassword(event.target.value);
  };
  const onBlur = () => {
    if (password === "") {
      setError("Password cannot be empty");
    }
    setError(undefined);
  };
  return (
    <TextField
      value={password}
      fullWidth
      error={!!error}
      helperText={error}
      onChange={onChange}
      label="Password"
      variant="outlined"
      type={visible ? "text" : "password"}
      onBlur={onBlur}
      InputProps={{
        endAdornment: (
          <div onClick={() => setVisible((visible) => !visible)}>
            {visible ? (
              <VisibilityIcon style={{ color: "#7b7b7b" }} />
            ) : (
                <VisibilityOffIcon style={{ color: "#7b7b7b" }} />
              )}
          </div>
        ),
      }}
    />
  );
};

/**
 * Email component for sign in form
 * @param email
 * @param setEmail
 */
export const EmailInput = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
}) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    setEmail(event.target.value);
  };
  const onBlur = () => {
    if (!isValidEmail(email)) {
      setError("Invalid email");
      return;
    }
    setError(undefined);
  };
  return (
    <TextField
      value={email}
      fullWidth
      error={!!error}
      helperText={error}
      onChange={onChange}
      label="Email"
      autoFocus
      variant="outlined"
      type="email"
      onBlur={onBlur}
      InputProps={{
        endAdornment: <AlternateEmailIcon style={{ color: "#7b7b7b" }} />,
      }}
    />
  );
};
