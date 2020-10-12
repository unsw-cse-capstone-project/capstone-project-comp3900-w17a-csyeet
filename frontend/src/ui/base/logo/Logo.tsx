import React from "react";
import logo from "../../../assets/abode-logo.png";
import "./Logo.css";

type LogoSize = "small" | "large";

export interface LogoProps {
  size: LogoSize;
  onClick?: () => {};
}

const Logo: React.FC<LogoProps> = ({ size = "large", onClick }) => (
  <div>
    {size == "small" && (
      <div onClick={onClick}>
        <img className="logoSmall" src={logo} />
      </div>
    )}

    {size == "large" && <img className="logoLarge" src={logo} />}
  </div>
);

export default Logo;
