import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const AuctionStyles = makeStyles((theme: Theme) =>
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
			display: "flex",
			flexDirection: "row",
			marginTop: "15px"
		},
		reserveLabelText: {
			marginTop: "12px",
		}
	})
);
