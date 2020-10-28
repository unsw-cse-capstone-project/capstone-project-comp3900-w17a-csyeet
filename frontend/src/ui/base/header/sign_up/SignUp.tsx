import React from "react";
import { observer } from "mobx-react";
import { action, computed } from "mobx";
import {
  Button,
  Typography,
  StepLabel,
  Stepper,
  Step,
} from "@material-ui/core";
import logo from "../../../../images/logo.png";
import { ModalWrapper } from "../../modal_wrapper/ModalWrapper";
import { SignUpStore } from "./SignUpStore";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import { SignUpStyles } from "./SignUp.css";

export interface SignUpProps {
  onSubmit: (name: string, email: string, password: string) => void;
  store: SignUpStore;
}

export const SignUp: React.FC<SignUpProps> = observer(({ onSubmit, store }) => {
  const closeModal = action(() => {
    store.open = false;
    store.success = false;
  });

  // Temporary Function
  const setSuccess = action(() => {
    store.success = true;
  });

  const getSteps = () => {
    return ["User Details", "Contact Details", "All done!"];
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Step0 store={store} />;
      case 1:
        return <Step1 store={store} />;
      case 2:
        return (
          <Typography>Redirecting you back to our search page...</Typography>
        );

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

  const canProceedStep1 = computed(
    () =>
      store.phoneNo.length === 10 &&
      store.addressLine !== "" &&
      store.suburb !== "" &&
      store.postcode !== "" &&
      store.addressLine.length !== 0 &&
      store.suburb.length > 0 &&
      store.postcode.length > 0 &&
      store.state !== "none"
  );

  const canProceedStep2 = computed(() => store.success === true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirm = () => {
    setSuccess();
    // onSubmit(
    //   store.usernm,
    //   store.email,
    //   store.passwd,
    //   store.passwdVerify,
    //   store.phoneNo,
    //   store.addressLine,
    //   store.suburb,
    //   store.state,
    //   store.postcode
    // );
    onSubmit(store.email, store.passwd, store.usernm);
    closeModal();
  };

  const steps = getSteps();
  const classes = SignUpStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <ModalWrapper open={store.open} onClose={closeModal}>
      <div className={classes.root}>
        <img
          width="200px"
          src={logo}
          alt="Adobe logo"
          style={{ marginBottom: "10px" }}
        />
        <Typography>Join our family today</Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep < steps.length && (
          <div className={classes.content}>
            <div className={classes.formContainer}>
              {getStepContent(activeStep)}
            </div>
            <div style={{ marginTop: "30px" }}>
              {activeStep === 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeModal}
                >
                  Close
                </Button>
              ) : (
                <>
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
                      activeStep === 1
                        ? () => handleConfirm()
                        : () => handleNext()
                    }
                    disabled={disableNext()}
                  >
                    {activeStep === 0 && "Next"}
                    {activeStep === 1 && "Sign Up"}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
});
