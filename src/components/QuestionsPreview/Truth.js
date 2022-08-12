import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import QuestionHeader from "../QuestionHeader";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as Actions from "../../store/actions";
import {connect, useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        position: 'relative',
        padding: 30,
        marginTop: "2rem",
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
const Truth = ({id}) => {
    const classes = useStyles();
    // const [answerKey,setAnswerKey] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const handleChange = (e) =>{
    //     console.log(e.target)
    //     const deepCopyForAnswerKey = [...answerKey]
    //     deepCopyForAnswerKey[0] = {...deepCopyForAnswerKey[0],correctAnswer:parseInt(e.target.value)}
    //     setAnswerKey([...deepCopyForAnswerKey])
    //     const deepCopy = [...props.questions]
    //     const questionFound = deepCopy.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //
    //     deepCopy[questionFound] = {...deepCopy[questionFound],answerKeys:deepCopyForAnswerKey[0]}
    //     props.setQuestionArray(deepCopy)
    // }
    // useEffect(()=>{
    //     setIsLoading(false)
    //     const questionFound = props.questions.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //     console.log("answer key =>",props.questions[questionFound]['answerKeys'])
    //     setAnswerKey([...props.questions[questionFound]['answerKeys']])
    //     setIsLoading(true)
    // },[])

        return (
            <Paper elevation={3} className={classes.paperStyle}>
                <Grid container spacing={2}>
                    <QuestionHeader
                        id={id}
                    />
                    <RadioGroup style={{marginLeft:12}}>
                        <FormControlLabel
                            value={1}
                            control={<Radio checked={false}/>}
                            label={"True"}
                        />
                        <FormControlLabel
                            value={0}
                            control={<Radio checked={true}/>}
                            label={"False"}
                        />
                    </RadioGroup>
                </Grid>
            </Paper>
        );
};

export default Truth;