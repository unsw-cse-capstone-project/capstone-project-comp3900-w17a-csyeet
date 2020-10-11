import { Button } from "@material-ui/core";
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";

export const BidderRegistrationPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/listing/" + id)}
      >
        Back to Listing
      </Button>
      Bidder rego for listing {id}
    </div>
  );
};
