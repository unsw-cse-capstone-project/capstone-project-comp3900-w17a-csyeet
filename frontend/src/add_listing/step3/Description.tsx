import React from "react";
import { observer } from "mobx-react";
import { Typography, TextField } from "@material-ui/core";
import { ListingStore } from "../ListingStore";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";

export const Description: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const onChange = (value: string, field: string) => {
      (store as any)[field] = value;
    };

    const [desc, setDesc] = React.useState(store.desc);
    const [focused, setFocus] = React.useState(false);
    return (
      <div>
        <Typography variant="h3" style={{ marginBottom: "10px" }}>
          Property Description
        </Typography>
        <div>
          <Typography>An eye-catching title for your property</Typography>
          <TextFieldWrapper
            label={"Property Listing Title"}
            field={"descTitle"}
            onChange={onChange}
          />
        </div>
        <div>
          <Typography style={{ marginBottom: "5px" }}>
            A short description
          </Typography>
          <TextField
            fullWidth
            label="Short Description"
            multiline
            rows="10"
            rowsMax="15"
            value={desc}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDesc(e.target.value);
              onChange(e.target.value, "desc");
            }}
            variant="outlined"
            style={{ height: "60px" }}
          />
        </div>
      </div>
    );
  }
);
