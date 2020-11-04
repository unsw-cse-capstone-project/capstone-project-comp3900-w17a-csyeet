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

    const onChecked = (checked: boolean, field: string) => {
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
            <Typography className={classes.heading}>Room Features </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <CheckboxWrapper
                checked={store.features.includes("has_ensuite")}
                field="has_ensuite"
                label="Ensuite"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_built_in_wardrobe")}
                field="has_built_in_wardrobe"
                label="Built-in Wardrobe"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_bathtub")}
                field="has_bathtub"
                label="Bathtub"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("is_furnished")}
                field="is_furnished"
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
            <Typography className={classes.heading}>Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <CheckboxWrapper
                checked={store.features.includes("has_open_kitchen")}
                field="has_open_kitchen"
                label="Open Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_separate_kitchen")}
                field="has_separate_kitchen"
                label="Separate Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_island_kitchen")}
                field="has_island_kitchen"
                label="Island Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_gas_stove")}
                field="has_gas_stove"
                label="Gas Stove"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_electric_stove")}
                field="has_electric_stove"
                label="Electric Stove"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_induction_stove")}
                field="has_induction_stove"
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
                checked={store.features.includes("has_balcony")}
                field="has_balcony"
                label="Balcony"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_ocean_view")}
                field="has_ocean_view"
                label="Ocean View"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_bbq")}
                field="has_bbq"
                label="BBQ Area"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_porch")}
                field="has_porch"
                label="Porch"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_pool")}
                field="has_pool"
                label="Pool"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.includes("has_gym")}
                field="has_gym"
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
