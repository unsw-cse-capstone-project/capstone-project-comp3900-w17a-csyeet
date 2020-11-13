import {
  Grid,
  Typography,
  Button,
  Divider,
  Link,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { SignInArgs } from "../../../../AuthContext";
import { isValidEmail } from "../../../util/helper";
import Logo from "../../logo/Logo";
import { SignInStyle } from "./SignIn.css";
import MuiAlert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { GoogleLogin } from "../google_auth/GoogleAuth";

export const SignIn = ({
  switchMode,
  onSubmit,
  closeModal,
}: {
  switchMode: () => void;
  onSubmit: (args: SignInArgs) => void;
  closeModal: () => void;
}) => {
  const classes = SignInStyle();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onError = (error: string) => setError(error);
    const onSuccess = () => {
      setEmail("");
      setPassword("");
      setError("");
      closeModal();
    };
    onSubmit({ email, password, onError, onSuccess });
  };
  const onSuccess = ({
    email,
    name,
    googleId,
  }: {
    email: string;
    name: string;
    googleId: string;
  }) => {
    console.log({ email, name, googleId });
  };
  const onError = (error: string) => console.log(error);

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
          <GoogleLogin onSuccessLogin={onSuccess} onError={onError} label="Sign In with Google" />
        </Grid>
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
