import * as React from "react";
import NumberFormat from "react-number-format";
import { runInAction } from "mobx";
type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

type InputProps = {
  store: any;
  name: any;
};

const PriceInput = (props: NumberFormatCustomProps & InputProps) => {
  const { inputRef, store, name, ...other } = props;
  const [value, setValue] = React.useState<string>(store[name]);
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      value={value}
      onValueChange={(values) => {
        setValue(values.value);
        runInAction(() => (store[name] = values.value));
      }}
      thousandSeparator
      decimalScale={0}
      isNumericString
      allowNegative={false}
    />
  );
};

export const createPriceInput = (customProps: InputProps) => {
  // eslint-disable-next-line react/display-name
  return (props: NumberFormatCustomProps) => (
    <PriceInput {...props} {...customProps} />
  );
};
