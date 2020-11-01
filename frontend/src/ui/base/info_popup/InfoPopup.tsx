import React from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton, Popover } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { infoStyles } from "./infoPopup.css";
import classNames from "classnames";

type SizeType = "small" | "default" | "large";
export const InfoPopup: React.FC<{
  className?: string;
  color?: string;
  data: string;
  size?: SizeType;
}> = ({ className, color = "#F2F2F2", size = "large", data }) => {
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
    <div className={classNames(className)}>
      <IconButton
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <InfoIcon style={{ color: color }} fontSize={size} />
      </IconButton>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{data}</Typography>
      </Popover>
    </div>
  );
};
