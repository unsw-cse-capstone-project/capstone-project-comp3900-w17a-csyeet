import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Logo from "../logo/Logo";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
export const FooterStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: "#f3f4f5",
      padding: theme.spacing(7, "15%", 18, "15%"),
      boxSizing: "border-box",
    },
    grid: {
      width: "100%",
      boxSizing: "border-box",
    },
    icons: {
      margin: theme.spacing(2, 0),
      display: "flex",
      justifyContent: "center",
    },
    image: {
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
      },

      [theme.breakpoints.only("xs")]: {
        width: "70%",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(0, 0, 2, 0),
    },
    buttonMargin: {
      marginRight: "10px",
    }
  })
);

/**
 * Footer for website
 */
export const Footer = () => {
  const classes = FooterStyle();
  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.grid}>
        <Grid item xs={12} md={6} className={classes.content}>
          <div className={classes.image}>
            <Logo size="large" />
          </div>
          <div className={classes.icons}>
            <FacebookIcon fontSize="large" className={classes.buttonMargin} />
            <InstagramIcon fontSize="large" className={classes.buttonMargin} />
            <LinkedInIcon fontSize="large" />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" color="textSecondary">
            &#169; Copyright Abode 2020
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
