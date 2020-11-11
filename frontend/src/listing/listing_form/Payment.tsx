import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { ListingStore } from "../ListingPresenter";
import { FormHelperText, Typography } from "@material-ui/core";

export const PaymentDetails: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const { account_name, bsb, account_number } = store.payment;
    const onChange = action((value: string, field: string) => {
      (store as any).payment[field] = value;
    });

    const [BSBError, setBSBError] = React.useState<boolean>(false);
    const [AccNoError, setAccNoError] = React.useState<boolean>(false);
    return (
      <>
        <Typography variant={"subtitle1"}>Payment Details</Typography>
        <TextFieldWrapper
          value={account_name}
          field="account_name"
          label="Account Name"
          onChange={onChange}
        />
        <TextFieldWrapper
          error={BSBError}
          value={bsb}
          field={"bsb"}
          label={"BSB"}
          onChange={onChange}
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
  }
);
