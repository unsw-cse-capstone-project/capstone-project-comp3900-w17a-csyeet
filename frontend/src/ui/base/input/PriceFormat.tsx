import * as React from "react";
import NumberFormat from "react-number-format";
type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

type InputProps = {
  value: string | number;
  onChange(value: string): void;
};

const PriceInput = (props: NumberFormatCustomProps & InputProps) => {
  const { inputRef, value, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      value={value}
      onValueChange={(values) => {
        onChange(values.value);
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
