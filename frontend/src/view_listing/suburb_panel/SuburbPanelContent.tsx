import * as React from "react";
import { SuburbPanelStore } from "./SuburbPanelPresenter";
import { observer } from "mobx-react";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { priceFormatter, toSentenceCase } from "../../ui/util/helper";
import ReactPlaceholder from "react-placeholder/lib/ReactPlaceholder";
import classNames from "classnames";
import { useTheme } from "@material-ui/core";
import {
  SuburbPanelContentStyle,
  TabPanelStyle,
} from "./SuburbPanelContent.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = TabPanelStyle();
  return (
    <div
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box p={3} className={classes.box}>
          {children}
        </Box>
      )}
    </div>
  );
}

/**
 * Component that populates the suburb statistics into a tabbed form
 */
export const SuburbPanelContent = observer(
  ({ store }: { store: SuburbPanelStore }) => {
    const classes = SuburbPanelContentStyle();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [value, setValue] = React.useState(0);

    if (!store.loadingState) {
      return null;
    }
    if (store.loadingState === "loading") {
      return (
        <ReactPlaceholder showLoadingAnimation={true} type="text" ready={false}>
          {null}
        </ReactPlaceholder>
      );
    }
    if (store.loadingState === "error") {
      return (
        <Typography variant="body1">
          Error when loading data, please refresh to try again.
        </Typography>
      );
    }

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    return (
      <div className={classes.root}>
        <Tabs
          orientation={matches ? "vertical" : "horizontal"}
          variant="scrollable"
          scrollButtons="on"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          {store.results.map((result, i) => (
            <Tab label={result.year} key={i} className={classes.tab} />
          ))}
        </Tabs>
        {store.results.map((result, i) => (
          <TabPanel value={value} index={i} key={i}>
            <Table>
              <TableBody>
                {Object.keys(result)
                  .filter((k) => k !== "year")
                  .map((k) => (
                    <TableRow key={k}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classNames({
                          [classes["lastRow"]]:
                            k === "numberOfAuctionWithdrawn",
                        })}
                      >
                        <b>{toSentenceCase(k)}</b>
                      </TableCell>
                      <TableCell
                        align="right"
                        className={classNames({
                          [classes["lastRow"]]:
                            k === "numberOfAuctionWithdrawn",
                        })}
                      >
                        {(result as any)[k]
                          ? k.match(/Price/)
                            ? priceFormatter.format((result as any)[k])
                            : (result as any)[k]
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabPanel>
        ))}
      </div>
    );
  }
);
