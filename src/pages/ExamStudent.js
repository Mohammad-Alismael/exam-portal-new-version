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
import {fetchExamDetailsForStudent} from "../api/services/Exam";
import {fetchExamQuestions} from "../api/services/Question";
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
   useEffect(()=>{
       setIsLoading(true)
       const controller = new AbortController();
       fetchExamDetailsForStudent(examId,controller).then((data)=>{
           console.log('exam details for students',data)
       })
       fetchExamQuestions(examId, controller).then((data) => {
           console.log('exam questions for students', data)
           setQuestions(questions)
           setIsLoading(false)
       })
       return () => {
           controller.abort();
       };
   },[])
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

export default ExamStudent;