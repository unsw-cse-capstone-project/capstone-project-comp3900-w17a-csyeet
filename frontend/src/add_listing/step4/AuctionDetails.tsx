import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/Info';
import { ListingStore } from "../ListingStore";
import { Dialog, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@material-ui/core";
import { createPriceInput } from "../../ui/base/input/PriceFormat";
import { AuctionStyles } from "./AuctionDetails.css";

export const AuctionDetails: React.FC<{ store: ListingStore }> = observer(({ store }) => {
	const [startDate, setStartDate] = React.useState<Date | null>(
		new Date("2020-08-18T21:11:55")
	);
	const [endDate, setEndDate] = React.useState<Date | null>(
		new Date("2020-09-18T21:11:55")
	);

	const handleStartDateChange = action((date: Date | null) => {
		setStartDate(date);
		(store as any)["auctionStart"] = date;
	});
	const handleEndDateChange = action((date: Date | null) => {
		setEndDate(date);
		(store as any)["auctionEnd"] = date;
	});
	const handlePriceChange = action((e: React.ChangeEvent<HTMLInputElement>) => {
		(store as any)["reservePrice"] = e.target.value;
	})

	const [info, setInfo] = React.useState<boolean>(false);
	const InputComponent = createPriceInput({
		store,
		name: "Reserve Price",
	});
	const classes = AuctionStyles();
	return (
		<div className={classes.container}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Paper className={classes.cardContainer}>
					<div className={classes.cardLabel}>
						<CalendarTodayIcon style={{ marginRight: "10px" }} />
						<Typography>Auction Start</Typography>
					</div>
					<div className={classes.cardContent}>
						<KeyboardDatePicker
							style={{ marginRight: "10px" }}
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Start Date"
							value={startDate}
							onChange={handleStartDateChange}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
						<KeyboardTimePicker
							margin="normal"
							id="time-picker"
							label="Start Time"
							value={startDate}
							onChange={handleStartDateChange}
							KeyboardButtonProps={{
								"aria-label": "change time"
							}}
						/>
					</div>
				</Paper>
				<Paper className={classes.cardContainer}>
					<div className={classes.cardLabel}>
						<CalendarTodayIcon style={{ marginRight: "10px" }} />
						<Typography>Auction End</Typography>
					</div>
					<div className={classes.cardContent}>
						<KeyboardDatePicker
							style={{ marginRight: "10px" }}
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="End Date"
							value={endDate}
							onChange={handleEndDateChange}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
						<KeyboardTimePicker
							margin="normal"
							id="time-picker"
							label="End Time"
							value={endDate}
							onChange={handleEndDateChange}
							KeyboardButtonProps={{
								"aria-label": "change time"
							}}
						/>
					</div>
				</Paper>
			</MuiPickersUtilsProvider>
			<div className={classes.reserveLabel}>
				<Typography className={classes.reserveLabelText}>
					Reserve Price
			</Typography>
				<IconButton onMouseDown={() => setInfo(true)} aria-label="more info">
					<InfoIcon />
				</IconButton>
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
			<Dialog onClose={() => setInfo(false)} aria-labelledby="dialog-title" open={info}>
				<DialogTitle id="dialog-title">Reserve Price</DialogTitle>
				<div style={{ padding: "10px" }}>
					<Typography>
						Reserve price is the minimum before the property can be sold. If the
						highest bidding price does not reach the reservation price, the
						property is passed in and you may have to negotiate with sellers.
					</Typography>
				</div>
			</Dialog>
		</div >
	);
});
