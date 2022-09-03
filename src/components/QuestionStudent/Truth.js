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
import withQuestion from "./withQuestion";
import {SET_QUESTION_USER_ANSWER, SET_STUDENT_EXAM_DETAILS} from "../../store/actions";
const Truth = () => {
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault()

        dispatch({
            type: SET_QUESTION_USER_ANSWER,
            payload: {userAnswer: (e.target.value === 'true')},
        });
    }
    return (
        <RadioGroup onChange={handleChange}>
            <FormControlLabel
                value={false}
                control={<Radio />}
                label={"False"}
            />
            <FormControlLabel
                value={true}
                control={<Radio  />}
                label={"True"}
            />
        </RadioGroup>
    );
};

export default Truth;
