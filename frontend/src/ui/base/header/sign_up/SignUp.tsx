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
import { Step0, Step1, Step2 } from "./Steps";
import { ModalWrapper } from "../../modal_wrapper/ModalWrapper";
import { SignUpStore } from "./SignUpStore";
import { SignUpStyles } from "./SignUp.css";
import { AddressDetails } from "../../address_form/AddressForm";

export const SignUp: React.FC<{
  onSubmit: (
    name: string,
    email: string,
    password: string,
    phoneNo: string,
    address: AddressDetails
  ) => void;
  store: SignUpStore;
}> = observer(({ onSubmit, store }) => {
  const closeModal = action(() => {
    store.open = false;
  });

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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirm = () => {
    onSubmit(
      store.usernm,
      store.email,
      store.passwd,
      store.phoneNo,
      store.address
    );
    closeModal();
  };

  const steps = ["User Details", "Phone Number", "Address"];
  const classes = SignUpStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <ModalWrapper open={store.open} onClose={closeModal}>
      <div className={classes.root}>
        <img
          width="200px"
          src={logo}
          alt="Adobe logo"
          style={{ marginBottom: "10px", alignContent: "center" }}
        />
        <Typography style={{ alignContent: "center" }}>
          Join our family today
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep < steps.length && (
          <div>
            {getStepContent(activeStep)}
            <div>
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
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
});
