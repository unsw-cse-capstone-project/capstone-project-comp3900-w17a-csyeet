import { StarBorderRounded, StarRounded } from "@material-ui/icons";
import * as React from "react";
import { delay } from "../../util/helper";

export const Star = ({ id, starred }: { id: number; starred: boolean }) => {
  const [isStarred, setIsStarred] = React.useState(starred);
  const onClick = async () => {
    if (isStarred) {
      await delay(200);
      setIsStarred(false);
      return;
    }
    await delay(200);
    setIsStarred(true);
  };
  return (
    <div onClick={onClick} style={{ cursor: "pointer", zIndex: 1000000 }}>
      {isStarred ? (
        <StarRounded fontSize="large" />
      ) : (
        <StarBorderRounded fontSize="large" />
      )}
    </div>
  );
};
