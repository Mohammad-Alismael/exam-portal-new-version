import React from "react";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@mui/material/Button";
import Navbar from "../layouts/Navbar";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        maxWidth: 320
    },
    forgotPasswordBox: {
        display: "flex",
        justifyContent: "center",
    },
    container: {
        display: "flex",
        alignItems: "center",
    },
}));

export default function withContainer(props) {
    return function New(Wrapped) {
        return function NewNew(moreProps) {
            const classes = useStyles();
            return (
                <div>
                    <Navbar type={props.navBarType} />
                    <Grid container direction="row" justifyContent="center" alignItems="center" style={{height: '100vh'}}>
                        <Paper elevation={10} style={{padding: '30px'}}>
                            <div className={classes.paper}>
                                <Typography variant="h3" align={'center'}>
                                    <b>{props.title}</b>
                                </Typography>
                                <Divider style={{margin: '8px 0px'}}/>
                                <Wrapped style={{padding: '15px 0'}} {...moreProps} />
                            </div>
                        </Paper>
                    </Grid>
                </div>
            )
        }
    }
}