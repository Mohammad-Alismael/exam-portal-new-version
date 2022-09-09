import React, { useEffect, useRef } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import * as Actions from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { Typography } from "@mui/material";

function CheckBoxComp({ questionIndex }) {
    const [selectedAnswer, setSelectedAnswer] = React.useState([]);
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    const itemsRef = useRef([]);
    const options = submissions[questionIndex]["options"];
    const answerKey = submissions[questionIndex].answerKey;
    const userAnswer = submissions[questionIndex].userAnswer;
    useEffect(() => {
        // if the user checked the correct answer make it green and make the rest black
        // if the user didn't check the correct answer make the user answer red and correct answer green

        console.log("answerKey", answerKey);
        console.log("userAnswer", userAnswer);
        console.log('refs', itemsRef.current)

            // console.log('answerKey', answerKey)
            // console.log('userAnswer', userAnswer)
            // console.log(answerKey === userAnswer)
            function compareList(array1, array2) {
                if (array1.length !== array2.length) return false;
                for (let i = 0; i < array1.length; i++) {
                    if (!array2.includes(array1[i])) return false;
                }
                return true;
            }


            if (compareList(userAnswer,answerKey)) {
                userAnswer.forEach((val,index)=>{
                    itemsRef.current[index].style.color = "rgb(84,255,56)";
                })
            } else{
                
                const green = []
                const red = []
                userAnswer.forEach((val,i)=>{
                    if(userAnswer.includes(answerKey[i])){
                        green.push(answerKey[i])
                    }else{
                        red.push(answerKey[i])
                    }
                })

                answerKey.forEach((val,index)=>{
                    itemsRef.current[val].style.color = "rgb(84,255,56)";

                })

                red.forEach((val,index)=>{
                    itemsRef.current[val].style.color = "rgb(255,104,56)";
                })
            }
    }, []);

    return (
        <FormGroup>
            {options.map((val, index) => {
                return (
                    <FormControlLabel
                        value={index}
                        control={<Checkbox checked={answerKey.includes(index)} />}
                        label={
                            <Typography ref={(el) => (itemsRef.current[index] = el)}>
                                {val["optionValue"]}
                            </Typography>
                        }
                    />
                );
            })}
        </FormGroup>
    );
}

export default CheckBoxComp;
