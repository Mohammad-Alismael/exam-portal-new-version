import React, {Component, useEffect} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import {connect, useDispatch, useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import {SvgIcon} from "@mui/material";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontAwesomeSvgIcon from "../../../components/FontAwesomeSvgIcon";
import LongMenu from "../../../components/LongMenu";
import {
    SET_ASSIGNED_FOR, SET_COURSE_EXAMS,
    SET_ENDING_AT, SET_EXAM_ANSWER_KEY, SET_EXAM_ANSWER_KEY_AT, SET_EXAM_RANDOMNESS, SET_EXAM_TIMER,
    SET_EXAM_TITLE, SET_NAVIGATION, SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT, SET_STUDENTS
} from "../../../store/actions";
import {deleteExam} from "../../../api/services/Exam";
import {setCourseExams} from "../../../actions/CourseAction";
import {getExamGrade} from "../../../api/services/UserAnswer";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    containerForOnClick: {
        width: '100%',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        "&& img": {
            marginLeft: '0.8rem'
        },
        "&& h6": {
            marginLeft: '0.8rem'
        }
    },
    time: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

function seeResultPage(props, navigate, user,course) {
    if (props.seeResultAt == null || props.seeResultAt < Date.now()) {
        navigate(`/courses/${course.courseId}/grades/${props.examId}/${user?.username}`)
    } else {
        toast.info("you can't access it")
    }
}

function studentNavigate(props, navigate, user,course) {
    if (props.endingAt > Date.now()) {
        navigate(`/exam/${props.examId}`);
    } else {
        seeResultPage(props, navigate, user,course);
    }
}

function Exam(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();
    const redirect = (e) => {
        e.stopPropagation()
        if (user.role_id == 3) {
            navigate(`/preview/${props.examId}`);
        } else {
            studentNavigate(props, navigate, user,course);
        }
    };
    useEffect(()=>{
        const controller = new AbortController();
        if (user.role_id != 3) {
            getExamGrade(props.examId, user.user_id, controller)
                .then((data) => {
                    if (data.status != 204 || data.status != 404){

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        return () => {
            controller.abort();
        };
    },[])
    return (
        <Paper elevation={5} className={classes.container}>
            <div className={classes.containerForOnClick} onClick={redirect}>
                <div className={classes.subContainer}>
                    <img src={'/images/icons/exam_logo.svg'} alt={'logo'}/>
                    <Typography variant="h6">
                        {props.examTitle}
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">
                        <b>{72} %</b>
                    </Typography>
                </div>
                <div className={classes.subContainer}>
                    <div className={classes.time}>
                        <Typography variant="caption">
                            {moment(props.startingAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>
                        <Typography variant="caption">
                            {moment(props.endingAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>
                    </div>
                </div>
            </div>
            { parseInt(user.role_id) === 3 ? <LongMenu
                className={classes.menuIcon}
                options={["Delete", "Clone for other sections", "see grades","exam statistics"]}
                functions={[function (e) {
                    e.stopPropagation()
                    deleteExam(props.examId).then((data) => {
                        console.log(data)
                        const newExamsArray = course.exams.filter(({exam_id},i)=>{
                            return exam_id !== props.examId
                        })
                        dispatch({ type: SET_COURSE_EXAMS, payload: { exams: newExamsArray } });

                    })
                }, function (e) {
                    e.stopPropagation()
                    alert('create it for other sections')
                },function (e) {
                    e.stopPropagation()
                    navigate(`/courses/${course?.courseId}/grades/${props.examId}`)

                },function (e) {
                    e.stopPropagation()
                    navigate(`/courses/${course?.courseId}/statistics/${props.examId}`)

                }]}
            /> : null}
        </Paper>
    );
}

export default Exam;
