import React, {Component, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import {connect, useDispatch, useSelector} from "react-redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import {SvgIcon} from "@mui/material";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontAwesomeSvgIcon from "../../../components/FontAwesomeSvgIcon";
import LongMenu from "../../../components/LongMenu";
import {
    SET_COURSE_EXAMS, SET_QUESTIONS
} from "../../../store/actions";
import {deleteExam} from "../../../api/services/Exam";
import {setCourseExams} from "../../../actions/CourseAction";
import {getExamGrade} from "../../../api/services/UserAnswer";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GradingIcon from '@mui/icons-material/Grading';
import BarChartIcon from '@mui/icons-material/BarChart';
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
        padding: '1rem',
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

function ExamInstructor({examTitle,examId,startingAt,endingAt}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();
    const redirect = (e) => {
        e.stopPropagation()
        dispatch({ type: SET_QUESTIONS, payload: { questions: [] } });
        navigate(`/preview/${examId}`);
    };
    useEffect(()=>{
        const controller = new AbortController();
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
                        {examTitle}
                    </Typography>
                </div>
                <div className={classes.subContainer}>
                    <div className={classes.time}>
                        <Typography variant="caption">
                            {moment(startingAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>
                        <Typography variant="caption">
                            {moment(endingAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>
                    </div>
                </div>
            </div>
            <LongMenu
                className={classes.menuIcon}
                options={["Delete Exam", "See Grades","Exam Statistics"]}
                icons={[<DeleteOutlineIcon />,<GradingIcon />,<BarChartIcon />]}
                functions={[function (e) {
                    e.stopPropagation()
                    deleteExam(examId).then((data) => {
                        console.log(data)
                        const newExamsArray = course.exams.filter(({exam_id},i)=>{
                            return exam_id !== examId
                        })
                        dispatch({ type: SET_COURSE_EXAMS, payload: { exams: newExamsArray } });

                    })
                },
                    function (e) {
                    e.stopPropagation()
                    navigate(`/courses/${course?.courseId}/grades/${examId}`)

                },function (e) {
                    e.stopPropagation()
                    navigate(`/courses/${course?.courseId}/statistics/${examId}`)

                }]}
            />
        </Paper>
    );
}

export default ExamInstructor;
