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
        position: 'relative',
        backgroundColor: 'red'
    },
}));

const Question = ({ questionIndex}) => {
    const classes = useStyles();
    const examStudent = useSelector((state) => state.ExamStudentReducer);

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
        <Paper className={classes.paperStyle} elevation={0}>
            <Grid container>
                { examStudent.questions[questionIndex]['previewFile'] != null ? <Grid xs={12} item>
                    <img style={{maxWidth: '100%',marginBottom: '1rem'}} src={examStudent.questions[questionIndex]['previewFile']['preview']} alt={'question img'}/>
                </Grid> : null }
                { examStudent.questions[questionIndex].questionType != 4 ?
                    <Grid item xs={10}>
                    <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                        {examStudent.questions[questionIndex].questionText}
                    </Typography>
                </Grid> : null}
                { examStudent.questions[questionIndex].questionType != 4 ?
                    <Grid item xs={2}>
                    <Typography style={{color:"black"}} sx={{ float: 'right', flex: 1 }} variant="subtitle1">
                        <b>{examStudent.questions[questionIndex].points} points</b>
                    </Typography>
                </Grid> : null}
                <Grid item xs={12}>
                    {chooseQuestionType(examStudent.questions[questionIndex].questionType)}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Question;
