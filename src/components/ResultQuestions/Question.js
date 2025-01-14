import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Mcq from "./Mcq";
import Text from "./Text";
import CheckBoxComp from "./CheckBoxComp";
import Matching from "./Matching";
import Truth from "./Truth";
import { useDispatch, useSelector } from "react-redux";
import { SET_ENDING_AT, SET_QUESTION_INDEX } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import QuestionImg from "./QuestionImg";
import { QuestionText } from "./QuestionText";
import QuestionPoints from "./QuestionPoints";
import { QuestionPointsForText } from "./QuestionPointsForText";
const useStyles = makeStyles((theme) => ({}));

export default function Question({ questionIndex }) {
    const classes = useStyles();
    const {user} = useSelector((state) => state.UserReducerV2);
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    const questionType = parseInt(submissions[questionIndex]["questionDetails"]['question_type']);
    const dispatch = useDispatch();

    const questionTypeMapping = {
        1: Mcq,
        2: Text,
        3: CheckBoxComp,
        4: Matching,
        5: Truth
    }

    const chooseQuestionType = (questionType) => {
        const Component = questionTypeMapping[questionType];
        return <Component questionIndex={questionIndex} />;
    };
    return (
        <Paper elevation={3} className={classes.questionContainer}>
            <Grid container spacing={2} sx={{ mt: 2, padding: "0 1rem" }}>
                <QuestionImg questionIndex={questionIndex} />
                {questionType !== 4 ? (
                    <QuestionText questionIndex={questionIndex} />
                ) : null}
                {parseInt(user?.role_id) === 3 && questionType !== 4 && questionType !== 2 ? (
                    <QuestionPoints questionIndex={questionIndex} />
                ) : null}
                {questionType !== 4 && parseInt(user?.role_id) !== 3 ? (
                    <QuestionPoints questionIndex={questionIndex} />
                ) : null}
                {questionType === 2 && parseInt(user?.role_id) === 3 ? (
                    <QuestionPointsForText questionIndex={questionIndex} />
                ) : null}
            </Grid>
            <Grid item xs={12} sx={{mt: 2,padding: "0 24px 24px 24px" }}>
                {chooseQuestionType(
                    submissions[questionIndex]["questionDetails"].question_type
                )}
            </Grid>
        </Paper>
    );
}
