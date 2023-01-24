import React, {useEffect, useState} from "react";
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
import {Editor} from "react-draft-wysiwyg";
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';

import {calcState, createMarkup} from "../../utils/global/GlobalConstants";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '60vw',
        // margin: "30px auto",
        position: 'relative',
    },
}));

const Question = ({ questionIndex}) => {
    const classes = useStyles();
    const exam = useSelector((state) => state.ExamReducer);

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

    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(calcState(exam.questions[questionIndex].questionText).getCurrentContent());
        setConvertedContent(html);
    }, [exam.questions, questionIndex]);


    return (
        <Paper className={classes.paperStyle} elevation={0}>
            <Grid container>
                { exam.questions[questionIndex].questionType != 4 ?
                    <Grid item xs={10}>
                        <h3 dangerouslySetInnerHTML={createMarkup(convertedContent)}></h3>
                </Grid> : null}
                { exam.questions[questionIndex].questionType != 4 ?
                    <Grid item xs={2}>
                    <Typography style={{color:"black"}} sx={{ float: 'right', flex: 1 }} variant="subtitle1">
                        <b>{exam.questions[questionIndex].points} points</b>
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
