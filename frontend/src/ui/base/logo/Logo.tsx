import React from "react";
import logo from "../../../images/logo.png";

type LogoSize = "small" | "large";
export interface LogoProps {
  size: LogoSize;
  onClick?: () => void;
}

const Logo = ({ size = "large", onClick }: LogoProps) => {
  return (
    <div>
      {size === "small" && (
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          <img
            style={{
              height: "50px",
              // width: "210px",
              padding: "10px 20px"
            }}
            src={logo}
            alt="Adobe Logo"
          />
        </div>
      )}

      {size === "large" && (
        <img
          style={{
            height: "auto",
            width: "100%",
          }}
          src={logo}
          alt="Adobe Logo"
        />
      )}
    </div>
  );
};

export default Logo;
