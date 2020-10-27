import React from "react";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Snackbar,
} from "@material-ui/core";
import { ListingStore } from "../ListingStore";
import { Details } from "./step1/Details";
import { Images } from "./step2/Images";
import { Description } from "./step3/Description";
import { AuctionDetails } from "./step4/AuctionDetails";
import { PaymentDetails } from "./step5/PaymentDetails";
import { ListingFormStyles } from "./ListingForm.css";
import Alert from "@material-ui/lab/Alert";
export const ListingForm: React.FC<{
  store: ListingStore;
}> = observer(({ store }) => {
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

  const setPreview = action((preview: boolean) => {
    store.canPreview = preview;
  });

  const [completed, setCompleted] = React.useState(new Set<number>());
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
      store.streetNo !== "" &&
      store.streetName !== "" &&
      store.streetType !== "" &&
      store.suburb !== "" &&
      store.state !== "" &&
      store.country !== "" &&
      store.type !== "" &&
      store.nBedrooms !== "" &&
      store.nBathrooms !== "" &&
      store.nGarages !== ""
  );

  const completedStep1 = computed(() => store.images.length > 0);

  const completedStep2 = computed(() => store.descTitle !== "");

  const completedStep3 = computed(
    () =>
      store.auctionStart !== null &&
      store.auctionEnd !== null &&
      store.reservePrice !== ""
  );

  const completedStep4 = computed(
    () =>
      store.accName !== "" &&
      store.bsb.length === 6 &&
      store.accNumber.length === 8
  );

  const checkCompleted = (step: number) => {
    if (isStepComplete(activeStep) && !completed.has(activeStep)) {
      const newCompleted = new Set(completed);
      newCompleted.add(activeStep);
      setCompleted(newCompleted);
    }
  };
  const handleNext = () => {
    checkCompleted(activeStep);
    setPreview(completed.size === steps.length);
    activeStep === steps.length - 1
      ? setSnack(true)
      : setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    checkCompleted(activeStep);
    setPreview(completed.size === steps.length);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    checkCompleted(activeStep);
    setPreview(completed.size === steps.length);
    setActiveStep(step);
  };

  const [openSnack, setSnack] = React.useState<boolean>(false);
  const classes = ListingFormStyles();
  return (
    <div>
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
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
          {store.canPreview
            ? "All completed! Your preview is available now"
            : "You have yet to fill out all the information!"}
        </Alert>
      </Snackbar>
    </div>
  );
});
