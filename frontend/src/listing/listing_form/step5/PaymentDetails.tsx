import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../../ui/base/textfield_wrapper/TextFieldWrapper";
import { ListingStore } from "../../ListingStore";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import NumberFormat from "react-number-format";

export const PaymentDetails: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const onChange = action((value: string, field: string) => {
      (store as any)[field] = value;
    });

    type NumberFormatCustomProps = {
      inputRef: (instance: NumberFormat | null) => void;
      name: string;
    };

    const [BSBError, setBSBError] = React.useState<boolean>(false);
    const BSBInput = observer((props: NumberFormatCustomProps) => {
      const { inputRef, ...other } = props;
      return (
        <NumberFormat
          {...other}
          format="### ###"
          mask="#"
          value={store.bsb}
          error={BSBError}
          onValueChange={(values) => {
            onChange(values.value, "bsb");
          }}
          onBlur={() => {
            store.bsb.length !== 6 ? setBSBError(true) : setBSBError(false);
          }}
        />
      );
    });

    const [AccNoError, setAccNoError] = React.useState<boolean>(false);
    const AccNoInput = observer((props: NumberFormatCustomProps) => {
      const { inputRef, ...other } = props;
      return (
        <NumberFormat
          {...other}
          format="#### ####"
          mask="#"
          value={store.accNumber}
          error={AccNoError}
          onValueChange={(values) => {
            onChange(values.value, "accNumber");
          }}
          onBlur={() => {
            store.accNumber.length !== 8
              ? setAccNoError(true)
              : setAccNoError(false);
          }}
        />
      );
    });
    return (
      <>
        <TextFieldWrapper
          field="accName"
          label="Account Name"
          onChange={onChange}
        />
        <FormControl fullWidth style={{ marginTop: "10px" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-card"
            style={{ background: "white" }}
          >
            BSB
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-card"
            labelWidth={110}
            inputComponent={BSBInput as any}
          />
          {BSBError && (
            <FormHelperText style={{ color: "red" }}>
              BSB must be in the format 123-456
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-card"
            style={{ background: "white" }}
          >
            Account Number
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-card"
            labelWidth={110}
            inputComponent={AccNoInput as any}
          />
          {AccNoError && (
            <FormHelperText style={{ color: "red" }}>
              Account Number must be in the format 1234-5678
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);
