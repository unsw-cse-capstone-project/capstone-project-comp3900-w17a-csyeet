import React from "react";
import { useGoogleLogin } from "react-google-login";

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
    token,
  }: {
    email: string;
    name: string;
    token: string;
  }) => void;
  onError?: (error: string) => void;
  label: string;
  onClick?: () => void;
}) => {
  const onSuccess = (res: any) => {
    console.log(res)
      onSuccessLogin({
        email: res.profileObj.email,
        name: res.profileObj.name,
        token: res.tokenId,
      });
  };

  const onFailure = (res: any) => {
    onError && onError(res.error);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
  });

  const onButtonClick = () => {
    onClick && onClick();
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
