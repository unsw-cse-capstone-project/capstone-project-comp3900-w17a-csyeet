import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const FeaturesPanel = ({ features }: { features: string }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">Nearby Features</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>TODO: Implement API</Typography>
        <Typography>{features}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
