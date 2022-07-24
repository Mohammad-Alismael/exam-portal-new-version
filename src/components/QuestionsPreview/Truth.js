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
import {connect} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
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
const Truth = props => {
    const classes = useStyles();
    const [answerKey,setAnswerKey] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleChange = (e) =>{
        console.log(e.target)
        const deepCopyForAnswerKey = [...answerKey]
        deepCopyForAnswerKey[0] = {...deepCopyForAnswerKey[0],correctAnswer:parseInt(e.target.value)}
        setAnswerKey([...deepCopyForAnswerKey])
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })

        deepCopy[questionFound] = {...deepCopy[questionFound],answerKeys:deepCopyForAnswerKey[0]}
        props.setQuestionArray(deepCopy)
    }
    useEffect(()=>{
        setIsLoading(false)
        const questionFound = props.questions.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })
        console.log("answer key =>",props.questions[questionFound]['answerKeys'])
        setAnswerKey([...props.questions[questionFound]['answerKeys']])
        setIsLoading(true)
    },[])

    if (!isLoading){
        return <CircularProgress />
    } else
        return (
            <Paper elevation={3} className={classes.paperStyle}>
                <Grid container spacing={2}>
                    <QuestionHeader
                        questionId={props.questionId}
                        correctAnswer={props.answerKey}
                        points={props.points}
                        whoCanSee={props.whoCanSee}
                        questionText={props.questionText}
                        isActive={props.isActive}
                        options={props.isActive}
                        selectedType={5}
                    />
                    <RadioGroup onChange={handleChange} style={{marginLeft:12}}>
                        <FormControlLabel
                            value={1}
                            control={<Radio checked={1 == answerKey[0]['correctAnswer']}/>}
                            label={"True"}

                        />
                        <FormControlLabel
                            value={0}
                            control={<Radio checked={0 == answerKey[0]['correctAnswer'] }/>}
                            label={"False"}
                        />
                    </RadioGroup>
                </Grid>
            </Paper>
        );
};

const mapStateToProps = state => {
    return {
        questions : state.ExamReducer.questions,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        appendQuestion: (question) => dispatch({type:Actions.APPEND_QUESTION,
            payload : {question}}),
        setQuestionArray: (newQuestionArray) => dispatch({type:Actions.SET_NEW_QUESTION_ARRAY,
            payload : {newQuestionArray}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Truth);