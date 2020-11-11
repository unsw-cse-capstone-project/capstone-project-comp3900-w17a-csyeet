import * as React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { action, computed } from "mobx";
import { observer } from "mobx-react";
import { InitialBidStep } from "./InitialBidStep";
import { PaymentStep } from "./PaymentStep";
import { BidderRegistrationStyle } from "./BidderRegistration.css";
import { ConfirmationStep } from "./ConfirmationStep";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { useHistory } from "react-router-dom";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";

function getSteps() {
  return ["Submit initial bid", "Payment details", "Confirmation"];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BidderRegistration = observer(
  ({
    store,
    listingId,
    onSubmit,
  }: {
    store: BidderRegistrationStore;
    listingId: number;
    onSubmit: (afterSubmit: () => void) => void;
  }) => {
    const classes = BidderRegistrationStyle();
    const [activeStep, setActiveStep] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const canProceedStep0 = computed(() => store.agreeToTerms);
    const canProceedStep1 = computed(
      () =>
        store.cardNumber &&
        store.expiryDate &&
        store.ccv &&
        store.cardNumber.length === 16 &&
        store.ccv.length === 3 &&
        store.expiryDate.length === 4 &&
        store.confirmPayment
    );
    const canSubmit = computed(() => store.submitState !== "submitting");
    const steps = getSteps();
    const isError = computed(() => store.submitState === "error");

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleConfirm = () => {
      onSubmit(() => setOpenModal(true));
    };

    const getStepContent = (stepIndex: number) => {
      switch (stepIndex) {
        case 0:
          return <InitialBidStep store={store} />;
        case 1:
          return <PaymentStep store={store}/>;
        case 2:
          return <ConfirmationStep store={store} />;
        default:
          return "Error T-T";
      }
    };
    const disableNext = () => {
      switch (activeStep) {
        case 0:
          return !canProceedStep0.get();
        case 1:
          return !canProceedStep1.get();
        case 2:
          return !canSubmit.get();
        default:
          return false;
      }
    };
    const history = useHistory();
    return (
      <div>
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
        {activeStep < steps.length && (
          <div className={classes.body}>
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
                  activeStep === steps.length - 1 ? handleConfirm : handleNext
                }
                disabled={disableNext()}
              >
                {activeStep === steps.length - 1 ? "Confirm" : "Next"}
              </Button>
            </div>
          </div>
        )}
        <Dialog TransitionComponent={Transition} keepMounted open={openModal}>
          <DialogTitle>Registration</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have successfully registered as a bidder
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => history.push(`/listing/${listingId}`)}
              color="primary"
            >
              Return to Listing
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={isError.get()}
          autoHideDuration={2000}
          onClose={action(() => (store.submitState = undefined))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert elevation={6} severity="error">
            Error occurred while trying to submit, please try again
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
);
