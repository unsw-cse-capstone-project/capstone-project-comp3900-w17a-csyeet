import * as React from "react";
import { listingPageStyle } from "./listingPage.css";
import { Button, Grid, Typography, Divider } from "@material-ui/core";
import { ArrowBackIos} from "@material-ui/icons";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Listing } from "../ui/util/types/listing";
import { ListingFeatureIcon } from "../ui/base/listing_result_card/ListingResultCard";
import { DriveEta, KingBed, Bathtub } from "@material-ui/icons";
import { AuctionTag } from "../ui/base/auction_tag/AuctionTag";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from "react-slick";

export const ListingPage = (props: {listing: Listing}) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const {
        street,
        suburb,
        postcode,
        state,
        auction_start,
        auction_end,
        num_bathrooms,
        num_bedrooms,
        num_car_spaces,
        type,
        title,
        description,
      } = props.listing;
    
    const classes = listingPageStyle();
    return (
        <div className={classes.page}>
            {/* do i need this */}
            <Button className={classes.backButton}>
                <ArrowBackIos />
                Back to Search
            </Button>
            {/* image */}
            <div className={classes.sliderContainer}>
                <Slider {...settings}>
                {props.listing.images.map((image, i) => (
                    <img className={classes.imageContainer} src={image} key={i} />
                ))}
                </Slider>
            </div>
            {/* left column */}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography 
                        variant="h4" 
                        className = {classes.street}
                        style={{ textTransform: "capitalize" }}
                    >
                        {street}
                    </Typography>
                    <Typography variant="h5" style={{ textTransform: "capitalize" }}>
                        {suburb}
                        {", "}
                        <span style={{ textTransform: "uppercase" }}>{state}</span> {postcode}
                    </Typography>
                    <Typography 
                        variant="h6"
                        className = {classes.title}    
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="body2"
                        className = {classes.description}
                    >
                        
                        {description}
                    </Typography>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h5">Features</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Go through each feature in the db and if yes then display it. Bruh :)
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography variant="h5">Nearby Facilities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            TODO: Implement API
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        >
                        <Typography variant="h5">{suburb} Suburb Profile</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            TODO: Implement API
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.detailBar}>
                        <ListingFeatureIcon value={num_bedrooms} Icon={KingBed} />
                        <ListingFeatureIcon value={num_bathrooms} Icon={Bathtub} />
                        <ListingFeatureIcon value={num_car_spaces} Icon={DriveEta} />
                    </div>
                    <Typography variant="h5" className={classes.header}>Auction Details</Typography>
                    <Divider className={classes.divider} />

                     {/* auction info*/}
                    {new Date().getTime() < auction_start.getTime() ? ([
                        <Typography variant="body2">
                            Start Time: {auction_start.toLocaleString()}
                        </Typography>,
                        <Typography variant="body2">
                            End Time: {auction_end.toLocaleString()}
                        </Typography>,
                        <AuctionTag start={auction_start} end={auction_end} />,
                        <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginTop: "15px" }}
                        >
                            Register to Bid
                        </Button>
                    ]) : ([
                        <Typography variant="body2">
                            End Time: {auction_end.toLocaleString()}
                        </Typography>,
                        <AuctionTag start={auction_start} end={auction_end} />,
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{ marginTop: "15px" }}
                        >
                            View Auction
                        </Button>
                    ])}

                    <Typography variant="h5" className={classes.header}>Map: Placeholder</Typography>
                    <Divider className={classes.divider} />
                    <img src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
                        style = {{width: "100%"}}
                    ></img>

                    <Typography variant="h5" className={classes.header}>Seller</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="body2">
                        Include seller profile picture, name and button to message.
                        Clicking the name should display a pop-up window of the seller's profile.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};
