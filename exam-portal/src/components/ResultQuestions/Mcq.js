import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from "@mui/material/Grid";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import * as Actions from "../../store/actions";
import { Typography } from '@mui/material';



function Mcq(props) {
    const [colors,setColors] = React.useState([])
    useEffect(()=>{
        const tmp =[]
        for (let index = 0; index < props.options.length; index++) {
            if (props.userAnswer == index && props.userAnswer != props.correctAnswer){
                tmp.push("green")
            }
            else if (props.userAnswer == index && props.userAnswer == props.correctAnswer){
                tmp.push("red")
            }
            else if (props.correctAnswer == index){
                tmp.push("green")
            }
            else {
                tmp.push("black")
            }
        }
        setColors([...tmp])
    })
    return (
        <RadioGroup
            name="radio-buttons-group"
        >
            { props.options.map((val,index)=>{
                return (
                    <Grid item fullwidth>
                        <FormControlLabel
                            value={index}
                            control={<Radio checked={props.userAnswer == index}/>}
                            label={<Typography color={colors[index]}>{val['optionValue']}</Typography>}
                        />
                    </Grid>
                )
            })

            }

        </RadioGroup>
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
export default connect(mapStateToProps,mapDispatchToProps)(Mcq);