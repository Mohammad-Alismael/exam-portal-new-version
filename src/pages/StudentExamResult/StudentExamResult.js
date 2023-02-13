import React, {useEffect, useState} from 'react';
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {fetchStudentSubmission} from "../../api/services/UserSubmission";
import {axiosPrivate} from "../../api/axios";
import {useDispatch, useSelector} from "react-redux";
import {SET_ENDING_AT, SET_SUBMISSIONS} from "../../store/actions";
import Question from "../../components/ResultQuestions/Question";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@mui/material";
import {correctQuestions} from "../../api/services/UserAnswer";
const useStyles = makeStyles((theme) => ({
    questionContainer: {
        margin: "5% 15%",
        padding: "1rem",
    },
    addQuestionBtn: {
        float: "right",
    },
}));

function getQuestions(data) {
    const questionTextType = data.filter((item) => {
        return parseInt(item["questionDetails"]['question_type']) === 2
    })
    const restOfQuestions = data.filter((item) => {
        return parseInt(item["questionDetails"]['question_type']) !== 2
    })
    return {questionTextType, restOfQuestions};
}

function StudentExamResult(props) {
    const classes = useStyles();
    const { examId,username } = useParams();
    const [studentId,setStudentId] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.UserReducerV2);
    const {submissions} = useSelector((state) => state.SubmissionsReducer);
    const updateSubmit = (e) => {
        correctQuestions(examId,username).then((data)=>{
            if (data.response.status === 200){
                navigate('/courses')
            }
        })
            .catch(console.log)
    }
    useEffect(()=>{
        const controller = new AbortController();

        fetchStudentSubmission(examId,username,controller).then((data)=>{
            const {questionTextType, restOfQuestions} = getQuestions(data);
            console.log('wtf', data)
            const insertedData = parseInt(user?.role_id) === 3 ? questionTextType.concat(restOfQuestions) : data
            dispatch({
                type: SET_SUBMISSIONS,
                payload: {submissions: insertedData},
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
                    submissions.map((val,i)=>{
                        return <Question key={i} questionIndex={i}/>
                    })
                }
                {parseInt(user?.role_id) === 3 ?<div>
                    <Button
                        sx={{ mt: 3 }}
                        onClick={updateSubmit}
                        className={classes.addQuestionBtn}
                        variant="contained"
                        color="warning"
                    >
                        <b>update submit</b>
                    </Button>
                </div> : null }
            </div>

        </div>
    );
}

export default StudentExamResult;