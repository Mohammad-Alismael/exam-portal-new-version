import React, {useEffect, useRef} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { toast } from "react-toastify";
import * as Actions from "../../store/actions";
import {connect, useSelector} from "react-redux";
import { Typography } from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    questionContainer: {
        margin: "10% 15%",
        padding: "1rem",
    },
    greenColor: {
        color: 'green',
    },
    redColor: {
        color: 'red',
    }
}));
const Truth = ({questionIndex}) => {
    const {submissions} = useSelector((state) => state.SubmissionsReducer);
    const classes = useStyles();
    const itemsRef = useRef([]);

    useEffect(()=>{
        // if the user checked the correct answer make it green and make the rest black
        // if the user didn't check the correct answer make the user answer red and correct answer green

        const answerKey = parseInt(submissions[questionIndex].answerKey);
        const userAnswer = parseInt(submissions[questionIndex].userAnswer[0]);
        // console.log('userAnswer',answerKey)
        // console.log('answerKey',userAnswer)
        // console.log('case1',userAnswer === answerKey && userAnswer === 0 )
        // console.log('case2',userAnswer === answerKey && userAnswer === 1 )
        // console.log('case3','else')
        if (userAnswer === answerKey && userAnswer === 0){
            itemsRef.current[0].style.color = 'rgb(84,255,56)'
            itemsRef.current[1].style.color = 'rgb(0,0,0)'
        } else if (userAnswer === answerKey && userAnswer === 1){
            itemsRef.current[0].style.color = 'rgb(0,0,0)'
            itemsRef.current[1].style.color = 'rgb(84,255,56)'
        }else{
            itemsRef.current[answerKey].style.color = 'rgb(84,255,56)'
            itemsRef.current[userAnswer].style.color = 'rgb(255,104,56)'
        }
    },[])

    return (
        <RadioGroup style={{ marginLeft: 12 }}>
            <FormControlLabel
                value={0}
                control={<Radio checked={submissions[questionIndex].userAnswer == 0} />}
                label={<Typography ref={el => itemsRef.current[0] = el}>False</Typography>}
            />
            <FormControlLabel
                value={1}
                control={<Radio checked={submissions[questionIndex].userAnswer == 1}/>}
                label={<Typography ref={el => itemsRef.current[1] = el}>True</Typography>}
            />
        </RadioGroup>
    );
};

export default Truth;
