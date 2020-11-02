import React from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import {
  Button,
  Stepper,
  Step,
  StepButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { ListingStore } from "../ListingStore";
import { Details } from "./Details";
import { Images } from "./Images";
import { Description } from "./Description";
import { AuctionDetails } from "./AuctionDetails";
import { PaymentDetails } from "./Payment";
import { ListingFormStyles } from "./ListingForm.css";
import Alert from "@material-ui/lab/Alert";
export const ListingForm: React.FC<{
  store: ListingStore;
  onPreview: () => void;
}> = observer(({ store, onPreview }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = [
    "Property Details",
    "Upload Images",
    "Property Description",
    "Auction Detail",
    "Payment Details",
  ];
  const getContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <Details store={store} />;
      case 1:
        return <Images store={store} />;
      case 2:
        return <Description store={store} />;
      case 3:
        return <AuctionDetails store={store} />;
      case 4:
        return <PaymentDetails store={store} />;
      default:
        return "404 You've fallen into outer space!";
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return completedStep0.get();
      case 1:
        return completedStep1.get();
      case 2:
        return completedStep2.get();
      case 3:
        return completedStep3.get();
      case 4:
        return completedStep4.get();
      default:
        return false;
    }
  };

  const completedStep0 = computed(
    () =>
      store.street !== "" &&
      store.suburb !== "" &&
      store.state !== "" &&
      store.country !== "" &&
      store.type !== "" &&
      store.nBedrooms !== "" &&
      store.nBathrooms !== "" &&
      store.nGarages !== ""
  );

  const completedStep1 = computed(() => store.images.length > 0);

  const completedStep2 = computed(
    () => store.descTitle !== "" && store.desc !== ""
  );

  const completedStep3 = computed(
    () =>
      store.auctionStart !== null &&
      store.auctionEnd !== null &&
      store.reservePrice !== 0
  );

  const completedStep4 = computed(
    () =>
      store.accName !== "" &&
      store.bsb.length === 6 &&
      store.accNumber.length === 8
  );

  const canPreview =
    completedStep0.get() &&
    completedStep1.get() &&
    completedStep2.get() &&
    completedStep3.get() &&
    completedStep4.get();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (store.canPreview == false) setSnack(true);
      else onPreview();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const [openSnack, setSnack] = React.useState<boolean>(false);
  const classes = ListingFormStyles();
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <Typography variant="h3" align="center">
            Add Listing
          </Typography>
          <Button
            size="large"
            style={{ margin: "5px" }}
            variant="contained"
            color="secondary"
            onClick={onPreview}
            // disabled={!canPreview}
          >
            Preview
          </Button>
        </div>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const buttonProps: { optional?: React.ReactNode } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className={classes.body}>
        {getContent(activeStep)}
        <div style={{ marginTop: "10px" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Add Listing" : "Next"}
          </Button>
        </div>
      </div>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setSnack(false)}
      >
        <Alert
          onClose={() => setSnack(false)}
          severity={store.canPreview ? "success" : "error"}
        >
          You have yet to fill out all the information!
        </Alert>
      </Snackbar>
    </div>
  );
});
