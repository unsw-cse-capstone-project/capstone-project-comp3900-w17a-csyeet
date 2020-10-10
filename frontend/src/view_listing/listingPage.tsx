import * as React from "react";
import { listingPageStyle } from "./listingPage.css";
import { Button, Grid } from "@material-ui/core";
import { ArrowBackIos} from "@material-ui/icons";
import { Address } from "../auction/AuctionPage";

// what else does a property need
export type Property = {
    description: string;
    tagLine: string;
    address: Address;
    auctionDate: Date;
    // review arg types and what other args
};

export const ListingPage = ({
    property,
    images,
    // add more args
}: {
    property: Property;
    images: string; // unsure about this
}) => {
    //const {description, tagLine, address, auctionDate}  = property;
    const classes = listingPageStyle();
    return (
        <div className={classes.page}>
            <Button className={classes.backButton}>
                <ArrowBackIos />
                Back to Search
            </Button>
            <Grid item xs={4}>
                <div
                    className={classes.mainImage}
                    style={{ backgroundImage: `url(${images})`}}
                />
            </Grid>
        </div>
    );
};
