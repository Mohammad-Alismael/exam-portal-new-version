import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Mcq from "../../components/QuestionStudent/Mcq";
import Text from "../../components/QuestionStudent/Text";
import CheckBoxComp from "../../components/QuestionStudent/CheckBoxComp";
import Matching from "../../components/QuestionStudent/Matching";
import Truth from "../../components/QuestionStudent/Truth";
import {useDispatch, useSelector} from "react-redux";
import {SET_ENDING_AT, SET_QUESTION_INDEX} from "../../store/actions";
import {makeStyles} from "@material-ui/core/styles";
import {
    calcState,
    CHECKBOX_QUESTION_TYPE,
    createMarkup, MATCHING_QUESTION_TYPE,
    MCQ_QUESTION_TYPE,
    TEXT_QUESTION_TYPE, TRUTH_QUESTION_TYPE
} from "../../utils/global/GlobalConstants";
import {convertToHTML} from "draft-convert";
const useStyles = makeStyles((theme) => ({
    questionContainer: {
        padding: "1rem",
    },
}));
export default function StudentQuestion() {
    const classes = useStyles();
    const {questions,examDetails,questionIndex} = useSelector((state) => state.ExamStudentReducer);
    const dispatch = useDispatch();
    const [convertedContent, setConvertedContent] = useState(null);

    const questionMapping = {
        [MCQ_QUESTION_TYPE]: <Mcq questionIndex={questionIndex} />,
        [TEXT_QUESTION_TYPE]: <Text questionIndex={questionIndex} />,
        [CHECKBOX_QUESTION_TYPE]: <CheckBoxComp questionIndex={questionIndex} />,
        [MATCHING_QUESTION_TYPE]: <Matching questionIndex={questionIndex} />,
        [TRUTH_QUESTION_TYPE]: <Truth questionIndex={questionIndex} />,
    };

    const chooseQuestionType = (questionType) => {
        return questionMapping[questionType];
    };

    const previousQuestion = (e) => {
        e.preventDefault();
        if (questionIndex > 0) {
            dispatch({
                type: SET_QUESTION_INDEX,
                payload: {questionIndex: questionIndex - 1},
            });
        }
    };
    const nextQuestion = (e) => {
        e.preventDefault();
        if (questionIndex < questions.length)
            dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: questionIndex + 1},});
    };
    useEffect(() => {
        let html = convertToHTML(calcState(questions[questionIndex].questionText).getCurrentContent());
        setConvertedContent(html);
    }, [questions, questionIndex]);

    return (
        <>
            <Typography sx={{mb: 4,color: '#fff'}} variant="h4" align="left">
                <b>Questions</b>
            </Typography>
            <Paper elevation={3} className={classes.questionContainer}>
                <Grid container spacing={2} alignItems={'center'}>
                    {questions[questionIndex]["previewFile"] != null ? (
                        <Grid xs={12} item>
                            <img
                                style={{maxWidth: "100%", marginBottom: "1rem"}}
                                src={
                                    questions[questionIndex]["previewFile"]["preview"]
                                }
                                alt={"question img"}
                            />
                        </Grid>
                    ) : null}
                    {questions[questionIndex].questionType !== 4 ? (
                        <Grid item xs={10}>
                            <h3 style={{margin: 0,padding:0}} dangerouslySetInnerHTML={createMarkup(convertedContent)}></h3>
                        </Grid>
                    ) : null}
                    {questions[questionIndex].questionType !== 4 ? (
                        <Grid item xs={2}>
                            <Typography
                                style={{color: "black"}}
                                sx={{float: "right", flex: 1}}
                                variant="subtitle1"
                            >
                                <b>{questions[questionIndex].points} points</b>
                            </Typography>
                        </Grid>
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    {chooseQuestionType(questions[questionIndex].questionType)}
                </Grid>
                <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                    {examDetails?.navigation ? <Button
                        sx={{mr: 1}}
                        disabled={questionIndex === 0}
                        onClick={previousQuestion}
                    >
                        Back
                    </Button> : null}
                    <Box sx={{flex: "1 1 auto"}}/>
                    <Button variant="outlined"
                            disabled={questionIndex === questions.length -1}
                            onClick={nextQuestion}>
                        Next
                    </Button>
                </Box>
            </Paper>
        </>
    );
}