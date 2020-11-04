import { Snackbar } from "@material-ui/core";
import { StarBorderRounded, StarRounded } from "@material-ui/icons";
import * as React from "react";
import MuiAlert from "@material-ui/lab/Alert";

export const Star = ({
  id,
  starred,
  onStar,
  onUnstar,
}: {
  id: number;
  starred: boolean;
  onStar?: () => void;
  onUnstar?: () => void;
}) => {
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
        onUnstar && onUnstar();
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
      onStar && onStar();
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} severity="error">
          Error occurred, please try again
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
