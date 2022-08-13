import QuestionHeader from "./QuestionHeader";
import React from "react";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        position: 'relative',
        padding: '15px 20px',
        marginTop: "2rem",
    },
    textField: {
        width: '100%',
    },
    dropDown: {
        margin:"50px"
    },
    deleteIcon : {
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
        // paddingTop: 20
    }
}));

export default function withAddQuestion(WrappedComponent) {
    return function New(props) {
        const classes = useStyles();
        return (
            <Paper elevation={3} className={classes.paperStyle}>
                <Grid container spacing={2}>
                    <QuestionHeader/>
                    <WrappedComponent />
                </Grid>
            </Paper>
        )
    }
}