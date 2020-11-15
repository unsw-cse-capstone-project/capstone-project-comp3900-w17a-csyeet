import React from "react";
import { Details } from "./Details";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { ProfileStore } from "../ProfilePresenter";


/**
 * Page component used by the profile page to display a user's details
 * @param store
 * @param onUpdateUserDetails
 * @param onChangePassword
 */
export const DetailsPage: React.FC<{
  store: ProfileStore;
  onUpdateUserDetails: () => void;
  onChangePassword: (onPasswordIncorrect: () => void) => void;
}> = ({ store, onUpdateUserDetails, onChangePassword }) => {
  const [openSnack, setOpen] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string | null>(null);
  const snackContent = (status: string) => {
    switch (status) {
      case "success":
        return <MuiAlert severity="success">Successfully updated!</MuiAlert>;
      case "updating":
        return <MuiAlert severity="info">Updating your details...</MuiAlert>;
      case "incorrect password":
        return (
          <MuiAlert severity="error">
            Incorrect password, your password was not changed
          </MuiAlert>
        );
      default:
        return <></>;
    }
  };

  if (store.loadingState === "success") {
    setStatus("success");
    setOpen(true);
  } else if (store.loadingState === "updating") {
    setStatus("updating");
    setOpen(true);
  }

  const onIncorrectPassword = () => {
    setStatus("incorrect password");
    setOpen(true);
  };

  return (
    <div>
      <Details
        store={store}
        onUpdateUserDetails={onUpdateUserDetails}
        onChangePassword={() => onChangePassword(onIncorrectPassword)}
      />
      {status !== null && (
        <Snackbar
          open={openSnack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={1500}
          onClose={() => {
            setOpen(false);
            setStatus(null);
          }}
        >
          {snackContent(status)}
        </Snackbar>
      )}
    </div>
  );
};
