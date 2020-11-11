import React from "react";
import { action } from "mobx";
// import { use Store } from "../../AuthContext";
import { DetailStore, DetailPresenter } from "./DetailPresenter";
import { Details } from "./Details";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export const DetailsPage = () => {
  const userStore = useStore();
  if (!userStore) throw Error("User Store cannot be null");
  const fillDetailStore = action(() => {
//     store.id = 5;
//     store.name = "Jenn";
//     store.email = "jenn@example.com";
//     store.phone_number = "0000000000";
//     store.street = "23 Holland Avenue";
//     store.suburb = "CrossVill";
//     store.postcode = "1234";
//     store.state = "NSW";
//     store.country = "Australia";
    if (!userStore.user) throw Error("User does not exit");
    const {
      id,
      name,
    email,
      phone_number,
      street,
      suburb,
      postcode,
      state,
      country,
    } = userStore.user;
    store.id = id as number;
    store.name = name as string;
    store.phone_number = phone_number;
    store.street = street;
    store.suburb = suburb;
    store.postcode = postcode;
    store.state = state;
    store.country = country;
  });

  const snackContent = (status: string) => {
    switch (status) {
      case "success":
        return <MuiAlert severity="success">Successfully updated!</MuiAlert>;
      case "updating":
        return <MuiAlert severity="info">Updating your details...</MuiAlert>;
      case "error":
        return (
          <MuiAlert severity="error">
            There was an error updating your details
          </MuiAlert>
        );
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

  const onError = () => {
    setStatus("error");
    setOpen(true);
  };

  const onSuccess = () => {
    setStatus("success");
    setOpen(true);
  };

  const onUpdate = () => {
    setStatus("updating");
    setOpen(true);
  };

  const onIncorrectPassword = () => {
    setStatus("incorrect password");
    setOpen(true);
  };

  const store = new DetailStore();
  const presenter = new DetailPresenter();
  const [openSnack, setOpen] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string | null>(null);
  fillDetailStore();
  console.log(store);
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Details
        store={store}
        onUpdate={(store: DetailStore) => {
          onUpdate();
          presenter.updateUserDetails(store.id, store, onError, onSuccess);
        }}
        onChangePassword={(store: DetailStore) => {
          onUpdate();
          presenter.updateUserPassword(
            store.id,
            store,
            onError,
            onSuccess,
            onIncorrectPassword
          );
        }}
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
