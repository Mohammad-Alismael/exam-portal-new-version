import React, {useEffect, useState} from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import Exam from "./Exam";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import {useNavigate, useParams} from "react-router-dom";
import {fetchExams} from "../../../api/services/Exam";
import {setCourseExams} from "../../../actions/CourseAction";
import {CircularProgress} from "@material-ui/core";
import {
    SET_ASSIGNED_FOR,
    SET_ENDING_AT, SET_EXAM_ANSWER_KEY, SET_EXAM_ANSWER_KEY_AT, SET_EXAM_RANDOMNESS, SET_EXAM_TIMER,
    SET_EXAM_TITLE, SET_NAVIGATION, SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT, SET_STUDENTS
} from "../../../store/actions";
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '7% 25%',
        float: 'center',
        cursor: 'pointer'
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
    },
    createExamBtnContainer: {
        // backgroundColor: 'red',
        width: '103%',
        height: '30px',
        margin: '1.2rem',
    },
    createExamBtn: {
        borderRadius: '20px !important',
        float: 'right',
    }
}));
const ExamPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { course_id } = useParams();
    const [exams,setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector(state => state.CourseReducer);
    const createNewExam = (e) =>{
        e.preventDefault()
        resetExamReducer()
        navigate(`/courses/${course_id}/create-exam`)
    }
    function resetExamReducer() {
        dispatch({
            type: SET_STARTING_AT,
            payload: {startingAt: 0},
        });
        dispatch({
            type: SET_ENDING_AT,
            payload: {endingAt: 0},
        });
        dispatch({
            type: SET_EXAM_TITLE,
            payload: {examTitle: ""},
        });
        dispatch({
            type: SET_ASSIGNED_FOR,
            payload: {assignedFor: 3},
        });
        dispatch({
            type: SET_SPECIFIC_STUDENTS,
            payload: {specificStudents: null},
        });
        dispatch({
            type: SET_STUDENTS,
            payload: {students: []},
        });
        dispatch({
            type: SET_NAVIGATION,
            payload: {navigation: null},
        });
        dispatch({
            type: SET_EXAM_TIMER,
            payload: {questionTimer: 'false'},
        });
        dispatch({
            type: SET_EXAM_RANDOMNESS,
            payload: {questionRandomness: 'true'},
        });
        dispatch({
            type: SET_EXAM_ANSWER_KEY_AT,
            payload: {postingAnswerKeyAt: null},
        });
        dispatch({
            type: SET_EXAM_ANSWER_KEY,
            payload: {postingAnswerKey: 'true'},
        });
        dispatch({ type: SET_QUESTIONS, payload: { questions: [] } });
    }
    useEffect(()=>{
        const controller = new AbortController();
        fetchExams(course_id,controller).then((data)=>{
            console.log('exams', data)
            setExams(data)
            setCourseExams(data)
            setLoading(false)
        }).catch((e)=>{
            console.log(e)
        })
        return ()=>{
            controller.abort()
        }
    },[])
    if (loading) {
        return <CircularProgress size={200}/>;
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                {user.role_id === 3 ? <div className={classes.createExamBtnContainer}>
                    <Tooltip title="create new exam/quiz for this course">
                        <Button onClick={createNewExam} className={classes.createExamBtn} variant="contained" color="warning" endIcon={<AddIcon />}>
                            <b>create</b>
                        </Button>
                    </Tooltip>
                </div> : null}
                {
                    exams.map(({exam_id,title, starting_at,ending_at},index)=>{
                        return <Exam
                            examTitle={title}
                            examId={exam_id}
                            startingAt={starting_at}
                            endingAt={ending_at}
                        />
                    })
                }
            </div>
        </>
    );
};

export default ExamPage;