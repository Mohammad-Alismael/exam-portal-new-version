import React from "react";
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import {Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import * as PropTypes from "prop-types";
import ExamSettings from "./ExamSettings";
import ExamNavigation from "./ExamNavigation";
import ExamTimer from "./ExamTimer";
import ExamVisibility from "./ExamVisibility";
import ExamRandomness from "./ExamRandomness";
import ExamAnswerKey from "./ExamAnswerKey";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "7% 15%",
        float: "center",
    },
    paperStyle: {
        padding: '1rem',
    },
    textField: {
        width: "100%",
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
    },
}));

function CreateExamPage(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [questions, setQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [examTitle, setExamTitle] = React.useState("");
    const [examPoints, setExamPoints] = React.useState(0);
    const [startingAt, setStartingAt] = React.useState(0);
    const [endingAt, setEndingAt] = React.useState(0);
    const updateStartingAt = (e) => {
        setStartingAt(Date.parse(e.target.value));
    };
    const updateEndingAt = (e) => {
        setEndingAt(Date.parse(e.target.value));
    };
    const components = [
        <ExamSettings />,
        <ExamNavigation/>,
        <ExamTimer />,
        <ExamVisibility />,
        <ExamRandomness/>,
        <ExamAnswerKey />
    ]
    return (
        <>
            <ResponsiveAppBar/>
            <div className={classes.container}>
                <Paper elevation={5} className={classes.paperStyle}>
                    <Typography sx={{mb: 2}} variant="h4" align={'left'}>
                        <b>Exam Details</b>
                    </Typography>
                    <HorizontalLinearStepper components={components}/>
                </Paper>
            </div>
        </>
    );
}

export default CreateExamPage;
