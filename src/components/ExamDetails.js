import {Paper, Typography} from "@mui/material";
import React from "react";
import ExamSettings from "./HorizontalLinearStepper/ExamSettings";
import ExamNavigation from "./HorizontalLinearStepper/ExamNavigation";
import ExamTimer from "./HorizontalLinearStepper/ExamTimer";
import ExamRandomness from "./HorizontalLinearStepper/ExamRandomness";
import ExamAnswerKey from "./HorizontalLinearStepper/ExamAnswerKey";
import {makeStyles} from "@material-ui/core/styles";
import HorizontalLinearStepper from "./HorizontalLinearStepper/HorizontalLinearStepper";
const components = [
    <ExamSettings />,
    <ExamNavigation />,
    <ExamTimer />,
    <ExamRandomness />,
    <ExamAnswerKey />,
];
const useStyles = makeStyles((theme) => ({
    container: {
        padding: "7% 15%",
        float: "center",
    },
    paperStyle: {
        padding: "1rem",
    },
    textField: {
        width: "100%",
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
    },
    addQuestionBtn: {
        float: "right",
    },
}));
export default function ExamDetails(props) {
    const classes = useStyles();

    return (
        <>
            <Paper elevation={5} className={classes.paperStyle}>
                <Typography sx={{mb: 2}} variant="h4" align={"left"}>
                    <b>Exam Details</b>
                </Typography>
                <HorizontalLinearStepper components={components}/>
            </Paper>
        </>
    )
}