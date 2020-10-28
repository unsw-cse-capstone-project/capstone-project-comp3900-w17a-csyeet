import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const FeaturesPanel = ({ features }: { features: string[] }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion
      square
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ paddingLeft: "0px" }}
      >
        <Typography variant="h5">Features</Typography>
      </AccordionSummary>
      <AccordionDetails style={{borderTop: "solid 1px #eee",}}>
        <ul>
          {features.map((feature, i) => (
            <li key={i}>
              <Typography>
                {feature[0].toUpperCase() + feature.slice(1)}
              </Typography>
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};
