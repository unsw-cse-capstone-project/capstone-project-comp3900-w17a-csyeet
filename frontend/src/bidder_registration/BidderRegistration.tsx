import * as React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { observable, computed, makeObservable } from "mobx";
import { observer } from "mobx-react";
import { InitialBidStep } from "./InitialBidStep";
import { PaymentStep } from "./PaymentStep";
import { bidderRegistrationStyle } from "./BidderRegistration.css";
import { ConfirmationStep } from "./ConfirmationStep";
import {
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Address } from "../auction/AuctionPage";
import { ArrowBackIos } from "@material-ui/icons";

// (Teresa) Intentionally left uninitialised
export class BidderRegistrationStore {
  @observable
  initialBid: number = 0;

  @observable
  cardNumber: string = "";

  @observable
  expiryDate: string = "";

  @observable
  ccv: string = "";

  @observable
  agreeToTerms: boolean = false;

  constructor() {
    makeObservable(this);
  }
}

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
    currentBid,
    address,
  }: {
    store: BidderRegistrationStore;
    currentBid: number;
    address: Address;
  }) => {
    const classes = bidderRegistrationStyle();
    const [activeStep, setActiveStep] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const canProceedStep0 = computed(
      () => store.agreeToTerms && store.initialBid > currentBid
    );
    const canProceedStep1 = computed(
      () =>
        store.cardNumber &&
        store.expiryDate &&
        store.ccv &&
        store.cardNumber.length === 16 &&
        store.ccv.length === 3 &&
        store.expiryDate.length === 4
    );
    const steps = getSteps();

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleConfirm = () => {
      setOpenModal(true);
    };

    const getStepContent = (stepIndex: number) => {
      switch (stepIndex) {
        case 0:
          return <InitialBidStep store={store} currentBid={currentBid} />;
        case 1:
          return <PaymentStep store={store} />;
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
        default:
          return false;
      }
    };
    const { streetAddress, suburb, state, postcode } = address;
    return (
      <div className={classes.root}>
        <div className={classes.main}>
          <Button className={classes.backToListingButton}>
            <ArrowBackIos />
            Back to Listing
          </Button>
          <Typography variant="h3" align="center">
            Register as a Bidder
          </Typography>
          <Typography variant="h5" align="center" className={classes.address}>
            {streetAddress}
            {", "}
            {suburb}
            {", "}
            <span style={{ textTransform: "uppercase" }}>{state}</span>{" "}
            {postcode}
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
                      activeStep === steps.length - 1
                        ? handleConfirm
                        : handleNext
                    }
                    disabled={disableNext()}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Dialog
            TransitionComponent={Transition}
            keepMounted
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Registration
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                You have successfully registered as a bidder Return to Listing
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => console.log("done")} color="primary">
                Return to Listing
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
);
