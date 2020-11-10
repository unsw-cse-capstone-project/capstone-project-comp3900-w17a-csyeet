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
import { ListingStore } from "../ListingPresenter";
import { Details } from "./Details";
import { Images } from "./Images";
import { Description } from "./Description";
import { AuctionDetails } from "./AuctionDetails";
import { PaymentDetails } from "./Payment";
import { ListingFormStyles } from "./ListingForm.css";
import Alert from "@material-ui/lab/Alert";
import { ArrowBackIos } from "@material-ui/icons";
export const ListingForm = observer(
  ({
    store,
    onPreview,
    onBack,
  }: {
    store: ListingStore;
    onPreview: () => void;
    onBack: () => void;
  }) => {
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
        store.listing.street !== "" &&
        store.listing.suburb !== "" &&
        store.listing.state !== "" &&
        store.listing.country !== "" &&
        store.listing.type !== ""
    );

    const completedStep1 = computed(() => store.listing.images.length > 0);

    const completedStep2 = computed(
      () => store.listing.title !== "" && store.listing.description !== ""
    );

    const completedStep3 = computed(
      () =>
        store.auction.auction_start !== null &&
        store.auction.auction_end !== null &&
        store.auction.reserve_price !== ""
    );

    const completedStep4 = computed(
      () =>
        store.payment.account_name !== "" &&
        store.payment.bsb.length === 6 &&
        store.payment.account_number.length === 8
    );

    const canPreview =
      completedStep0.get() &&
      completedStep1.get() &&
      completedStep2.get() &&
      completedStep3.get() &&
      completedStep4.get();

    const handleNext = () => {
      if (activeStep === steps.length - 1) {
        if (canPreview === false) setSnack(true);
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
            <div className={classes.headerButtons}>
              <Button className={classes.backToEditingButton} onClick={onBack}>
                <ArrowBackIos />
                Back
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={onPreview}
                disabled={!canPreview}
              >
                Preview
              </Button>
            </div>
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
          <div className={classes.footer}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Preview Listing" : "Next"}
            </Button>
          </div>
        </div>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setSnack(false)}
        >
          <Alert onClose={() => setSnack(false)} severity="error">
            You have yet to fill out all the information
          </Alert>
        </Snackbar>
      </div>
    );
  }
);
