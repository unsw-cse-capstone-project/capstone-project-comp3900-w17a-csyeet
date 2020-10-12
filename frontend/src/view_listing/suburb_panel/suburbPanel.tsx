import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const SuburbPanel = ({ suburb }: { suburb: string }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography variant="h5">{suburb} Suburb Profile</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>TODO: Implement API</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
