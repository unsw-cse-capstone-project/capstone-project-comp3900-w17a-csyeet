import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { BiddersList } from "../auction/bidders_list/BiddersList";
import { ListingPage } from "./listingPage";
import { Property } from "./listingPage";
import imageSlideshow from "../images/propertyMain.jpg";

export default {
  title: "view_listing/listingPage",
  component: BiddersList,
} as Meta;

const Template: Story<{
    // pass in property information through props
    // arguments to be passed into listing page
    property: Property;
}> = (props: {property: Property;}) => {
    
    return (
        <ListingPage
            // pass in arguments 
            property={props.property}
            images={imageSlideshow}
        />
    );
};

export const Overview = Template.bind({});