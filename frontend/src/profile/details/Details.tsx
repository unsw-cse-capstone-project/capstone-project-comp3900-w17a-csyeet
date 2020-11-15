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
import HomeIcon from "@material-ui/icons/Home";
import { ModalWrapper } from "../../ui/base/modal_wrapper/ModalWrapper";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import {
  AddressForm,
  AddressDetails,
} from "../../ui/base/address_form/AddressForm";
import { ProfileStore } from "../ProfilePresenter";
import { PasswordResetForm } from "./PasswordResetForm";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { DetailStyles } from "./Detail.css";

/**
 * Component used to display a user's details on their profile
 * Also allows users to update specific details like name, phone number
 * and personal address
 * @param store 
 * @param onUpdateUserDetails
 * @param onChangePasswod
 */
export const Details: React.FC<{
  store: ProfileStore;
  onUpdateUserDetails: () => void;
  onChangePassword: () => void;
}> = observer(({ store, onUpdateUserDetails, onChangePassword }) => {
  const classes = DetailStyles();
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
          subheader="Edit or update your personal information"
        />
        <CardContent>
          <List>
            <Divider light />
            <ListItem style={{ position: "relative" }}>
              {edit ? (
                <>
                  <Button
                    className={classes.cancelButton}
                    color="default"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      store.tmpName === "" ||
                      store.tmpPhoneNumber === "" ||
                      (store.tmpName === store.name &&
                        store.tmpPhoneNumber === store.phone_number)
                    }
                    className={classes.saveButton}
                    onClick={() => {
                      onUpdateUserDetails();
                      setEdit(false);
                    }}
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
                  className={classes.editButton}
                >
                  <EditIcon style={{ color: "#FFF" }} fontSize="small" />
                </Fab>
              )}
              <ListItemAvatar>
                <PersonIcon style={{ color: "#838383" }} />
              </ListItemAvatar>
              {edit ? (
                <TextFieldWrapper
                  value={store.tmpName}
                  error={store.tmpName === ""}
                  field={"tmpName"}
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
                  value={store.tmpPhoneNumber}
                  error={store.tmpPhoneNumber === ""}
                  field={"tmpPhoneNumber"}
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
                    className={classes.cancelButton}
                    color="default"
                    onClick={() => setEditAddress(false)}
                  >
                    Cancel
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
                    onClick={() => {
                      onUpdateUserDetails();
                      setEditAddress(false);
                    }}
                    className={classes.saveButton}
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
                  className={classes.editButton}
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
                  className={classes.addressFormStyle}
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
