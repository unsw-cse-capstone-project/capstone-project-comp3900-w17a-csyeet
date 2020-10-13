import React from "react";
import logo from "./logo.png";

type LogoSize = "small" | "large";
export interface LogoProps {
  size: LogoSize;
  onClick?: () => {};
}

const Logo = ({ size = "large", onClick }: LogoProps) => {
  return (
    <div>
      {size === "small" && (
        <div onClick={onClick}>
          <img
            style={{
              height: "100px",
              width: "210px",
            }}
            src={logo}
            alt="Adobe Logo"
          />
        </div>
      )}

      {size === "large" && (
        <img
          style={{
            height: "250px",
            width: "500px",
          }}
          src={logo}
          alt="Adobe Logo"
        />
      )}
    </div>
  );
};

export default Logo;
