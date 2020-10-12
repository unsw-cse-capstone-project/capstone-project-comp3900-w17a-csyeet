import React from "react";
import logo from "./logo.png";
import { LogoStyles } from "./Logo.css"; // (Jenn) TODO: Not sure why css isn't working

type LogoSize = "small" | "large";
export interface LogoProps {
  size: LogoSize;
  onClick?: () => {};
}

const Logo: React.FC<LogoProps> = ({ size = "large", onClick }) => {
  const classes = LogoStyles();
  return (
    <div>
      {size == "small" && (
        <div onClick={onClick}>
          <img className={classes.small} src={logo} />
        </div>
      )}

      {size == "large" && <img className={classes.large} src={logo} />}
    </div>
  );
};

export default Logo;
