import {
  Button,
  Checkbox,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { action } from "mobx";
import * as React from "react";
import { SearchBarStyles } from "./SearchBar.css";
import { SearchStore } from "../../../search/SearchPresenter";
import { observer } from "mobx-react";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";

export const SearchBar = observer(
  ({ store, onSubmit }: { store: SearchStore; onSubmit(): void }) => {
    const classes = SearchBarStyles();
    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit();
    };
    return (
      <div>
        <form onSubmit={onFormSubmit} className={classes.form}>
          <SearchInputWrapper store={store} />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.formButton}
            disabled={store.input === ""}
          >
            Search
          </Button>
        </form>
        <div>
          <SearchFilterWrapper store={store} />
        </div>
      </div>
    );
  }
);

const SearchInputWrapper = ({ store }: { store: SearchStore }) => {
  const [value, setValue] = React.useState(store.input);
  const classes = SearchBarStyles();
  const onChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    store.input = event.target.value;
    setValue(event.target.value);
  });
  return (
    <TextField
      id="Search"
      value={value}
      onChange={onChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      fullWidth
      placeholder="Search for a location"
      className={classes.textInput}
    />
  );
};

const SearchFilterWrapper = ({ store }: { store: SearchStore }) => {
  const [showing, setShowing] = React.useState(false);
  const [typeFilter, setTypeFilter] = React.useState(store.filters.type);
  const [bedsFilter, setBedFilter] = React.useState(store.filters.beds);
  const [bathsFilter, setBathsFilter] = React.useState(store.filters.baths);
  const [carFilter, setCarFilter] = React.useState(store.filters.cars);
  const [startDateValue, setStartDateFilter] = React.useState<Date | null>(
    store.filters.start_date
  );
  const [endDateValue, setEndDateFilter] = React.useState<Date | null>(
    store.filters.end_date
  );

  const [featureFilters, setFeatureFilter] = React.useState(
    store.filters.features
  );

  const classes = SearchBarStyles();

  const onTypeChange = action(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      // Set values for filters in the store
      console.log(event.target.value);
      setTypeFilter(event.target.value as string);
      (store as any).filters.type = event.target.value;
      console.log(store.filters.type);
      console.log("typeFilter:" + typeFilter);
    }
  );

  const onBedChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    // Set values for filters in the store
    console.log(event.target.value);
    setBedFilter(event.target.value as number);
    (store as any).filters.beds = event.target.value;
    console.log(store.filters.beds);
  });

  const onBathChange = action(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      // Set values for filters in the store
      setBathsFilter(event.target.value as number);
      (store as any).filters.baths = event.target.value;
      console.log(store.filters.baths);
    }
  );

  const onCarChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    // Set values for filters in the store
    (store as any).filters.cars = event.target.value;
    setCarFilter(store.filters.cars);
    console.log(store.filters.cars);
  });

  const onStartDateChange = action((date: Date | null) => {
    // Set values for filters in the store
    setStartDateFilter(date as Date);
    (store as any).filters.start_date = date;
    console.log(store.filters.start_date);
  });

  const onEndDateChange = action((date: Date | null) => {
    // Set values for filters in the store
    setEndDateFilter(date as Date);
    (store as any).filters.end_date = date;
    console.log(store.filters.end_date);
  });

  const onFeaturesChange = action(
    (event: React.ChangeEvent<{}>, values: { feature: string }[]) => {
      // Set values for filters in the store
      let tempFeatures = [];
      (store as any).filters.features = [];
      for (let features in values) {
        (store as any).filters.features.push(values[features].feature);
        tempFeatures.push(values[features].feature);
      }
      setFeatureFilter(tempFeatures);
    }
  );

  const onLandmarksChange = action(
    (event: React.ChangeEvent<{}>, values: { landmark: string }[]) => {
      // Set values for filters in the store
      (store as any).filters.landmarks = [];
      for (let landmarks in values) {
        (store as any).filters.landmarks.push(values[landmarks].landmark);
      }
    }
  );

  return (
    <div>
      <div>
        <Button
          className={classes.filterDropdown}
          onClick={() => {
            showing ? setShowing(false) : setShowing(true);
          }}
        >
          Refine Your Search
        </Button>
      </div>
      <div>
        <div
          className={classes.filters}
          style={{ display: showing ? "flex" : "none" }}
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="type-native-simple">Type</InputLabel>
            <Select value={typeFilter} onChange={onTypeChange}>
              <option value={"house"}>House</option>
              <option value={"apartment"}>Apartment</option>
              <option value={"townhouse"}>Townhouse</option>
              <option value={"studio"}>Studio</option>
              <option value={"duplex"}>Duplex</option>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="bed-native-simple">Bed</InputLabel>
            <Select value={bedsFilter} onChange={onBedChange}>
              <option value={1}>1 Bed</option>
              <option value={2}>2 Beds</option>
              <option value={3}>3 Beds</option>
              <option value={4}>4 Beds</option>
              <option value={5}>5 Beds</option>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="bath-native-simple">Baths</InputLabel>
            <Select value={bathsFilter} onChange={onBathChange}>
              <option value={1}>1 Baths</option>
              <option value={2}>2 Baths</option>
              <option value={3}>3 Baths</option>
              <option value={4}>4 Baths</option>
              <option value={5}>5 Baths</option>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="car-native-simple">Cars</InputLabel>
            <Select value={carFilter} onChange={onCarChange}>
              <option value={1}>1 Car</option>
              <option value={2}>2 Car</option>
              <option value={3}>3 Car</option>
              <option value={4}>4 Car</option>
              <option value={5}>5 Car</option>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={classes.formControl}
              label="Auction Start Date"
              value={startDateValue}
              onChange={onStartDateChange}
            />
            <DatePicker
              className={classes.formControl}
              label="Auction End Date"
              value={endDateValue}
              onChange={onEndDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div
          className={classes.filters}
          style={{ display: showing ? "flex" : "none" }}
        >
          <Autocomplete
            multiple
            id="features-checkboxes"
            options={features}
            disableCloseOnSelect
            onChange={onFeaturesChange}
            getOptionLabel={(option) => option.feature}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.feature}
              </React.Fragment>
            )}
            className={classes.selectControl}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Features"
                placeholder="Features"
              />
            )}
          />
          <Autocomplete
            multiple
            id="landmarks-checkboxes"
            options={landmarks}
            disableCloseOnSelect
            onChange={onLandmarksChange}
            getOptionLabel={(option) => option.landmark}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.landmark}
              </React.Fragment>
            )}
            className={classes.selectControl}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Landmarks"
                placeholder="Landmarks"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const features = [
  { feature: "ensuite" },
  { feature: "builtinWardobe" },
  { feature: "bathtub" },
  { feature: "furnished" },
  { feature: "openKitchen" },
  { feature: "separateKitchen" },
  { feature: "islandKitchen" },
  { feature: "gasStove" },
  { feature: "electricStove" },
  { feature: "inductionStove" },
  { feature: "balcony" },
  { feature: "oceanView" },
  { feature: "bbq" },
  { feature: "porch" },
  { feature: "pool" },
  { feature: "gym" },
];
const landmarks = [
  { landmark: "Primary School" },
  { landmark: "Secondary School" },
  { landmark: "Train Station" },
  { landmark: "Park" },
];
