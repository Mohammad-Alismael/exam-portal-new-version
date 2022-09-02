import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import Mcq from "../../components/QuestionStudent/Mcq";
import Text from "../../components/QuestionStudent/Text";
import CheckBoxComp from "../../components/QuestionStudent/CheckBoxComp";
import Matching from "../../components/QuestionStudent/Matching";
import Truth from "../../components/questions/Truth";
import {useDispatch, useSelector} from "react-redux";
import {SET_ENDING_AT, SET_QUESTION_INDEX} from "../../store/actions";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    questionContainer: {
        margin: "10% 15%",
        padding: "1rem",
    },
}));
export default function StudentQuestion(props) {
    const classes = useStyles();
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const dispatch = useDispatch();

    const chooseQuestionType = (questionType) => {
        if (questionType === 1) {
            return <Mcq questionIndex={examStudent.questionIndex} />;
        } else if (questionType === 2) {
            return <Text questionIndex={examStudent.questionIndex} />;
        } else if (questionType === 3) {
            return <CheckBoxComp questionIndex={examStudent.questionIndex} />;
        } else if (questionType === 4) {
            return <Matching questionIndex={examStudent.questionIndex} />;
        } else {
            return <Truth questionIndex={examStudent.questionIndex} />;
        }
    };
    const previousQuestion = (e) => {
        e.preventDefault();
        if (examStudent.questionIndex > 0) {
            dispatch({
                type: SET_QUESTION_INDEX,
                payload: {questionIndex: examStudent.questionIndex - 1},
            });
        }
    };
    const nextQuestion = (e) => {
        e.preventDefault();
        if (examStudent.questionIndex < examStudent.questions.length)
            dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: examStudent.questionIndex + 1},});
    };
    return <Paper elevation={3} className={classes.questionContainer}>
        <Grid container spacing={2} sx={{mt: 2, mb: 2, padding: "0 1rem"}}>
            {examStudent.questions[examStudent.questionIndex]["previewFile"] != null ? (
                <Grid xs={12} item>
                    <img
                        style={{maxWidth: "100%", marginBottom: "1rem"}}
                        src={
                            examStudent.questions[examStudent.questionIndex]["previewFile"]["preview"]
                        }
                        alt={"question img"}
                    />
                </Grid>
            ) : null}
            {examStudent.questions[examStudent.questionIndex].questionType !== 4 ? (
                <Grid item xs={10}>
                    <Typography
                        style={{color: "black"}}
                        sx={{ml: 1, flex: 1}}
                        variant="h6"
                    >
                        {examStudent.questions[examStudent.questionIndex].questionText}
                    </Typography>
                </Grid>
            ) : null}
            {examStudent.questions[examStudent.questionIndex].questionType !== 4 ? (
                <Grid item xs={2}>
                    <Typography
                        style={{color: "black"}}
                        sx={{float: "right", flex: 1}}
                        variant="subtitle1"
                    >
                        <b>{examStudent.questions[examStudent.questionIndex].points} points</b>
                    </Typography>
                </Grid>
            ) : null}
        </Grid>
        <Grid item xs={12} style={{margin: "0 12px"}}>
            {chooseQuestionType(examStudent.questions[examStudent.questionIndex].questionType)}
        </Grid>
        <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
            {examStudent?.examDetails?.navigation == 1 ? <Button
                sx={{mr: 1}}
                disabled={examStudent?.questionIndex === 0}
                onClick={previousQuestion}
            >
                Back
            </Button> : null}
            <Box sx={{flex: "1 1 auto"}}/>
            <Button variant="outlined"
                    disabled={examStudent?.questionIndex === examStudent?.questions.length -1}
                    onClick={nextQuestion}>
                Next
            </Button>
        </Box>
    </Paper>;
}