import * as React from "react";
import {
  Typography,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  Link,
} from "@material-ui/core";
import { sellerProfileStyle } from "./sellerProfile.css";
import { ListingActual } from "../../ui/util/types/listing";

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

  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Seller
      </Typography>
      <Divider className={classes.divider} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src="https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg"></Avatar>
        <Typography variant="body1" style={{ paddingLeft: "10px" }}>
          <Link onClick={handleClickOpen}>{name}</Link>
        </Typography>
      </div>
      {children}
      <ProfileDialog name={name} open={open} onClose={handleClose} />
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
      onclose={onClose}
      aria-labelledby="profile-dialog-title"
      open={open}
    >
      <DialogTitle id="profoile-dialog-title">{name}</DialogTitle>
    </Dialog>
  );
}
