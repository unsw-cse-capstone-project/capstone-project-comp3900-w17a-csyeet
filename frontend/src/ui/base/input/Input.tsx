import React from "react";
import TextField from "@material-ui/core/TextField";
import "./Input.css";

export interface InputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input: React.FC<InputProps> = ({ label, value, onChange }) => (
  <div className="inputContainer">
    <TextField size="small" label={label} value={value} onChange={onChange} />
  </div>
);

export default Input;
