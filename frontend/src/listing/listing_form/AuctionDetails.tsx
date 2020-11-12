import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  InputAdornment,
  Typography,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";
import { DateRange } from "@material-ui/pickers";
import { DateRangeWrapper } from "../../ui/base/input/DateRangeWrapper";
import { InfoPopup } from "../../ui/base/info_popup/InfoPopup";
import { ListingStore } from "../ListingPresenter";
import NumberFormat from "react-number-format";

const AuctionStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    reserveLabel: {
      marginTop: "15px",
      width: "150px",
      position: "relative",
    },
    infoContainer: {
      position: "absolute",
      width: "40%",
      top: "15px",
      right: "5px",
    },
    dateContainer: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const AuctionDetails: React.FC<{
  store: ListingStore;
}> = observer(({ store }) => {
  const { auction_start, auction_end, reserve_price } = store.auction;

  const PriceInput = (props: NumberFormatCustomProps) => {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={props.inputRef}
        onValueChange={(values) => {
          props.onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        decimalScale={0}
        isNumericString
        allowNegative={false}
      />
    );
  };
  const PriceInputField = () => {
    const [price, setPrice] = React.useState<string>(reserve_price);
    return (
      <TextField
        variant="outlined"
        value={price}
        label="Amount"
        onBlur={action(() => (store.auction.reserve_price = price))}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPrice(event.target.value)
        }
        InputProps={{
          inputComponent: PriceInput as any,
          startAdornment: <InputAdornment position="start"> $</InputAdornment>,
        }}
      />
    );
  };

  const handleDateChange = action((value: DateRange<Date>) => {
    const [start, end] = value;
    if (start && end) {
      start.setHours(9); // Auction default starts at 9AM
      end.setHours(17); // Auction by default ends at 5PM
    }
    store.auction.auction_start = start;
    store.auction.auction_end = end;
  });

  const reservePriceInfo =
    " Reserve price is the minimum before the property can be sold. If the highest bidding price does not reach the reservation price, the property is passed in and you may have to negotiate with sellers.";

  const classes = AuctionStyles();
  return (
    <div className={classes.container}>
      <Typography
        variant="subtitle1"
        style={{ marginBottom: "5px", marginTop: "35px" }}
      >
        Property Auction Period
      </Typography>
      {auction_start && auction_end ? (
        <>
          <Paper className={classes.dateContainer}>
            <Typography variant="body1" align="center">
              {auction_start.toDateString()} 9:00AM{" - "}
              {auction_end.toDateString()} 5:00PM
            </Typography>
          </Paper>
          <Button
            style={{ alignContent: "center", marginTop: "10px" }}
            variant="outlined"
            onClick={() => {
              const emptyDate: DateRange<Date> = [null, null];
              handleDateChange(emptyDate);
            }}
          >
            Change
          </Button>
        </>
      ) : (
        <DateRangeWrapper onDateChange={handleDateChange} />
      )}
      <div className={classes.reserveLabel}>
        <Typography
          variant="subtitle1"
          style={{ marginBottom: "10px", marginTop: "35px" }}
        >
          Reserve Price
        </Typography>
        <div className={classes.infoContainer}>
          <InfoPopup data={reservePriceInfo} color="#c2c2c2" size="small" />
        </div>
      </div>
      <PriceInputField />
    </div>
  );
});
