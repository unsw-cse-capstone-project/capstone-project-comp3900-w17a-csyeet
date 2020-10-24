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
        <div className={classes.filters}>
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
  const [typeFilter, setTypeFilter] = React.useState(store.filters.type);
  const [bedsFilter, setBedFilter] = React.useState(store.filters.beds);
  const [bathsFilter, setBathsFilter] = React.useState(store.filters.baths);
  const [startDateValue, setStartDateFilter] = React.useState<Date | null>(
    store.filters.start_date
  );
  const [endDateValue, setEndDateFilter] = React.useState<Date | null>(
    store.filters.end_date
  );

  const classes = SearchBarStyles();

  // const onChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Set values for filters in the store
  //   const name = event.target.name;
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  //   setFilter({
  //     ...store.filters,
  //     [name]: event.target.value,
  //   });
  // });

  const onTypeChange = action(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      // Set values for filters in the store
      console.log(event.target.value);
      setTypeFilter(event.target.value as string);
      (store as any).filters.type = event.target.value;
      console.log(store.filters.type);
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
    console.log(store.filters.cars);
  });

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="type-native-simple">Type</InputLabel>
        <Select onChange={onTypeChange}>
          <option value={"house"}>House</option>
          <option value={"apartment"}>Apartment</option>
          <option value={"townhouse"}>Townhouse</option>
          <option value={"studio"}>Studio</option>
          <option value={"duplex"}>Duplex</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="bed-native-simple">Bed</InputLabel>
        <Select onChange={onBedChange}>
          <option value={1}>1 Bed</option>
          <option value={2}>2 Beds</option>
          <option value={3}>3 Beds</option>
          <option value={4}>4 Beds</option>
          <option value={5}>5 Beds</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="bath-native-simple">Baths</InputLabel>
        <Select onChange={onBathChange}>
          <option value={1}>1 Baths</option>
          <option value={2}>2 Baths</option>
          <option value={3}>3 Baths</option>
          <option value={4}>4 Baths</option>
          <option value={5}>5 Baths</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="car-native-simple">Cars</InputLabel>
        <Select onChange={onCarChange}>
          <option value={1}>1 Car</option>
          <option value={2}>2 Car</option>
          <option value={3}>3 Car</option>
          <option value={4}>4 Car</option>
          <option value={5}>5 Car</option>
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Auction Start Date"
          value={startDateValue}
          onChange={(newValue) => setStartDateFilter(newValue)}
        />
        <DatePicker
          label="Auction End Date"
          value={endDateValue}
          onChange={(newValue) => setEndDateFilter(newValue)}
        />
      </MuiPickersUtilsProvider>
      <Autocomplete
        multiple
        id="features-checkboxes"
        options={features}
        disableCloseOnSelect
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
        style={{ width: 400 }}
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
        style={{ width: 400 }}
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
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const features = [
  { feature: "Ensuite" },
  { feature: "Bathroom" },
  { feature: "Build in Wardrobe" },
  { feature: "Bathtub" },
  { feature: "Furnished" },
  { feature: "Open Kitchen" },
  { feature: "Separate Kitchen" },
  { feature: "Island Kitchen" },
  { feature: "Gas Stove" },
  { feature: "Electric Stove" },
  { feature: "Induction Stove" },
  { feature: "Balcony" },
  { feature: "Ocean View" },
  { feature: "BBQ" },
  { feature: "Porch " },
  { feature: "Pool" },
  { feature: "Gym" },
];
const landmarks = [
  { landmark: "Primary School" },
  { landmark: "Secondary School" },
  { landmark: "Train Station" },
  { landmark: "Park" },
];
