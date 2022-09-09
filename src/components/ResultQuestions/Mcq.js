import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { connect, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import { Typography } from "@mui/material";

function Mcq({ questionIndex }) {
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    const itemsRef = useRef([]);
    const options = submissions[questionIndex]["options"];
    useEffect(() => {
        // if the user checked the correct answer make it green and make the rest black
        // if the user didn't check the correct answer make the user answer red and correct answer green

        const answerKey = parseInt(submissions[questionIndex].answerKey);
        const userAnswer = parseInt(submissions[questionIndex].userAnswer[0]);
        console.log('answerKey', answerKey)
        console.log('userAnswer', userAnswer)
        console.log(answerKey === userAnswer)
        function makeTheRestBlack() {
            itemsRef.current.forEach((val, index) => {
                itemsRef.current[index].style.color = "rgb(0,0,0)";
            });
        }

        if (userAnswer === answerKey) {
            itemsRef.current[userAnswer].style.color = "rgb(84,255,56)";
            // itemsRef.current.splice(itemsRef.current[answerKey], 1);
            // makeTheRestBlack();
        } else if (userAnswer !== answerKey) {
            itemsRef.current[userAnswer].style.color = "rgb(255,104,56)";
            itemsRef.current[answerKey].style.color = "rgb(84,255,56)";
        } else {
            makeTheRestBlack();
        }
    }, []);
    return (
        <RadioGroup name="radio-buttons-group">
            {options.map((val, index) => {
                return (
                    <Grid item fullwidth>
                        <FormControlLabel
                            value={index}
                            control={
                                <Radio
                                    checked={parseInt(submissions[questionIndex].userAnswer[0]) === index}
                                />
                            }
                            label={
                                <Typography ref={(el) => (itemsRef.current[index] = el)}>
                                    {options[index]["optionValue"]}
                                </Typography>
                            }
                        />
                    </Grid>
                );
            })}
        </RadioGroup>
    );
}

export default Mcq;
