import {
  Button,
  Checkbox,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
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
import DateFnsUtils from "@date-io/date-fns";
import {
  DateRangePicker,
  DateRangeDelimiter,
  DateRange,
  LocalizationProvider,
} from "@material-ui/pickers";
import { NumberPicker } from "../../base/input/NumberPicker";
import { toCamelCase, toSentenceCase } from "../../util/helper";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

export const SearchBar = observer(({ store }: { store: SearchStore }) => {
  const classes = SearchBarStyles();
  const history = useHistory();
  const onSubmit = () => {
    const {
      input,
      filters: {
        type,
        beds,
        baths,
        cars,
        start_date,
        end_date,
        features,
        landmarks,
      },
    } = store;
    let featuresString = features ? features.join("_") : "";
    let landmarksString = landmarks ? landmarks.join("_") : "";

    let searchQuery = input ? `query=${input}` : "";
    searchQuery += type ? `&type=${type}` : "";
    searchQuery += beds ? `&beds=${beds}` : "";
    searchQuery += baths ? `&baths=${baths}` : "";
    searchQuery += cars ? `&cars=${cars}` : "";
    searchQuery += start_date ? `&start=${start_date.toISOString()}` : "";
    searchQuery += end_date ? `&end=${end_date.toISOString()}` : "";
    searchQuery += featuresString !== "" ? "&features=" + featuresString : "";
    searchQuery +=
      landmarksString !== "" ? "&landmarks=" + landmarksString : "";

    history.push("/search?" + searchQuery);
  };
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
});

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
  const classes = SearchBarStyles();

  const [showing, setShowing] = React.useState(false);

  // const [bedsFilter, setBedFilter] = React.useState(store.filters.beds);
  // const [bathsFilter, setBathsFilter] = React.useState(store.filters.baths);
  // const [carFilter, setCarFilter] = React.useState(store.filters.cars);

  const onChange = action((value: number, field: string) => {
    (store as any).filters[field] = value;
  });

  // const onBedChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
  //   setBedFilter(event.target.value as number);
  //   (store as any).filters.beds = event.target.value;
  // });

  // const onBathChange = action(
  //   (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setBathsFilter(event.target.value as number);
  //     (store as any).filters.baths = event.target.value;
  //   }
  // );

  // const onCarChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
  //   (store as any).filters.cars = event.target.value;
  //   setCarFilter(store.filters.cars);
  // });

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
          <TypePicker store={store} />
          <NumberPicker
            className={classes.formControl}
            value={store.filters.beds}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              onChange(e.target.value as number, "beds")
            }
            label="Beds"
          />
          <NumberPicker
            className={classes.formControl}
            value={store.filters.baths}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              onChange(e.target.value as number, "baths")
            }
            label="Baths"
          />
          <NumberPicker
            className={classes.formControl}
            value={store.filters.cars}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              onChange(e.target.value as number, "cars")
            }
            label="Cars"
          />
          <div className={classes.dateInput} style={{ flex: 4 }}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <MinMaxDateRangePicker store={store} />
            </LocalizationProvider>
          </div>

          <FeaturePicker store={store} />
          <LandmarkPicker store={store} />
        </div>
      </div>
    </div>
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Component functions

// export function NumberPicker(props: {
//   value: any;
//   onChange: any;
//   label: String;
// }) {
//   const classes = SearchBarStyles();

//   return (
//     <TextField
//       className={classes.formControl}
//       size="small"
//       variant="outlined"
//       style={{ flex: 1 }}
//       value={props.value}
//       onChange={props.onChange}
//       type="number"
//       InputProps={{ inputProps: { min: 1 } }}
//       label={props.label}
//     />
//   );
// }

