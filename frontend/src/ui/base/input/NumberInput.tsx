import * as React from "react";
import NumberFormat from "react-number-format";
import { runInAction } from "mobx";
type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

type InputProps = {
  store: any;
  format: any;
  subname?: string;
  name: any;
};

/**
 * NumberInput wrapper
 * @param props
 */
const NumberInput = (props: NumberFormatCustomProps & InputProps) => {
  const { inputRef, store, name, format, subname, ...other } = props;
  const [value, setValue] = React.useState<string>(
    subname ? store[subname][name] : store[name]
  );
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      value={value}
      format={format}
      onValueChange={(values) => {
        setValue(values.value);
        runInAction(() =>
          subname
            ? (store[subname][name] =
              typeof store[subname][name] === "number"
                ? parseInt(values.value)
                : values.value)
            : (store[name] =
              typeof store[name] === "number"
                ? parseInt(values.value)
                : values.value)
        );
      }}
      decimalScale={0}
      isNumericString
      allowNegative={false}
    />
  );
};

export const createNumberInput = (customProps: InputProps) => {
  // eslint-disable-next-line react/display-name
  return (props: NumberFormatCustomProps) => (
    <NumberInput {...props} {...customProps} />
  );
};
