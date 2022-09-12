import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { connect, useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { SvgIcon } from "@mui/material";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FontAwesomeSvgIcon from "../../../components/FontAwesomeSvgIcon";
import LongMenu from "../../../components/LongMenu";
import {
    SET_ASSIGNED_FOR,
    SET_COURSE_EXAMS,
    SET_ENDING_AT,
    SET_EXAM_ANSWER_KEY,
    SET_EXAM_ANSWER_KEY_AT,
    SET_EXAM_RANDOMNESS,
    SET_EXAM_TIMER,
    SET_EXAM_TITLE,
    SET_NAVIGATION,
    SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT,
    SET_STUDENTS,
} from "../../../store/actions";
import { deleteExam } from "../../../api/services/Exam";
import { setCourseExams } from "../../../actions/CourseAction";
import { getExamGrade } from "../../../api/services/UserAnswer";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        margin: "1rem",
    },
   pTag: {
       textAlign: 'center',
       textTransform: 'capitalize',
       fontSize: '1.5rem',
       padding: '1rem',
       fontWeight: 'bold'
   }
}));


function NoExam(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();
    const [finalGrade, setFinalGrade] = useState(null);
    const [submittedAt, setSubmittedAt] = useState(null);
    useEffect(() => {
    }, []);
    return (
        <Paper elevation={5} className={classes.container}>
            <p className={classes.pTag}>{parseInt(user.role_id) !== 3 ? "you have no exams" :
                "you have not created any exams"}</p>
        </Paper>
    );
}

export default NoExam;
