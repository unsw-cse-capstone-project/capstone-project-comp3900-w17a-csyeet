import { Snackbar } from "@material-ui/core";
import { StarBorderRounded, StarRounded } from "@material-ui/icons";
import * as React from "react";
import MuiAlert from "@material-ui/lab/Alert";

export const Star = ({ id, starred }: { id: number; starred: boolean }) => {
  const [isStarred, setIsStarred] = React.useState(starred);
  const [isError, setIsError] = React.useState(false);
  const onClick = async () => {
    if (isStarred) {
      try {
        const response = await fetch(`/listings/${id}/unstar`, {
          method: "post",
        });
        const result = await response.json();
        if (result !== null) {
          setIsError(true);
          return;
        }
        setIsStarred(false);
      } catch {
        setIsError(true);
      }
      return;
    }
    try {
      const response = await fetch(`/listings/${id}/star`, {
        method: "post",
      });
      const result = await response.json();
        if (result !== null) {
        setIsError(true);
        return;
      }
      setIsStarred(true);
    } catch {
      setIsError(true);
    }
  };
  return (
    <div onClick={onClick} style={{ cursor: "pointer", zIndex: 1000000 }}>
      {isStarred ? (
        <StarRounded fontSize="large" />
      ) : (
        <StarBorderRounded fontSize="large" />
      )}
      <Snackbar
        open={isError}
        autoHideDuration={2000}
        onClose={() => setIsError(false)}
      >
        <MuiAlert elevation={6} severity="error">
          Error occurred, please try again
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
