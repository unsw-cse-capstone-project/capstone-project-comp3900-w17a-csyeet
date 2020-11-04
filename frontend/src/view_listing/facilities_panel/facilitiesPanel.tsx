import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {
  Tab,
  Tabs,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Landmark } from "../../ui/util/types/listing";
import classNames from "classnames";

export const FacilitiesPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      width: "100%",
    },
    lastRow: {
      borderBottom: "none",
    },
    firstCell: {
      fontWeight: "bold",
    },
  })
);

export const FacilitiesPanel = ({
  facilities,
  isPreview = false,
}: {
  facilities: Landmark[];
  isPreview?: boolean;
}) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [value, setValue] = React.useState(0);
  const classes = FacilitiesPanelStyles();

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (panel: string) => (
    _event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion
      square
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        style={{ paddingLeft: "0px" }}
      >
        <Typography variant="h5">Nearby Facilities</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          display: "flex",
          flexDirection: "column",
          borderTop: "solid 1px #eee",
        }}
      >
        {isPreview ? (
          <Typography variant="body1">
            Nearby landmarks will be generated after the listing is created
          </Typography>
        ) : (
          <div>
            <Tabs
              value={value}
              indicatorColor="secondary"
              onChange={handleTabChange}
              variant="scrollable"
              aria-label="disabled tabs example"
              className={classes.tabs}
            >
              {["primarySchool", "secondarySchool", "park", "trainStation"].map(
                (type, i) => (
                  <Tab
                    key={i}
                    label={type
                      .replace(/([A-Z]+)/g, " $1")
                      .replace(/([A-Z][a-z])/g, " $1")}
                  />
                )
              )}
            </Tabs>
            {["primarySchool", "secondarySchool", "park", "trainStation"].map(
              (type, i) => (
                <div hidden={value !== i} key={i}>
                  <Table>
                    <TableBody>
                      {facilities
                        .filter((f) => f.type === type)
                        .map((f, k) => (
                          <TableRow key={k}>
                            <TableCell
                              component="th"
                              className={classNames(
                                {
                                  [classes["lastRow"]]:
                                    facilities.filter((f) => f.type === type)
                                      .length ===
                                    k + 1,
                                },
                                classes.firstCell
                              )}
                            >
                              {f.name}
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classNames({
                                [classes["lastRow"]]:
                                  facilities.filter((f) => f.type === type)
                                    .length ===
                                  k + 1,
                              })}
                            >
                              {f.distance}km
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )
            )}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
