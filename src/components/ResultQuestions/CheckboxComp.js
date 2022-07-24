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


    useEffect(()=>{
        setSelectedAnswer([...props.options])
        const tmp = []
        for (let i = 0; i < props.options.length; i++) {

        }

        console.log("hallu => ", props.userAnswer)

    },[])
    return (
        <FormGroup>
            {
                props.options.map((val,index)=> {
                    return (<FormControlLabel
                        value={index}
                        control={<Checkbox />}
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