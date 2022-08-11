import React from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import Exam from "./Exam";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '7% 25%',
        float: 'center',
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
    },
    createExamBtnContainer: {
        width: '100%',
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
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector(state => state.CourseReducer);
    const createNewExam = (e) =>{
        e.preventDefault()
        navigate('/create-exam')
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <div className={classes.createExamBtnContainer}>
                    <Tooltip title="create new exam/quiz for this course">
                        <Button onCkick={createNewExam} className={classes.createExamBtn} variant="contained" color="warning" endIcon={<AddIcon />}>
                            <b>create</b>
                        </Button>
                    </Tooltip>
                </div>
                <Exam examTitle={'testing'}/>
                <Exam examTitle={'final cs202'}/>
                <Exam examTitle={'final cs350'}/>
                <Exam examTitle={'midterm cs202'}/>
            </div>
        </>
    );
};

export default ExamPage;