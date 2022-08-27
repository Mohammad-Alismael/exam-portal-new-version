import React, {useEffect, useState} from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import Exam from "./Exam";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import {useNavigate, useParams} from "react-router-dom";
import {fetchExams} from "../../../api/services/Exam";
import {setCourseExams} from "../../../actions/CourseAction";
import {CircularProgress} from "@material-ui/core";
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

    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector(state => state.CourseReducer);
    const createNewExam = (e) =>{
        e.preventDefault()
        navigate(`/courses/${course_id}/create-exam`)
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