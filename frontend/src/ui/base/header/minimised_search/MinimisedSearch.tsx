import {
  TextField,
  InputAdornment,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";

const MinimisedSearchStyle = makeStyles((theme: Theme) =>
  createStyles({
    textInput: {
      borderRadius: "1000px",
      backgroundColor: theme.palette.background.paper,
      "& *": {
        borderRadius: "1000px",
      },
      [theme.breakpoints.down('sm')]: {
        width: "170px",
      }
    },
    searchButton: {
      width: "42px",
      height: "42px",
      padding: 0,
      marginRight: theme.spacing(1.5),
    },
    form: {
      marginRight: theme.spacing(1.5),
    }
  })
);

/**
 * Minimised Search component used for the header
 */
export const MinimisedSearch = () => {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const classes = MinimisedSearchStyle();
  const history = useHistory();

  const onClick = () => {
    setOpen((isOpen) => !isOpen);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (query !== "") {
      history.push(`/search?query=${query}`);
      setOpen(false);
    }
  };

  return open ? (
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        id="Search"
        value={query}
        autoFocus={true}
        size="small"
        onBlur={() => query === "" && setOpen(false)}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(value.target.value)
        }
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
    </form>
  ) : (
      <IconButton
        aria-label="Search"
        onClick={onClick}
        className={classes.searchButton}
      >
        <Search fontSize="inherit" />
      </IconButton>
    );
};
