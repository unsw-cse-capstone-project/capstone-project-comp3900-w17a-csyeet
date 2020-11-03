import * as React from "react";
import {
  Typography,
  Divider,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core";
import { sellerProfileStyle } from "./sellerProfile.css";
import { ListingActual } from "../../ui/util/types/listing";
import { getListingFromResult } from '../../ui/util/helper';

export const SellerProfile = ({
  id,
  name,
  email,
  children,
}: {
  id: number;
  name: string;
  email: string;
  children?: JSX.Element;
}) => {
  const classes = sellerProfileStyle();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [blurb, setBlurb] = React.useState(undefined);
  const [listings, setListings] = React.useState(undefined);

  React.useEffect(() => {
    getInfoFromProfile(id).then((r) => {
      setBlurb(r.blurb);
      setListings(r.listings);
    });
  }, []);

  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Seller
      </Typography>
      <Divider className={classes.divider} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src="https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg" />
        <Typography variant="body1" style={{ paddingLeft: "10px" }}>
          <Link onClick={handleClickOpen}>{name}</Link>
        </Typography>
      </div>
      {children}
      <ProfileDialog
        blurb={blurb}
        listings={listings}
        name={name}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

function ProfileDialog(props: {
  listings?: ListingActual[];
  name: String;
  blurb?: String;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="profile-dialog-title"
      open={props.open}
    >
      <DialogTitle id="profoile-dialog-title">Seller Profile</DialogTitle>
      <DialogContent dividers>
        <div style={{ display: "flex" }}>
          <Avatar src="https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>{props.name}</Typography>
            <Typography>{props.blurb}</Typography>
          </div>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <Typography>{props.name}'s Listings</Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const getInfoFromProfile = async (user_id: number) => {
  const response = await fetch(`/users/${user_id}/profile`);
  const result = await response.json();
  if ("detail" in result) {
    return undefined;
  }

  const obj = {
    blurb: String = result.blurb,
    listings: ListingActual[] = result.listings.map((result: any) => getListingFromResult(result)),
  }

  return obj;
};
