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
import {SET_ANSWER_KEY, SET_QUESTION_TEXT, SET_QUESTIONS} from "../../../store/actions";
import {store} from "../../../index";
const Truth = ({updateQuestionArray}) => {
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();


    const handleChange = (e) =>{
        dispatch({ type: SET_ANSWER_KEY, payload: { answerKey: e.target.value } });
        updateQuestionArray(store.getState()['AddQuestionReducer'])
    }

    return (
        <RadioGroup onChange={handleChange} style={{ marginLeft: 12 }}>
            <FormControlLabel
                value={true}
                control={<Radio />}
                label={"True"}
            />
            <FormControlLabel
                value={false}
                control={<Radio  />}
                label={"False"}
            />
        </RadioGroup>
    );
};

export default Truth;
