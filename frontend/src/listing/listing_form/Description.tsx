import React from "react";
import { observer } from "mobx-react";
import { Typography, TextField } from "@material-ui/core";
import { ListingStore } from "../ListingStore";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { Features } from "./Features";

export const Description: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const onChange = (value: string, field: string) => {
      (store as any)[field] = value;
    };

    const [desc, setDesc] = React.useState(store.desc);
    return (
      <div>
        <div>
          <Typography variant="h5">
            An eye-catching title for your property
          </Typography>
          <TextFieldWrapper
            label={"Property Listing Title"}
            field={"descTitle"}
            onChange={onChange}
          />
        </div>
        <div>
          <Typography
            variant="subtitle1"
            style={{ marginBottom: "5px", marginTop: "35px" }}
          >
            A short description
          </Typography>
          <TextField
            fullWidth
            label="Short Description"
            variant="outlined"
            multiline
            rows="10"
            value={desc}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDesc(e.target.value);
              onChange(e.target.value, "desc");
            }}
          />
        </div>
        <Typography
          variant="subtitle1"
          style={{ marginBottom: "5px", marginTop: "35px" }}
        >
          Tell us some features of your property
        </Typography>
        <Features store={store} />
      </div>
    );
  }
);
