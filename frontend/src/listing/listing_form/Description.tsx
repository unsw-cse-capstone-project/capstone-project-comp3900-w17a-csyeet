import React from "react";
import { observer } from "mobx-react";
import { Typography, TextField, FormHelperText } from "@material-ui/core";
import { ListingStore } from "../ListingPresenter";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { action } from "mobx";

export const Description: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const { title, description } = store.listing;
    const onChange = action((value: string, field: string) => {
      (store as any).listing[field] = value;
    });

    const [desc, setDesc] = React.useState<string>(description);
    const [descError, setDescError] = React.useState<boolean>(false);
    return (
      <div>
        <div>
          <Typography variant={"subtitle1"} style={{ marginTop: "30px" }}>
            An eye-catching title for your property
          </Typography>
          <TextFieldWrapper
            label={"Property Listing Title"}
            field={"title"}
            onChange={onChange}
            value={title}
          />
        </div>
        <div>
          <Typography
            variant="subtitle1"
            style={{ marginBottom: "15px", marginTop: "35px" }}
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
            onBlur={() =>
              desc === "" ? setDescError(true) : setDescError(false)
            }
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDesc(e.target.value);
              onChange(e.target.value, "description");
            }}
          />
          {descError && (
            <FormHelperText style={{ color: "red" }}>
              Description is required*
            </FormHelperText>
          )}
        </div>
      </div>
    );
  }
);
