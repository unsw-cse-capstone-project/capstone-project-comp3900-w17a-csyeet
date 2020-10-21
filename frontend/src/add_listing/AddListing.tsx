import React from 'react';
import { observer } from "mobx-react";
import { Paper, Tabs, Tab, Typography } from "@material-ui/core";

import { ListingStore } from "./ListingStore";
import { Details } from "./step1/Details";
import { Description } from "./step3/Description";

export const AddListing: React.FC<{ store: ListingStore }> = observer(({ store }) => {

    const [tab, setTab] = React.useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    const getContent = (tab: number) => {
        switch (tab) {
            case 0:
                return <Details store={store} />;
            case 1:
                return <Typography>Step 2 - Images</Typography>;
            case 2:
                return <Description store={store} />;
            case 3:
                return <Typography> Step 4 - Auction Details</Typography>;
            default:
                return "404 You've fallen into outer space!";
        }
    };

    return (
        <>
            <Paper style={{ flexGrow: 1 }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Details" />
                    <Tab label="Images" />
                    <Tab label="Desription" />
                    <Tab label="Auction Details" />
                    <Tab label="Payment" />
                </Tabs>
            </Paper >
            { getContent(tab)}
        </>
    );

});