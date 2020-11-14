import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Grid, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toSentenceCase } from "../../ui/util/helper";
import { FeaturePanelStyles } from "./FeaturePanel.css";
import * as Icon from "@material-ui/icons";

/**
 * Component to show the list of features included in the house
 * Each features will have a corresponding icon
 */
export const FeaturesPanel = ({ features }: { features: string[] }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (
    _event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = FeaturePanelStyles();
  return (
    <Accordion
      square
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography variant="h5">Features</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Grid container spacing={3} className={classes.grid}>
          {features.map((feature, i) => (
            <Grid item xs={12} sm={6} key={i} className={classes.listItem}>
              <ListItem>
                <ListItemIcon>{getFeatureIcon(feature)}</ListItemIcon>
                <Typography variant="body1">
                  {toSentenceCase(feature)}
                </Typography>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

/**
 * Maps a feature name to an icon
 * @param feature
 */
const getFeatureIcon = (feature: string) => {
  switch (feature) {
    case "ensuite":
      return <Icon.MeetingRoom />;
    case "builtInWardrobe":
      return <Icon.MeetingRoom />;
    case "bathtub":
      return <Icon.Bathtub />;
    case "furnished":
      return <Icon.Weekend />;
    case "openKitchen":
      return <Icon.Kitchen />;
    case "separateKitchen":
      return <Icon.Kitchen />;
    case "islandKitchen":
      return <Icon.Kitchen />;
    case "gasStove":
      return <Icon.LocalDining />;
    case "electricStove":
      return <Icon.LocalDining />;
    case "inductionStove":
      return <Icon.LocalDining />;
    case "balcony":
      return <Icon.Deck />;
    case "oceanView":
      return <Icon.BeachAccess />;
    case "bbq":
      return <Icon.OutdoorGrill />;
    case "porch":
      return <Icon.Deck />;
    case "pool":
      return <Icon.Pool />;
    case "gym":
      return <Icon.FitnessCenter />;
    default:
      return <div></div>;
  }
};
