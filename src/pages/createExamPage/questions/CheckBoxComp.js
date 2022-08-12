import React, {useEffect, useLayoutEffect} from 'react';
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@mui/material/TextField";
import {connect, useSelector} from "react-redux";
import withQuestion from "./withQuestion";
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
    },
    dropDown: {
        margin:"50px"
    },
    deleteIcon : {
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
        // paddingTop: 20
    }
}));
const CheckBoxComp = ({id}) => {
    const classes = useStyles();
    // const [options,setOptions] = React.useState([...props.options]);
    const [selectedAnswer,setSelectedAnswer] = React.useState([]);
    const [boolAr, setBoolAr] = React.useState([]);
    const exam = useSelector((state) => state.ExamReducer);
    // const isChecked = (index) => {
    //     const x = props.correctAnswer.findIndex(function (item) {
    //         return item.correctAnswer == index
    //     })
    //     if(x == -1){
    //         return false
    //     }else {
    //         return true
    //     }
    // }

    // const handleChangev2 = (e) =>{
    //     let deepCopy = [...selectedAnswer];
    //     const i = parseInt(e.target.value);
    //     const deepCopyForBools = [...boolAr];
    //     console.log(e.target.checked)
    //     if (e.target.checked) {
    //         const questionFound = deepCopy.findIndex(function (item, index) {
    //             if (item.correctAnswer == i)
    //                 return true;
    //         })
    //         console.log("deep copy=>", deepCopy)
    //         console.log("checkbox2=>", questionFound)
    //         if (questionFound == -1) {
    //             deepCopy.push({
    //                 id: -1,
    //                 questionId: props.questionId,
    //                 correctAnswer: i
    //             })
    //         } else {
    //             deepCopy[questionFound] = {...deepCopy[questionFound], correctAnswer: i}
    //         }
    //     }else {
    //         deepCopy = deepCopy.filter(item => item.correctAnswer !== i)
    //     }
    //     deepCopyForBools[i] = !deepCopyForBools[i]
    //     setBoolAr(deepCopyForBools);
    //     setSelectedAnswer(deepCopy);
    //     console.log(deepCopy)
    // }
    // const setOptionText = (e) =>{
    //
    //     let id = e.target.id;
    //     let optionValue = e.target.value;
    //     const deepCopy = [...props.questions]
    //     const questionFound = deepCopy.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //
    //     const foundIndex = deepCopy[questionFound]['questionOptions'].findIndex(function(item,index){
    //         if (item.id == id)
    //             return true;
    //     })
    //
    //     deepCopy[questionFound]['questionOptions'][foundIndex] = {...deepCopy[questionFound]['questionOptions'][foundIndex],
    //         optionValue}
    //     deepCopy[questionFound] = {...deepCopy[questionFound]}
    //     props.setQuestionArray(deepCopy)
    //
    // }
    const loadCheckboxOptions = (index) =>{
        return (
            <Grid>
                <Grid item xs={1}>
                    <FormControlLabel
                        // onChange={handleChangev2}
                        key={index}
                        value={index}
                        control={<Checkbox
                            id={exam.questions[id]['options'][index]['id']}
                            // checked={true == boolAr[index]}
                        />} label="" />
                </Grid>
                <Grid item xs={11}>
                    <Grid item xs={11}>
                        <TextField
                            id={exam.questions[id]['options'][index]['id']}
                            label={"option " + (index+1)}
                            size="small"
                            variant="filled"
                            defaultValue={exam.questions[id]['options'][index]['optionValue']}
                            // onChange={setOptionText}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    useEffect(()=>{
        // let tmp = []
        // for (let i= 0 ;i < props.options.length;i++){
        //     tmp[i] = isChecked(i)
        // }
        // setBoolAr(tmp)
        // setSelectedAnswer(props.correctAnswer)
    },[])
    return (

                <Grid xs={12} container>
                    <Grid item
                          style={{marginLeft:12}}
                          justifyContent="center"
                          alignItems="center"
                          xs={12}>
                        {/*<RadioGroup>*/}
                            <Grid container style={{padding:'10px 0'}}>
                                {
                                    exam.questions[id]['options'].map((val,index)=>{
                                        return loadCheckboxOptions(index)
                                    })
                                }
                            </Grid>
                        {/*</RadioGroup>*/}
                    </Grid>
                </Grid>
    );
};

export default withQuestion(CheckBoxComp);