import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { ListingStore } from "../ListingPresenter";
import { FormHelperText, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const PaymentDetails: React.FC<{
  store: ListingStore;
  edit: boolean;
}> = observer(({ store, edit }) => {
  const { confirmed_auction_start } = store.auction;
  const { account_name, bsb, account_number } = store.payment;
  const onChange = action((value: string, field: string) => {
    (store as any).payment[field] = value;
  });

  let readOnly = false;
  if (edit && confirmed_auction_start)
    readOnly =
      new Date().getTime() > (confirmed_auction_start as Date).getTime();
  const [BSBError, setBSBError] = React.useState<boolean>(false);
  const [AccNoError, setAccNoError] = React.useState<boolean>(false);
  return (
    <>
      {readOnly && (
        <Alert
          severity="info"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          You cannot edit your payment details during your auction
        </Alert>
      )}
      <Typography variant={"subtitle1"}>Payment Details</Typography>
      <TextFieldWrapper
        value={account_name}
        field="account_name"
        label="Account Name"
        onChange={onChange}
        readOnly={readOnly}
      />
      <TextFieldWrapper
        error={BSBError}
        value={bsb}
        field={"bsb"}
        label={"BSB"}
        onChange={onChange}
        readOnly={readOnly}
        onBlur={() => {
          store.payment.bsb.length !== 6
            ? setBSBError(true)
            : setBSBError(false);
        }}
      />
      {BSBError && (
        <FormHelperText style={{ color: "red" }}>
          BSB must be 6 numbers
        </FormHelperText>
      )}
      <TextFieldWrapper
        error={AccNoError}
        value={account_number}
        field={"account_number"}
        label={"Account Number"}
        onChange={onChange}
        readOnly={readOnly}
        onBlur={() => {
          store.payment.account_number.length !== 8
            ? setAccNoError(true)
            : setAccNoError(false);
        }}
      />
      {AccNoError && (
        <FormHelperText style={{ color: "red" }}>
          Account Number must be 8 numbers
        </FormHelperText>
      )}
    </>
  );
});
