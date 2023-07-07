import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../img/logo.png";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "20%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "30%",
    },
  },
  title: {
    flexGrow: 1,
  },
}));
function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color='white' elevation={0}>
      <Toolbar>
        <img src={logo} className={classes.logo} alt="ExamInstructor Portal" />
        <Typography
          variant="body2"
          className={classes.title}
          style={{ color: "#666666" }}
          align="right"
        >
          {props.type == 1
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link href={props.type == 1 ? "/signup" : "/"}>
            {props.type == 1 ? "Sign up" : "Login"}
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
