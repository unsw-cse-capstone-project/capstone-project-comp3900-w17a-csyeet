import {
  Button,
  Checkbox,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  FormControl,
  FormControlLabel,
  Typography,
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
        closed_auction,
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
    searchQuery += closed_auction === 'true' ? `&include_closed_auctions=true` : `&include_closed_auctions=false`;

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

  const [bedsFilter, setBedFilter] = React.useState(store.filters.beds);
  const [bathsFilter, setBathsFilter] = React.useState(store.filters.baths);
  const [carFilter, setCarFilter] = React.useState(store.filters.cars);

  const onBedChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    setBedFilter(event.target.value as number);
    (store as any).filters.beds = event.target.value;
  });

  const onBathChange = action(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setBathsFilter(event.target.value as number);
      (store as any).filters.baths = event.target.value;
    }
  );

  const onCarChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    (store as any).filters.cars = event.target.value;
    setCarFilter(store.filters.cars);
  });

  return (
    <div>
      <div>
        <Button
          className={classes.filterDropdown}
          onClick={() => {
            showing ? setShowing(false) : setShowing(true);
          }}
        >
          Advanced Search
        </Button>
      </div>
      <div>
        <div
          className={classes.filters}
          style={{ display: showing ? "flex" : "none" }}
        >
          <div className={classes.filterRows}>
            <TypePicker store={store} />
            <NumberPicker
              store={store}
              value={bedsFilter}
              onChange={onBedChange}
              label="Beds"
            />
            <NumberPicker
              store={store}
              value={bathsFilter}
              onChange={onBathChange}
              label="Baths"
            />
            <NumberPicker
              store={store}
              value={carFilter}
              onChange={onCarChange}
              label="Cars"
            />
            <div className={classes.dateInput} style={{ flex: 4 }}>
              <LocalizationProvider dateAdapter={DateFnsUtils}>
                <MinMaxDateRangePicker store={store} />
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.filterRows}>
            <FeaturePicker store={store} />
            <LandmarkPicker store={store} />
            <ClosedAuctionsPicker store={store} />
          </div>
        </div>
      </div>
    </div>
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
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

export function NumberPicker(props: {
  store: SearchStore;
  value: any;
  onChange: any;
  label: String;
}) {
  const classes = SearchBarStyles();

  return (
    <TextField
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1 }}
      value={props.value}
      onChange={props.onChange}
      type="number"
      InputProps={{ inputProps: { min: 1 } }}
      label={props.label}
    />
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
      style={{ flex: 1 }}
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
      style={{ flex: 1 }}
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

export function ClosedAuctionsPicker(props: { store: SearchStore }) {
  const classes = SearchBarStyles();

  const [closedAuction, setClosedAuction] = React.useState(props.store.filters.closed_auction);

  const onChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setClosedAuction(event.target.checked === true ? 'true' : 'false');
    props.store.filters.closed_auction =
      event.target.checked === true ? 'true' : 'false';
  });

  return (
    <FormControl
      className={classes.formControl}
      size="small"
      variant="outlined"
      style={{ flex: 1, background: 'none' }}>

      <FormControlLabel
        control={
          <Checkbox
            checked={closedAuction === "true" ? true : false}
            onChange={onChange}
            name="Closed Auction"
            color="primary"
            style={{ paddingLeft: '20px' }}
          />
        }
        label={<Typography variant="body2" color="textSecondary">Include Closed Auctions</Typography>}
      />
    </FormControl >

  );
}
