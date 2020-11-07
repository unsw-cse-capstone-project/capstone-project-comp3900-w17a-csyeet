import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, Hidden, ListItemIcon, ListItemText } from "@material-ui/core";
import { useStore } from "../../../../AuthContext";
import { AccountCircle, ExitToApp, House, Message } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export const UserMenu = () => {
  const userStore = useStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!userStore || !userStore.user) {
    return null;
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ borderRadius: "10000px" }}
        startIcon={
          <Avatar
            src={userStore.avatar}
            style={{ width: "30px", height: "30px" }}
          />
        }
      >
        {userStore.user.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Hidden smUp>
          <MenuItem
            onClick={() => {
              history.push("/add");
              handleClose();
            }}
          >
            <ListItemIcon>
              <House fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Add Listing" />
          </MenuItem>
        </Hidden>
        <MenuItem
          onClick={() => {
            history.push("/messages");
            handleClose();
          }}
        >
          <ListItemIcon>
            <Message fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/profile");
            handleClose();
          }}
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            userStore.signOut();
            history.push("/");
          }}
        >
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};
