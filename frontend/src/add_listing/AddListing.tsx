import React from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@material-ui/core";
import { ListingStore } from "./ListingStore";
import { Details } from "./step1/Details";
import { Description } from "./step3/Description";
import { AuctionDetails } from "./step4/AuctionDetails";
import { PaymentDetails } from "./step5/PaymentDetails";
import { AddListingStyles } from "./AddListing.css";
export const AddListing: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
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
          return <Typography>Step 2 - Images</Typography>;
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

    const [completed, setCompleted] = React.useState(new Set<number>());
    const isStepComplete = (step: number) => {
      switch (step) {
        case 0:
          return completedStep0.get();
        case 1:
          return true;
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
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      checkCompleted(activeStep);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
      checkCompleted(activeStep);
      setActiveStep(step);
    };

    const history = useHistory();
    const handlePreview = () => {
      history.push("/");
    };

    const classes = AddListingStyles();
    return (
      <div>
        <div className={classes.header}>
          <Typography variant="h3" style={{ marginBottom: "20px" }}>
            Add Listing
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
            onClick={handlePreview}
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
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePreview}
                disabled={completed.size === steps.length}
              >
                Preview your listing
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
