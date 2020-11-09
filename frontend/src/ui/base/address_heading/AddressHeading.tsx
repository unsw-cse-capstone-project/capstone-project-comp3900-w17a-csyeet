import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, Typography } from "@material-ui/core";
import { formatAddress } from '../../util/helper';

export const AddressHeadingStyle = makeStyles((theme: Theme) =>
  createStyles({
    streetAddress: {
      marginTop: theme.spacing(3),
    },
    secondaryAddress: {
      paddingBottom: theme.spacing(2),
    },
  })
);

/**
 * Formats the address into a heading component
 */
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
  const {streetAddress, remainingAddress} = formatAddress({street, suburb, state, postcode});
  return (
    <div>
      <Typography variant="h2" className={classes.streetAddress}>
        {streetAddress}
      </Typography>
      <Typography variant="h4" color="textSecondary" className={classes.secondaryAddress}>
        {remainingAddress}
      </Typography>
    </div>
  );
};
