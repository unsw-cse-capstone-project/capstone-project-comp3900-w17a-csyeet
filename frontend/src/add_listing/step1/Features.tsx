import React from "react";
import { observer } from "mobx-react";
import { Tabs, Tab, Paper, FormGroup } from "@material-ui/core";
import { ListingStore } from "../ListingStore";
import { CheckboxWrapper } from "../../ui/base/checkbox_wrapper/CheckboxWrapper";

export const Features: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const [tab, setTab] = React.useState<number>(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setTab(newValue);
    };

    const getTabContent = (tab: number) => {
      switch (tab) {
        case 0:
          return (
            <>
              <CheckboxWrapper
                checked={store.features.has_ensuite}
                field="has_ensuite"
                label="Ensuite"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_built_in_wardrobe}
                field="has_built_in_wardrobe"
                label="Built-in Wardrobe"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_bathtub}
                field="has_bathtub"
                label="Bathtub"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.is_furnished}
                field="is_furnished"
                label="Newly Furnished"
                onChange={onChecked}
              />
            </>
          );
        case 1:
          return (
            <>
              <CheckboxWrapper
                checked={store.features.has_open_kitchen}
                field="has_open_kitchen"
                label="Open Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_separate_kitchen}
                field="has_separate_kitchen"
                label="Separate Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_island_kitchen}
                field="has_island_kitchen"
                label="Island Kitchen"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_gas_stove}
                field="has_gas_stove"
                label="Gas Stove"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_electric_stove}
                field="has_electric_stove"
                label="Electric Stove"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_induction_stove}
                field="has_induction_stove"
                label="Induction Stove"
                onChange={onChecked}
              />
            </>
          );
        case 2:
          return (
            <>
              <CheckboxWrapper
                checked={store.features.has_balcony}
                field="has_balcony"
                label="Balcony"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_ocean_view}
                field="has_ocean_view"
                label="Ocean View"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_bbq}
                field="has_bbq"
                label="BBQ Area"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_porch}
                field="has_porch"
                label="Porch"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_pool}
                field="has_pool"
                label="Pool"
                onChange={onChecked}
              />
              <CheckboxWrapper
                checked={store.features.has_gym}
                field="has_gym"
                label="Gym"
                onChange={onChecked}
              />
            </>
          );
      }
    };

    const onChecked = (checked: boolean, field: string) => {
      (store as any)["features"][field] = checked;
    };

    return (
      <>
        <Paper style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Room Features" />
            <Tab label="Kitchen Features" />
            <Tab label="Outdoor Features" />
          </Tabs>
        </Paper>
        <FormGroup style={{ marginLeft: "10px" }}>
          {getTabContent(tab)}
        </FormGroup>
      </>
    );
  }
);
