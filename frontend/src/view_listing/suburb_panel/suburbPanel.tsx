import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Paper, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListingActual } from "../../ui/util/types/listing";
import { SuburbPanelStyle } from "./suburbPanel.css";

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
        aria-controls="panel3a-content"
        id="panel3a-header"
        className={classes.accordianSummary}
      >
        <Typography variant="h5">{listing.suburb[0].toUpperCase() + listing.suburb.slice(1)} Suburb Profile</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordianDetails}>
        <Paper className={classes.textContainer}>
          <Typography variant="body1">
            For a {listing.num_bedrooms} bedroom {listing.type} in{" "}
            {listing.suburb}
          </Typography>
        </Paper>
        <Content />
      </AccordionDetails>
    </Accordion>
  );
};
