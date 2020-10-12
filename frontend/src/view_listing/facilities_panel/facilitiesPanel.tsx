import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const FacilitiesPanel = ({ facilities }: { facilities: string }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography variant="h5">Nearby Facilities</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>TODO: Implement API</Typography>
        <Typography>{facilities}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
