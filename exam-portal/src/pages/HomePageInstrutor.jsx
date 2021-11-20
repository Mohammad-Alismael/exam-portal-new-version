import Toolbar from "@material-ui/core/Toolbar";
import logo from "../img/logo.png";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useStyles} from "../GlobalStyles/GlobalStyles";

function HomePageInstructor() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ marginLeft: '10%', marginRight: '10%', }}>
                    <img src={logo} className={classes.logo} alt="Exam Portal" />
                    <Typography variant="body2" className={classes.title} style={{ color: '#666666' }} align="right">
                        Don't have an account? <Link href="/signup">Sign up</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HomePageInstructor;