export function TypePicker(props: { store: SearchStore }) {
  const classes = SearchBarStyles();

  const [typeFilter, setTypeFilter] = React.useState(props.store.filters.type);

  const onTypeChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFilter(event.target.value as string);
    props.store.filters.type =
      event.target.value === "" ? undefined : event.target.value;
  });

  return (
    <FormControl
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1 }}
    >
      <InputLabel id="type-label">Type</InputLabel>
      <Select
        value={typeFilter}
        onChange={(event: any) => onTypeChange(event)}
        labelId="type-label"
        label="Type"
      >
        <option value={""}></option>
        <option value={"house"}>House</option>
        <option value={"apartment"}>Apartment</option>
        <option value={"townhouse"}>Townhouse</option>
        <option value={"studio"}>Studio</option>
        <option value={"duplex"}>Duplex</option>
      </Select>
    </FormControl>
  );
}

export function FeaturePicker(props: { store: SearchStore }) {
  // Options for picker
  const features = [
    "Ensuite",
    "Built In wardrobe",
    "Bathtub",
    "Furnished",
    "Open kitchen",
    "Separate kitchen",
    "Island kitchen",
    "Gas stove",
    "Electric stove",
    "Induction stove",
    "Balcony",
    "Ocean view",
    "Bbq",
    "Porch",
    "Pool",
    "Gym",
  ];

  const classes = SearchBarStyles();

  const [featureFilters, setFeatureFilter] = React.useState(
    (props.store.filters.features || []).map((f) => {
      return toSentenceCase(f);
    })
  );
  const onChange = action((event: React.ChangeEvent<{}>, values: string[]) => {
    props.store.filters.features = values.map((feature) =>
      toCamelCase(feature.toLowerCase())
    );
    setFeatureFilter(props.store.filters.features);
  });

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={2}
      defaultValue={featureFilters}
      style={{ flex: 2 }}
      id="features-checkboxes"
      options={features}
      disableCloseOnSelect
      onChange={onChange}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      className={classNames(classes.formControl, classes.selectControl)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Features" />
      )}
    />
  );
}

export function LandmarkPicker(props: { store: SearchStore }) {
  // Options for picker
  const landmarks = [
    "Primary School",
    "Secondary School",
    "Train Station",
    "Park",
  ];

  const classes = SearchBarStyles();

  const [landmarkFilters, setLandmarkFilter] = React.useState(
    (props.store.filters.landmarks || []).map((f) => {
      return toSentenceCase(f);
    })
  );

  const onChange = action((event: React.ChangeEvent<{}>, values: string[]) => {
    props.store.filters.landmarks = values.map((landmark) =>
      toCamelCase(landmark.toLowerCase())
    );
    setLandmarkFilter(props.store.filters.landmarks);
  });

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={2}
      defaultValue={landmarkFilters}
      style={{ flex: 2 }}
      id="landmarks-checkboxes"
      options={landmarks}
      disableCloseOnSelect
      onChange={onChange}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      className={classNames(classes.formControl, classes.selectControl)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Landmarks" />
      )}
    />
  );
}

export function MinMaxDateRangePicker(props: { store: SearchStore }) {
  const [value, setValue] = React.useState<DateRange<Date>>([
    props.store.filters.start_date || null,
    props.store.filters.end_date || null,
  ]);

  const onChange = (newValue: DateRange<Date>) => {
    props.store.filters.start_date = newValue[0] ? newValue[0] : undefined;
    props.store.filters.end_date = newValue[1] ? newValue[1] : undefined;
    setValue(newValue);
  };

  return (
    <DateRangePicker
      disablePast
      value={value}
      onChange={onChange}
      renderInput={(startProps: any, endProps: any) => (
        <React.Fragment>
          <TextField
            {...startProps}
            size="small"
            style={{ backgroundColor: "white" }}
            helperText={undefined}
          />
          <DateRangeDelimiter> to </DateRangeDelimiter>
          <TextField
            {...endProps}
            size="small"
            style={{ backgroundColor: "white" }}
            helperText={undefined}
          />
        </React.Fragment>
      )}
    />
  );
}
