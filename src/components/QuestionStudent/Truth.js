import React, { useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {connect, useDispatch, useSelector} from "react-redux";
import {SET_QUESTION_USER_ANSWER, SET_STUDENT_EXAM_DETAILS} from "../../store/actions";
const Truth = ({questionIndex}) => {
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault()
        dispatch({
            type: SET_QUESTION_USER_ANSWER,
            payload: {userAnswer: (e.target.value === 'true'),index: questionIndex},
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
