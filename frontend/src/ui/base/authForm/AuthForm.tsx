import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  TextField,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import NumberFormat from "react-number-format";
import AuthStore from "../../../stores/AuthStore";

import AuthFormStyles from "./AuthForm.css";

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};
export type FormData = {
  usernm: string | null;
  phoneNo: string | null;
  email: string | null;
  passwd: string | null;
};

const AuthForm: React.FC<{
  onSubmit: () => void; // (Jenn) Update then with API call
  store: AuthStore;
}> = observer(({ onSubmit, store }) => {
  const onChangeUsernm = action((value: string) => {
    store.usernm = value;
  });
  const onChangeEmail = action((value: string) => {
    store.email = value;
  });
  const onChangePhoneNo = action((value: string) => {
    store.phoneNo = value;
  });
  const onChangePasswd = action((value: string) => {
    store.passwd = value;
  });
  const onChangePasswdVerify = action((value: string) => {
    store.passwdVerify = value;
  });
  const onCloseModal = action(() => {
    store.formOpen = false;
  });

  const usernmInput = observer((props: string) => {
    return (
      <input
        value={store.usernm}
        onChange={(e) => {
          onChangeUsernm(e.target.value);
        }}
      />
    );
  });

  const emailInput = observer((props: string) => {
    return (
      <input
        value={store.email}
        onChange={(e) => {
          onChangeEmail(e.target.value);
        }}
      />
    );
  });
  const phoneNoInput = observer((props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;
    return (
      <NumberFormat
        {...other}
        format="#### ### ###"
        mask="#"
        value={store.phoneNo}
        onValueChange={(values) => {
          onChangePhoneNo(values.value);
        }}
      />
    );
  });
  const passwdInput = observer((props: string) => {
    return (
      <input
        value={store.passwd}
        onChange={(e) => {
          onChangePasswd(e.target.value);
        }}
      />
    );
  });

  const passwdVerifyInput = observer((props: string) => {
    return (
      <input
        value={store.passwdVerify}
        onChange={(e) => {
          onChangePasswdVerify(e.target.value);
        }}
      />
    );
  });

  const successView = (
    <>
      <Typography variant="h3" align="center">
        All done
      </Typography>
      <p>Redirecting you back to our search page...</p>
    </>
  );

  const signUpForm = (
    <>
      <Typography variant="h3" align="center">
        Sign Up
      </Typography>
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "20px" }}
      >
        <InputLabel
          htmlFor="outlined-adornment-fullname"
          style={{ background: "white" }}
          shrink
        >
          Full Name
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-fullname"
          endAdornment={
            <InputAdornment position="end">
              {<PersonOutlineIcon />}
            </InputAdornment>
          }
          style={{ margin: "5px" }}
          labelWidth={100}
        />
        <InputLabel
          htmlFor="outlined-adornment-email"
          // style={{ background: "white" }}
          shrink
        >
          Email
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          endAdornment={
            <InputAdornment position="end">
              {<AlternateEmailIcon />}
            </InputAdornment>
          }
          style={{ margin: "5px" }}
          labelWidth={100}
        />
        <InputLabel
          htmlFor="outlined-adornment-phone"
          style={{ background: "white" }}
          shrink
        >
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-phone"
          endAdornment={
            <InputAdornment position="end">
              {<PhoneAndroidOutlinedIcon />}
            </InputAdornment>
          }
          style={{ margin: "5px" }}
          labelWidth={100}
          inputComponent={phoneNoInput as any}
        />
        <br />
        <InputLabel
          htmlFor="outlined-adornment-passwd"
          style={{ background: "white" }}
          shrink
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-passwd"
          endAdornment={
            <InputAdornment position="end">
              {<VpnKeyOutlinedIcon />}
            </InputAdornment>
          }
          placeholder="Password"
          style={{ margin: "5px", marginTop: "10px" }}
          labelWidth={100}
        />
        <InputLabel
          htmlFor="outlined-adornment-passwdVerify"
          style={{ background: "white" }}
          // shrink
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput id="outlined-adornment-passwdVerify" labelWidth={100} />
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "5px", marginTop: "10px" }}
        onClick={() => {
          setSuccess(true);
          onSubmit();
          setTimeout(() => {
            onCloseModal();
          }, 800);
        }}
      >
        Sign Up
      </Button>
    </>
  );

  const signInForm = (
    <>
      <Typography variant="h3" align="center">
        Sign In
      </Typography>
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "20px" }}
      >
        <InputLabel
          htmlFor="outlined-adornment-email"
          style={{ background: "white" }}
          shrink
        >
          Email
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          endAdornment={
            <InputAdornment position="end">
              {<AlternateEmailIcon />}
            </InputAdornment>
          }
          labelWidth={60}
          // inputComponent={emailInput as any}
        />
        <InputLabel
          htmlFor="outlined-adornment-passwd"
          style={{ background: "white" }}
          shrink
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-passwd"
          endAdornment={
            <InputAdornment position="end">
              {<VpnKeyOutlinedIcon />}
            </InputAdornment>
          }
          labelWidth={60}
          inputComponent={passwdInput as any}
        />
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "10px" }}
        onClick={() => {
          console.log("signing up");
          setSuccess(true);
        }}
      >
        Sign In
      </Button>
    </>
  );

  const test = () => {
    return <div> HELLO</div>;
  };

  const classes = AuthFormStyles();
  const [formSuccess, setSuccess] = React.useState<boolean>(false);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={store.formOpen}
      onClose={onCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={store.formOpen}>
        <div className={classes.paper}>
          <div className="formContainer">
            {formSuccess ? (
              <div>{successView}</div>
            ) : (
              <>
                {store.formType == "signin" && <div>{test}</div>}
                {store.formType == "signup" && <div>{signUpForm}</div>}
              </>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
});

export default AuthForm;
