import React from "react";
import { action } from "mobx";
import EditIcon from "@material-ui/icons/Edit";
import { formatAddress } from "../../ui/util/helper";
import { observer } from "mobx-react";
import {
  Button,
  Card,
  Fab,
  CardHeader,
  CardContent,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Divider,
  List,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import NumberFormat from "react-number-format";
import HomeIcon from "@material-ui/icons/Home";
import { ModalWrapper } from "../../ui/base/modal_wrapper/ModalWrapper";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import {
  AddressForm,
  AddressDetails,
} from "../../ui/base/address_form/AddressForm";
import { DetailStyles } from "./Detail.css";
import { ProfileStore } from "../ProfilePresenter";
import { PasswordResetForm } from "./PasswordResetForm";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";

export const Details: React.FC<{
  store: ProfileStore;
  onUpdateUserDetails: () => void;
  onChangePassword: () => void;
}> = observer(({ store, onUpdateUserDetails, onChangePassword }) => {
  const addressData: AddressDetails = {
    street: "",
    suburb: "",
    postcode: "",
    state: "NSW",
    country: "Australia",
  };
  const userAddress = {
    street: store.street,
    suburb: store.suburb,
    state: store.state,
    postcode: store.postcode,
  };

  const onChange = action((value: string, field: string) => {
    (store as any)[field] = value;
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [editAddress, setEditAddress] = React.useState<boolean>(false);
  const { streetAddress, remainingAddress } = formatAddress(userAddress);
  const address = streetAddress + " " + remainingAddress;

  return (
    <>
      <Card>
        <CardHeader
          title="User Profile"
          subheader={"Edit or update your personal information"}
        ></CardHeader>

        <CardContent>
          <List>
            <Divider light />
            <ListItem style={{ position: "relative" }}>
              {edit ? (
                <>
                  <Button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "100px",
                    }}
                    color="default"
                    onClick={() => setEdit(false)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={store.name === "" || store.phone_number === ""}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={() => onUpdateUserDetails()}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Fab
                  size={"small"}
                  color={"primary"}
                  onClick={() => setEdit(true)}
                  disabled={editAddress}
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <EditIcon style={{ color: "#FFF" }} fontSize="small" />
                </Fab>
              )}
              <ListItemAvatar>
                <PersonIcon style={{ color: "#838383" }} />
              </ListItemAvatar>
              {edit ? (
                <TextFieldWrapper
                  value={store.name}
                  error={store.name === ""}
                  field={"name"}
                  label={"Name"}
                  onChange={onChange}
                />
              ) : (
                <ListItemText primary="Name" secondary={store.name} />
              )}
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <EmailIcon style={{ color: "#838383" }} />
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={store.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <PhoneIcon style={{ color: "#838383" }} />
              </ListItemAvatar>
              {edit ? (
                <TextFieldWrapper
                  value={store.phone_number}
                  error={store.phone_number === ""}
                  field={"phone_number"}
                  label={"Phone Number"}
                  onChange={onChange}
                />
              ) : (
                <ListItemText
                  primary="Phone Number"
                  secondary={store.phone_number}
                />
              )}
            </ListItem>
            <Divider light />
            <ListItem style={{ position: "relative" }}>
              {editAddress ? (
                <>
                  <Button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "100px",
                    }}
                    color="default"
                    onClick={() => setEditAddress(false)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    disabled={
                      store.street === "" ||
                      store.suburb === "" ||
                      store.postcode === "" ||
                      store.state === "" ||
                      store.country === ""
                    }
                    color="primary"
                    onClick={() => onUpdateUserDetails()}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Fab
                  onClick={() => setEditAddress(true)}
                  disabled={edit}
                  color={"primary"}
                  size={"small"}
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <EditIcon style={{ color: "#FFF" }} fontSize={"small"} />
                </Fab>
              )}
              <ListItemAvatar>
                <HomeIcon style={{ color: "#838383" }} />
              </ListItemAvatar>
              {editAddress ? (
                <AddressForm
                  addressData={addressData}
                  onChange={onChange}
                  style={{ marginTop: "40px" }}
                />
              ) : (
                <ListItemText primary="Address" secondary={address} />
              )}
            </ListItem>
            <Divider />

            <ListItem button onClick={() => setOpen(true)}>
              <ListItemAvatar>
                <VpnKeyIcon style={{ color: "#838383" }} />
              </ListItemAvatar>
              <ListItemText primary="Change Password" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <ModalWrapper open={open} onClose={() => setOpen(false)}>
        <PasswordResetForm store={store} onChangePassword={onChangePassword} />
      </ModalWrapper>
    </>
  );
});
