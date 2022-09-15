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
import { didUserSubmit } from "../../../api/services/UserSubmission";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        margin: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerForOnClick: {
        width: "100%",
        margin: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: 'red'
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        "&& img": {
            marginLeft: "0.8rem",
        },
        "&& h6": {
            marginLeft: "0.8rem",
        },
    },
    time: {
        display: "flex",
        flexDirection: "column",
    },
}));

function seeResultPage(props, navigate, user, course) {
    if (props.seeResultAt == null || props.seeResultAt < Date.now()) {
        navigate(
            `/courses/${course.courseId}/grades/${props.examId}/${user?.username}`
        );
    } else {
        toast.info("you can't access it");
    }
}

function ExamStudent({ examTitle, examId, startingAt, endingAt, seeResultAt }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();
    const [finalGrade, setFinalGrade] = useState(null);
    const [submittedAt, setSubmittedAt] = useState(null);
    const [didUserSubmit_, setUserSubmit_] = useState(null);
    const viewingBeforeExamStarts = () => {
        return startingAt > Date.now();
    };
    const viewingExam = () => {
        return startingAt < Date.now() && endingAt > Date.now();
    };
    const finishedExamButNoGraded = () => {
        return didUserSubmit_ && finalGrade == null;
    };

    const viewingExamResultBeforeSeeResultDate = () => {
        return seeResultAt != null && seeResultAt > Date.now();
    };
    const viewingExamResultBeforeEndingDate = () => {
        return endingAt > Date.now();
    };

    const redirect = (e) => {
        if (viewingBeforeExamStarts()) {
            toast.info("you can't access the exam yet");
        } else if (viewingExam()) {
            navigate(`/exam/${examId}`);
        } else if (viewingExamResultBeforeEndingDate()) {
            toast.info("you can't view exam result before the exam time ends");
        } else if (viewingExamResultBeforeSeeResultDate()) {
            toast.info("you can't view result before the specified time");
        } else if (finishedExamButNoGraded()) {
            toast.info("you have submitted but not graded");
        } else {
            navigate(`/courses/${course.courseId}/grades/${examId}/${user?.username}`);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getExamGrade(examId, user.user_id, controller)
            .then((res) => {
                console.log("what's wrong with status", res.status)
                if (res.status === 200) {
                    console.log("grade", res);
                    setFinalGrade(res.data["finalResult"]);
                    setSubmittedAt(res.data["userSubmitted"]);
                }
            },(error)=>{
                console.log('inside wtf')
                setUserSubmit_(false);

            })

        return () => {
            controller.abort();
        };
    }, []);
    return (
        <Paper elevation={5} className={classes.container}>
            <div className={classes.containerForOnClick} onClick={redirect}>
                <div className={classes.subContainer}>
                    <img src={"/images/icons/exam_logo.svg"} alt={"logo"} />
                    <Typography variant="h6">{examTitle}</Typography>
                </div>
                {finalGrade != null ? (
                    <div>
                        <Typography variant="h6">
                            <b>{finalGrade} %</b>
                        </Typography>
                    </div>
                ) : null}
                {finalGrade == null && didUserSubmit_ ? (
                    <div>
                        <Typography variant="h6">
                            <b>waiting to be graded</b>
                        </Typography>
                    </div>
                ) : null}
                <div className={classes.subContainer}>
                    {!didUserSubmit_ ? (
                        <div className={classes.time}>
                            <Typography variant="caption">
                                {moment(startingAt).format("MMMM Do YYYY, h:mm:ss a")}
                            </Typography>
                            <Typography variant="caption">
                                {moment(endingAt).format("MMMM Do YYYY, h:mm:ss a")}
                            </Typography>
                        </div>
                    ) : (
                        <Typography variant="caption">
                            {moment(submittedAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>
                    )}
                </div>
            </div>
        </Paper>
    );
}

export default ExamStudent;
