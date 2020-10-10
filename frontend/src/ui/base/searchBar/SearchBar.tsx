import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { IconButton, Paper, TextField, Button } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SearchStore from "./SearchStore";
import { observer } from "mobx-react";
import { action } from "mobx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      borderRadius: 20,
      width: 400,
    },
    regular: {
      padding: "4px 6px",
      display: "flex",
      alignItems: "center",
      borderRadius: 20,
      width: 800,
    },

    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

type SearchBarSize = "mini" | "regular";
export interface SearchBarProps {
  size?: SearchBarSize;
  searchStore: SearchStore;
}

const classes = useStyles();
const [expandSearch, toggleExpandSearch] = useState<boolean>(false);
const [refSearch, toggleRefSearch] = useState<boolean>(false);
export const SearchBar: React.FC<SearchBarProps> = observer(
  ({ size = "regular", searchStore }) => (
    <div>
      {size === "mini" && (
        <div>
          {expandSearch ? (
            <div
              className="searchBarMini"
              onClick={() => {
                toggleExpandSearch(true);
              }}
            >
              <SearchOutlinedIcon />
            </div>
          ) : (
            <div className="searchBarExpanded">
              <Paper component="form" className={classes.small}>
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                ></IconButton>
                <TextField
                  className={classes.input}
                  placeholder="Search..."
                  value={searchStore.query}
                  onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                    searchStore.query.input = e.target.value;
                  })}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                      searchStore.getQueryResult();
                    }
                  }}
                />
              </Paper>
            </div>
          )}
        </div>
      )}

      {size === "regular" && (
        <div>
          <Paper component="form" className={classes.regular}>
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            ></IconButton>
            <TextField
              className={classes.input}
              placeholder="Search..."
              value={searchStore.query}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                searchStore.query.input = e.target.value;
              })}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  searchStore.getQueryResult();
                }
              }}
            />
          </Paper>

          {/* Refining the search */}
          {refSearch ? (
            <Button color="primary">Refine my search</Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  toggleRefSearch(!refSearch);
                }}
              >
                Simplify my search
              </Button>
              <p>I want to refine my search</p>
            </>
          )}
        </div>
      )}
    </div>
  )
);

export default SearchBar;
