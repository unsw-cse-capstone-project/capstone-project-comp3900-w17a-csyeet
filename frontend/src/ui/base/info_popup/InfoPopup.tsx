import React from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton, Popover } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { infoStyles } from "./infoPopup.css";

export const InfoPopup: React.FC<{
  color?: string;
  data: string;
}> = ({ color = "#CDCDCD", data }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const classes = infoStyles();
  return (
    <div>
      <IconButton
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <InfoIcon style={{ color: color }} fontSize="small" />
      </IconButton>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{data}</Typography>
      </Popover>
    </div>
  );
};
