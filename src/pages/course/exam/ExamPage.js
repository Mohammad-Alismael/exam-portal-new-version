import React from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import Exam from "./Exam";
import {useSelector} from "react-redux";
import Container from "@mui/material/Container";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'red',
        padding: '7% 20%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem'
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
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
                <Exam examTitle={'testing'}/>
                <Exam examTitle={'final cs202'}/>
                <Exam examTitle={'final cs350'}/>
                <Exam examTitle={'midterm cs202'}/>
            </div>
        </>
    );
};

export default ExamPage;