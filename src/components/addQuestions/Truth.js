import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {connect, useDispatch, useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import withAddQuestion from "./withAddQuestion";

const Truth = ({questionIndex,updateQuestionArray}) => {
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        updateQuestionArray({answerKey: (e.target.value === 'true')})
    }

    return (
        <RadioGroup onChange={handleChange} value={exam?.questions[questionIndex].answerKey == 1 ? true : false} style={{ marginLeft: 12 }}>
            <FormControlLabel
                value={false}
                control={<Radio />}
                label={"False"}
            />
            <FormControlLabel
                value={true}
                control={<Radio />}
                label={"True"}
            />
        </RadioGroup>
    );
};

export default Truth;
