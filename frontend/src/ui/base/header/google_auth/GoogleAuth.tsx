import React from "react";
import { useGoogleLogin } from "react-google-login";
import Google from "./google.svg";

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';
import Button from "@material-ui/core/Button";

export const clientId =
  "558318040284-qq4i7nn9ol3767cgg5neroen7mb65vkb.apps.googleusercontent.com";

export const GoogleLogin = ({
  onSuccessLogin,
  onError,
  label,
  onClick,
}: {
  onSuccessLogin: ({
    email,
    name,
    googleId,
  }: {
    email: string;
    name: string;
    googleId: string;
  }) => void;
  onError: (error: string) => void;
  label: string;
  onClick?: () => void;
}) => {
  const onSuccess = (res: any) => {
      onSuccessLogin({
        email: res.profileObj.email,
        name: res.profileObj.name,
        googleId: res.profileObj.googleId,
      });
    // refreshTokenSetup(res);
  };

  const onFailure = (res: any) => {
    onError(res.error);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    // accessType: "offline",
  });

  const onButtonClick = () => {
    onClick && onClick();
    console.log('signgin in')
    signIn();
  };

  return (
    <Button
      onClick={onButtonClick}
      variant="contained"
      color="default"
      fullWidth
      startIcon={
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
          }
          width="24px"
          height="24px"
          alt="google login"
        />
      }
    >
      {label}
    </Button>
  );
};
