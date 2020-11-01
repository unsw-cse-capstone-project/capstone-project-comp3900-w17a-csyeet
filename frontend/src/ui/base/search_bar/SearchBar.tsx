import { Button, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { action } from "mobx";
import * as React from "react";
import { SearchBarStyles } from "./SearchBar.css";
import { SearchStore } from "../../../search/SearchPresenter";
import { observer } from "mobx-react";
import { useHistory } from 'react-router-dom';

export const SearchBar = observer(
  ({ store }: { store: SearchStore }) => {
    const classes = SearchBarStyles();
    const history = useHistory();
    const onSubmit = () => {
      history.push(`/search?query=${store.input}`);
    }
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
