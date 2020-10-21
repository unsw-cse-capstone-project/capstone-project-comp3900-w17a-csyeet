import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { ListingStore } from "../ListingStore";
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import NumberFormat from "react-number-format";

export const PaymentDetails: React.FC<{ store: ListingStore }> = observer(({ store }) => {
	const onChange = action((value: string, field: string) => {
		(store as any)[field] = value;
	})

	type NumberFormatCustomProps = {
		inputRef: (instance: NumberFormat | null) => void;
		name: string;
	};

	const BSBInput = observer((props: NumberFormatCustomProps) => {
		const { inputRef, ...other } = props;
		return (
			<NumberFormat
				{...other}
				format="### ###"
				mask="#"
				value={store.bsb}
				onValueChange={(values) => {
					onChange(values.value, "bsb");
				}}
			/>
		);
	});

	const AccNoInput = observer((props: NumberFormatCustomProps) => {
		const { inputRef, ...other } = props;
		return (
			<NumberFormat
				{...other}
				format="#### ####"
				mask="#"
				value={store.accNumber}
				onValueChange={(values) => {
					onChange(values.value, "accNumber");
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
			<FormControl
				fullWidth
				style={{ marginBottom: "10px" }}
				variant="outlined"
			>
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
			</FormControl>
			<FormControl
				fullWidth
				style={{ marginBottom: "10px" }}
				variant="outlined"
			>
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
			</FormControl>

		</>

	)

});