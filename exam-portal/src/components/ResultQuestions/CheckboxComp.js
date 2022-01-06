import React, {useEffect} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {toast} from "react-toastify";
import * as Actions from "../../store/actions";
import {connect} from "react-redux";
import { Typography } from '@mui/material';

function CheckboxComp(props) {
    const [selectedAnswer,setSelectedAnswer] = React.useState([]);

    const handleOnChangePart2 = () =>{
        const deepCopy = [...props.examStudent.answeredQuestions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.questionId === props.questionId)
                return true;
        })


        console.log(JSON.parse(JSON.stringify(getIndex())))
        console.log(JSON.parse(JSON.stringify(getIndex())))
        if(questionFound == -1){

            deepCopy.push({questionId:parseInt(props.questionId), userAnswer: [...getIndex()]})
            props.setAnsweredQuestionsArray(deepCopy)
        }else {
            deepCopy[questionFound] = {questionId:parseInt(props.questionId), userAnswer: [...getIndex()]}
            props.setAnsweredQuestionsArray(deepCopy)
        }
    }

    const getIndex = () => {
        const tmp = []
        for (let i = 0; i < props.options.length; i++) {
            if (selectedAnswer[i]['checked']){
                tmp.push(i)
            }
        }
        return tmp
    }
    const handleChangev2 = (e) =>{
        const deepCopy = [...selectedAnswer]
        const a = parseInt(e.target.value)
        console.log(e.target.checked)
        deepCopy[a] = Object.assign(deepCopy[a],{checked:e.target.checked})
        setSelectedAnswer([...deepCopy])
        console.log(selectedAnswer)
        handleOnChangePart2()
    }
    useEffect(()=>{

        setSelectedAnswer([...props.options])

    },[])
    return (
        <FormGroup>
            {
                props.options.map((val,index)=> {
                    return (<FormControlLabel
                        onChange={handleChangev2}
                        value={index}
                        control={<Checkbox/>}
                        label={<Typography>{val['optionValue']}</Typography>} />)
                })
            }
        </FormGroup>
    );
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
            payload : {questions}})

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckboxComp);