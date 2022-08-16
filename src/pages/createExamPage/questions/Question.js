import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Mcq from "./Mcq";
import Text from "./Text";
import CheckBoxComp from "./CheckBoxComp";
import Matching from "./Matching";
import Truth from "./Truth";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '60vw',
        // margin: "30px auto",
        position: 'relative'
    },
}));

const Question = ({ questionIndex}) => {
    const classes = useStyles();
    const exam = useSelector((state) => state.ExamReducer);

    const chooseQuestionType = (questionType) => {
        if (questionType === 1) {
            return (
                <Mcq
                    questionIndex={questionIndex}
                />
            );
        } else if (questionType === 2) {
            return (
                <Text
                    questionIndex={questionIndex}
                />
            );
        } else if (questionType === 3) {
            return (
                <CheckBoxComp
                    questionIndex={questionIndex}
                />
            );
        } else if (questionType === 4) {
            return (
                <Matching
                    questionIndex={questionIndex}
                />
            );
        } else {
            return (
                <Truth
                    questionIndex={questionIndex}
                />
            );
        }
    };

    return (
        <Paper className={classes.paperStyle}>
            <Grid container>
                { exam.questions[questionIndex].questionType != 4 ?
                    <Grid item xs={10}>
                    <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                        {exam.questions[questionIndex].questionText}
                    </Typography>
                </Grid> : null}
                { exam.questions[questionIndex].questionType != 4 ?
                    <Grid item xs={2}>
                    <Typography style={{color:"black"}} sx={{ float: 'right', flex: 1 }} variant="h6">
                        {exam.questions[questionIndex].points} points
                    </Typography>
                </Grid> : null}
                <Grid item xs={12}>
                    {chooseQuestionType(exam.questions[questionIndex].questionType)}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Question;
