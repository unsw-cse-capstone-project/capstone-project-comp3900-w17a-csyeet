import React from "react";
import logo from "./logo.png";

type LogoSize = "small" | "large";
export interface LogoProps {
  size: LogoSize;
  onClick?: () => {};
}

const Logo: React.FC<LogoProps> = ({ size = "large", onClick }) => {
  return (
    <div>
      {size == "small" && (
        <div onClick={onClick}>
          <img
            style={{
              height: "60px",
              width: "120px",
            }}
            src={logo}
          />
        </div>
      )}

      {size == "large" && (
        <img
          style={{
            height: "250px",
            width: "500px",
          }}
          src={logo}
        />
      )}
    </div>
  );
};

export default Logo;
