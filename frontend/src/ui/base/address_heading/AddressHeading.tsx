import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, Typography } from "@material-ui/core";

export const AddressHeadingStyle = makeStyles((theme: Theme) =>
  createStyles({
    streetAddress: {
      textTransform: "capitalize",
      marginTop: theme.spacing(3),
    },
    secondaryAddress: {
      textTransform: "capitalize",
      color: theme.palette.grey[500],
      paddingBottom: theme.spacing(2),
    },
  })
);

export const AddressHeading = ({
  street,
  suburb,
  state,
  postcode,
}: {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
}) => {
  const classes = AddressHeadingStyle();
  return (
    <div>
      <Typography variant="h2" className={classes.streetAddress}>
        {street}
      </Typography>
      <Typography variant="h4" className={classes.secondaryAddress}>
        {suburb}
        {", "}
        <span style={{ textTransform: "uppercase" }}>{state}</span> {postcode}
      </Typography>
    </div>
  );
};
