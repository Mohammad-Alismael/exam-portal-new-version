import React from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import Exam from "./Exam";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '7% 20%',
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
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector(state => state.CourseReducer);
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <div className={classes.createExamBtnContainer}>
                    <Button className={classes.createExamBtn} variant="contained" color="warning" endIcon={<AddIcon />}>
                        <b>create exam</b>
                    </Button>
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