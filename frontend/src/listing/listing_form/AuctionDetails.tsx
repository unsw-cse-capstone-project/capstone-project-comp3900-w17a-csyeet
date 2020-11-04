import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { DateRange } from "@material-ui/pickers";
import { createPriceInput } from "../../ui/base/input/PriceFormat";
import { DateRangeWrapper } from "../../ui/base/date_range_picker/DateRangeWrapper";
import { InfoPopup } from "../../ui/base/info_popup/InfoPopup";
import { ListingStore } from "../ListingStore";

const AuctionStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    cardContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "10px",
      marginTop: "10px",
    },
    cardLabel: {
      display: "flex",
      flexDirection: "row",
      verticalAlign: "center",
      paddingTop: "10px",
      marginTop: "10px",
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
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
  })
);

export const AuctionDetails: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const handlePriceChange = action(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        (store as any)["reservePrice"] = parseInt(
          e.target.value.replace(/,/g, "")
        );
        console.log(store.reservePrice)
      }
    );

    const handleDateChange = action((value: DateRange<Date>) => {
      const [start, end] = value;
      store.auctionStart = start;
      store.auctionEnd = end;
    });

    const InputComponent = createPriceInput({
      store,
      name: "Reserve Price",
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
        <DateRangeWrapper onDateChange={handleDateChange} />
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
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            inputComponent={InputComponent as any}
            aria-describedby="helper-text"
            onChange={handlePriceChange}
          />
        </FormControl>
      </div>
    );
  }
);
