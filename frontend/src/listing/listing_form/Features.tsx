import React from "react";
import { observer } from "mobx-react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  Typography,
} from "@material-ui/core";
import { ListingStore, Feature } from "../ListingStore";
import {action} from 'mobx';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CheckboxWrapper } from "../../ui/base/checkbox_wrapper/CheckboxWrapper";

const FeatureStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export const Features: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const removeFeature = (array: Feature[], feature: Feature) => {
      return array.filter(function (e) {
        return e !== feature;
      });
    };

    const onChecked = action((checked: boolean, field: string) => {
      if (checked && !store.features.includes(field as Feature)) {
        store.features.push(field as Feature);
      } else if (!checked && store.features.includes(field as Feature)) {
        store.features = removeFeature(store.features, field as Feature);
      }
    };

    const classes = FeatureStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (
      event: React.ChangeEvent<{}>,
      isExpanded: boolean
    ) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
      <div className={classes.root}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Room Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <CheckboxWrapper
                checked={store.features.includes("ensuite")}
                field="ensuite"
                label="Ensuite"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("builtInWardrobe")}
                field="builtInWardrobe"
                label="Built-in Wardrobe"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("bathtub")}
                field="bathtub"
                label="Bathtub"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("furnished")}
                field="furnished"
                label="Newly Furnished"
                onChange={onChecked}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Kitchen Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <CheckboxWrapper
                checked={store.features.includes("openKitchen")}
                field="openKitchen"
                label="Open Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("separateKitchen")}
                field="separateKitchen"
                label="Separate Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("islandKitchen")}
                field="islandKitchen"
                label="Island Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("gasStove")}
                field="gasStove"
                label="Gas Stove"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("electricStove")}
                field="electricStove"
                label="Electric Stove"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("inductionStove")}
                field="inductionStove"
                label="Induction Stove"
                onChange={onChecked}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>
              Outdoor Features
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <CheckboxWrapper
                checked={store.features.includes("balcony")}
                field="balcony"
                label="Balcony"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("oceanView")}
                field="oceanView"
                label="Ocean View"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("bbq")}
                field="bbq"
                label="BBQ Area"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("porch")}
                field="porch"
                label="Porch"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("pool")}
                field="pool"
                label="Pool"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("gym")}
                field="gym"
                label="Gym"
                onChange={onChecked}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
);
