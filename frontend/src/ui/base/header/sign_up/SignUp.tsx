import React from "react";
import { observer } from "mobx-react";
import { action, computed, runInAction } from 'mobx';
import {
  Button,
  Typography,
  StepLabel,
  Grid,
  Stepper,
  Link,
  Step,
} from "@material-ui/core";
import logo from "../../../../images/logo.png";
import { Step0, Step1, Step2 } from "./Steps";
import { SignUpStore } from "./SignUpStore";
import { SignUpStyles } from "./SignUp.css";
import Logo from "../../logo/Logo";
import { SignUpArgs } from "../../../../AuthContext";
import MuiAlert from '@material-ui/lab/Alert';

type SignUpProps = {
  onSubmit: (args: SignUpArgs) => void;
  store: SignUpStore;
  closeModal: () => void;
  switchMode: () => void;
}

export const SignUp = observer(({ onSubmit, store, closeModal, switchMode }: SignUpProps) => {
  const [error, setError] = React.useState<string | undefined>(undefined)
  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Step0 store={store} />;
      case 1:
        return <Step1 store={store} />;
      case 2:
        return <Step2 store={store} />;
      default:
        return "404 You've fallen into outer space!";
    }
  };

  const disableNext = () => {
    switch (activeStep) {
      case 0:
        return !canProceedStep0.get();
      case 1:
        return !canProceedStep1.get();
      case 2:
        return !canProceedStep2.get();
      default:
        return false;
    }
  };

  const canProceedStep0 = computed(
    () =>
      store.usernm !== "" &&
      store.email !== "" &&
      store.passwd !== "" &&
      store.passwd === store.passwdVerify
  );

  const canProceedStep1 = computed(() => store.phoneNo.length > 8);

  const canProceedStep2 = computed(
    () =>
      store.address.street !== "" &&
      store.address.suburb !== "" &&
      store.address.postcode !== "" &&
      store.address.state !== "" &&
      store.address.country !== ""
  );

  const handleNext = () => {
    setError(undefined);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setError(undefined);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirm = () => {
    setError(undefined);
    const onError = (error: string) => {
      setError(error);
    }

    const onSuccess = () => {
      runInAction(() => {
        store.address = {
          street: "",
          suburb: "",
          state: "",
          postcode: "",
          country: "",
        };
        store.phoneNo = "";
        store.email = "";
        store.passwd = "";
        store.usernm ="";
        store.passwdVerify = "";
        setError(undefined);
      })
      closeModal();
    }
    onSubmit({
      name: store.usernm,
      email: store.email,
      password: store.passwd,
      phone_number: store.phoneNo,
      address: store.address,
      onError,
      onSuccess,
    }
    );
  };

  const steps = ["User Details", "Phone Number", "Address"];
  const classes = SignUpStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item className={classes.logo}>
        <Logo size="large" />
      </Grid>
      <Grid item>
        <Typography variant="h5" align="center">
          <b>Join our family</b>
        </Typography>
      </Grid>
      <Grid item className={classes.switch}>
          <Typography variant="body1" style={{ display: "inline-block" }}>
            Already have an account?
          </Typography>
          <Link
            onClick={switchMode}
            style={{ display: "inline-block", marginLeft: "5px" }}
          >
            Sign In
          </Link>
        </Grid>
      <Grid item>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </Grid>
      {!!error && (
          <Grid item>
            <MuiAlert severity="error">{error}</MuiAlert>
          </Grid>
        )}
      <Grid item className={classes.actionButtons}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={
            activeStep === 2 ? () => handleConfirm() : () => handleNext()
          }
          disabled={disableNext()}
        >
          {activeStep === 2 ? "Sign Up" : "Next"}
        </Button>
      </Grid>
    </Grid>
  );
});
