import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListingActual } from "../../ui/util/types/listing";
import { SuburbPanelStyle } from "./SuburbPanel.css";
import { toCapitaliseCase } from "../../ui/util/helper";

/**
 * Suburb Panel
 * Suburb sales statistics for a given suburb fetched from Domain API
 */
export const SuburbPanel = ({
  listing,
  Content,
}: {
  listing: ListingActual;
  Content: React.ComponentType;
}) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (
    _event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = SuburbPanelStyle();
  return (
    <Accordion
      square
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.accordianSummary}
      >
        <Typography variant="h5">
          {toCapitaliseCase(listing.suburb)} Suburb Profile
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordianDetails}>
        <Typography variant="body1" className={classes.description}>
          For a {listing.num_bedrooms} bedroom {listing.type} in{" "}
          {listing.suburb}
        </Typography>
        <Content />
      </AccordionDetails>
    </Accordion>
  );
};
