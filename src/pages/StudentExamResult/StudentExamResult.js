import React, {useEffect, useState} from 'react';
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import {useParams} from "react-router-dom";
import {fetchStudentSubmission} from "../../api/services/UserSubmission";
import {axiosPrivate} from "../../api/axios";
import {useDispatch, useSelector} from "react-redux";
import {SET_ENDING_AT, SET_SUBMISSIONS} from "../../store/actions";
import Question from "../../components/ResultQuestions/Question";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    questionContainer: {
        margin: "5% 15%",
        padding: "1rem",
    },
}));
function StudentExamResult(props) {
    const classes = useStyles();
    const { examId,username } = useParams();
    const [studentId,setStudentId] = useState(null)
    const dispatch = useDispatch();
    const examStudent = useSelector((state) => state.SubmissionsReducer);

    useEffect(()=>{
        const controller = new AbortController();

        fetchStudentSubmission(examId,username,controller).then((data)=>{
            console.log('submission', data)
            dispatch({
                type: SET_SUBMISSIONS,
                payload: {submissions: data},
            });
        })
            .catch(console.log)
        return () => {
            controller.abort();
        };
    },[])
    return (
        <div>
            <ResponsiveAppBar />
            <div className={classes.questionContainer}>
                {
                    examStudent.submissions.map((val,i)=>{
                        return <Question questionIndex={i}/>
                    })
                }
            </div>

        </div>
    );
}

export default StudentExamResult;