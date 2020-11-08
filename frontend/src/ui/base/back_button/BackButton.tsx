import * as React from "react";
import { ArrowBackIos } from "@material-ui/icons";
import { Button } from "@material-ui/core";

/**
 * Back Button for pages to return to the previous page
 */
export const BackButton = ({
  onClick,
  text,
  className,
}: {
  onClick: () => void;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <Button
    className={className}
    startIcon={<ArrowBackIos />}
    size="large"
    onClick={onClick}
    style={{ width: "fit-content" }}
  >
    {text}
  </Button>
);
