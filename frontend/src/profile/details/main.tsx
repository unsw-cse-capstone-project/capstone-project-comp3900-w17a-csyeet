import * as React from "react";
import { useStore } from "../../AuthContext";
import { DetailStore, DetailPresenter } from "./DetailPresenter";
import { action, runInAction } from "mobx";
import { Details } from "./Details";
import { FormHelperText, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export function MyDetailsPage() {
  const userStore = useStore();
  if (!userStore) throw Error("User Store cannot be null");

  const store = new DetailStore();
  const fillDetailStore = action(() => {
    if (!userStore.user) throw Error("User does not exit");
    const {
      id,
      name,
      phone_number,
      street,
      suburb,
      postcode,
      state,
      country,
    } = userStore.user;
    store.id = id;
    store.name = name;
    store.phone_number = phone_number;
    store.street = street;
    store.suburb = suburb;
    store.postcode = postcode;
    store.state = state;
    store.country = country;
  });
  const presenter = new DetailPresenter();
  const onUpdateSuccess = () => {
    setStatus("success");
    if (!userStore) throw Error("User Store cannot be null");
    if (!userStore.user) throw Error("User does not exit");
    const { id, email } = userStore.user;
    runInAction(() => {
      userStore.user = {
        id: id,
        email: email,
        name: store.name,
        phone_number: store.phone_number,
        street: store.street,
        suburb: store.suburb,
        postcode: store.postcode,
        state: store.state,
        country: store.country,
      };
    });
  };

  const snackContent = (status: string | null) => {
    switch (status) {
      case "success":
        return <MuiAlert severity="success">Successfully updated</MuiAlert>;
      case "updating":
        return <MuiAlert severity="info">Updating...</MuiAlert>;
      case "error":
        return (
          <MuiAlert severity="error">
            There was an error updaing your details
          </MuiAlert>
        );
      default:
        return <></>;
    }
  };

  const onError = () => setStatus("error");
  const onSuccess = () => setStatus("success");
  const [status, setStatus] = React.useState<string | null>(null);
  const [openSnack, setOpen] = React.useState<boolean>(false);
  const [passIncorrect, setPassIncorrect] = React.useState<boolean>(false);
  fillDetailStore();
  return (
    <>
      {passIncorrect && (
        <FormHelperText style={{ color: "red", margin: "5px" }}>
          Password incorrect, could not change password
        </FormHelperText>
      )}
      <Details
        store={store}
        onUpdate={() => {
          setPassIncorrect(false);
          setStatus("updating");
          presenter.updateUserDetails(store, onUpdateSuccess, () =>
            setStatus("error")
          );
        }}
        onChangePassword={() =>
          presenter.updateUserPassword(
            store,
            () => setPassIncorrect(true),
            onError,
            onSuccess
          )
        }
      />
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
    </>
  );
}
