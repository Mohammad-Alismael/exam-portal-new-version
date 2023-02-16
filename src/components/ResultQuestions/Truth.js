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
    const handleRef = (el, index) => {
        itemsRef.current[index] = el;
    };
    useEffect(()=>{
        // if the user checked the correct answer make it green and make the rest black
        // if the user didn't check the correct answer make the user answer red and correct answer green

        const answerKey = parseInt(submissions[questionIndex].answerKey);
        const userAnswer = parseInt(submissions[questionIndex].userAnswer[0]);
        // Update the styles of the answer elements based on the user's answer
        if (userAnswer === answerKey && userAnswer === 0) {
            // If the user's answer is correct and is the first option
            itemsRef.current[0].style.color = "rgb(84,255,56)";
            itemsRef.current[1].style.color = "rgb(0,0,0)";
        } else if (userAnswer === answerKey && userAnswer === 1) {
            // If the user's answer is correct and is the second option
            itemsRef.current[0].style.color = "rgb(0,0,0)";
            itemsRef.current[1].style.color = "rgb(84,255,56)";
        } else {
            // If the user's answer is incorrect
            itemsRef.current[answerKey].style.color = "rgb(84,255,56)";
            itemsRef.current[userAnswer].style.color = "rgb(255,104,56)";
        }
        console.log(submissions[questionIndex])
    },[])

    return (
        <RadioGroup>
            <FormControlLabel
                value={0}
                control={<Radio disabled={true} checked={submissions[questionIndex].userAnswer == 0} />}
                label={<Typography ref={el => handleRef(el,0)}>False</Typography>}
            />
            <FormControlLabel
                value={1}
                control={<Radio disabled={true} checked={submissions[questionIndex].userAnswer == 1}/>}
                label={<Typography ref={el => handleRef(el,1)}>True</Typography>}
            />
        </RadioGroup>
    );
};

export default Truth;
