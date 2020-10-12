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

import SignUpStore from "./SignUpStore";
import SuccessView from "./successView/SuccessView";
import ModalWrapper from "../modalWrapper/ModalWrapper";
import UserDetailForm from "./userDetailForm/UserDetailForm";
import ContactDetailForm from "./contactDetailForm/ContactDetailForm";
import SignUpStyles from "./SignUpForm.css";

export interface SignUpFormProps {
  onSubmit: (
    usernm: string,
    email: string,
    phoneNo: string,
    passwd: string,
    passwdVerify: string
  ) => void; // (Jenn) TODO: Update with API call
  store: SignUpStore;
}

const SignUpForm: React.FC<SignUpFormProps> = observer(
  ({ onSubmit, store }) => {
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
          return <UserDetailForm store={store} />;
        case 1:
          return <ContactDetailForm store={store} />;
        case 2:
          return <SuccessView />;
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

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleConfirm = () => {
      setSuccess();
      onSubmit(
        store.usernm,
        store.email,
        store.phoneNo,
        store.passwd,
        store.passwdVerify
      );
      closeModal();
    };

    const canProceedStep0 = computed(
      () =>
        store.usernm.length > 0 &&
        store.email.includes("@") &&
        store.passwd.length > 0 &&
        store.passwd == store.passwdVerify
    );

    const canProceedStep1 = computed(
      () =>
        store.phoneNo.length == 10 &&
        store.addressLine.length > 0 &&
        store.suburb.length > 0 &&
        store.postcode.length > 0 &&
        store.state != "none"
    );

    const canProceedStep2 = computed(() => store.success == true);

    const steps = getSteps();
    const classes = SignUpStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    return (
      <ModalWrapper open={store.open} onClose={closeModal}>
        <Typography
          variant="h3"
          align="center"
          style={{ margin: "15px", marginBottom: "35px" }}
        >
          Sign Up
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep < steps.length && (
          <div className={classes.body}>
            {getStepContent(activeStep)}
            <div>
              {activeStep == 2 ? (
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
                      activeStep === steps.length - 1
                        ? handleConfirm
                        : handleNext
                    }
                    disabled={disableNext()}
                  >
                    {activeStep == 0 && "Next"}
                    {activeStep == 1 && "Sign Up"}
                  </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </ModalWrapper>
    );
  }
);

export default SignUpForm;
