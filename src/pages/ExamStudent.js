import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import moment from "moment";
import Box from "@mui/material/Box";
import QuizHeaderStudent from "../components/QuizHeaderStudent";
import Mcq from "../components/QuestionStudent/Mcq";
import CircularProgress from "@mui/material/CircularProgress";
import {connect} from "react-redux";
import Text from "../components/QuestionStudent/Text";
import Truth from "../components/QuestionStudent/Truth";
import Matching from "../components/QuestionStudent/Matching";
import CheckboxComp from "../components/QuestionStudent/CheckboxComp";
import * as Actions from "../store/actions";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
        position: 'relative'
    },
    textField: {
        width: '100%',
    }

}));

function ExamStudent(props) {
    const classes = useStyles();
    const {examId} = useParams();
    const [examTitle,setExamTitle] = React.useState('');
    const [endingAt,setEndingAt] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [questions,setQuestions] = React.useState([]);
    const getExamInfo = async () => {
        setIsLoading(true)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-exam-id-info', {
                examId
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no exam id found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    useEffect( ()=>{

    },[])

    const chooseBody = (val,index) => {
        if (val['question'].questionType == 1){
            return  <Mcq key={index+1} questionId={val['question'].questionId} options={val['questionOptions']}/>
        }else if(val['question'].questionType == 2){
            return <Text key={index+1} questionId={val['question'].questionId}/>;
        }else if(val['question'].questionType == 3){
            return <CheckboxComp key={index+1} questionId={val['question'].questionId} options={val['questionOptions']}/>
        }else {
            return <Truth questionId={val['question'].questionId}/>
        }
    }

    const submitExam = () => {
        props.examStudent.answeredQuestions.map((val,index)=>{
            console.log(val);
            if(!Array.isArray(val['userAnswer'])){
                if(typeof val['userAnswer'] == "string"){
                    submitQuestionAnswerText(val['questionId'],val['userAnswer'])
                    submitQuestionAnswer(val['questionId'],-1)
                }
                submitQuestionAnswer(val['questionId'],val['userAnswer'])
            }
            else {
                val['userAnswer'].map((val2,index)=>{
                    submitQuestionAnswer(val['questionId'],val2)
                })

            }
        })
        props.resetAnsweredQuestionsArray()
    }
    const submitQuestionAnswer = (questionId,userAnswer) => {
        axios.post('http://localhost:8080/set-user-answer', {
            userId: props.user.user_id,
            questionId,
            userAnswer: parseInt(userAnswer)
        })
    }

    const submitQuestionAnswerText = (questionId,userAnswer) => {
        axios.post('http://localhost:8080/set-user-answer-text', {
            userId: props.user.user_id,
            qid: questionId,
            userAnswer: userAnswer
        })
    }
    if (isLoading){
        return <CircularProgress />
    }else {
        return (
            <>
                <p style={{color: 'white'}}>{examId}</p>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.UserReducer,
        examStudent: state.ExamStudentReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setAnsweredQuestionsArray: (questions) => dispatch({type:Actions.SET_NEW_ANSWER_QUESTION_ARRAY,
            payload : {questions}}),
        resetAnsweredQuestionsArray: (questions) => dispatch({type:Actions.SET_ANSWER_QUESTION_ARRAY,
            payload : {questions:[]}}),

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ExamStudent);