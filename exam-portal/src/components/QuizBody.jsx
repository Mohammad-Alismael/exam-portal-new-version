import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@mui/material/Paper";
import {toast} from "react-toastify";
import {makeStyles} from "@material-ui/core/styles";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {withMobileDialog} from "@material-ui/core";
import {connect} from "react-redux";
import * as Actions from "../store/actions";
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
function  QuizBody(props) {
    const classes = useStyles();
    const [selectedType, setSelectedType] = React.useState('');
    const [options,setOptions] = React.useState([]);
    const [checkbox,setCheckbox] = React.useState([]);
    const [matchingOptions,setMatchingOptions] = React.useState([]);
    const [matchingOptionText,setMatchingOptionText] = React.useState("");
    const [addOptionText, setAddOptionText] = React.useState('');
    const [checkboxText, setCheckboxText] = React.useState('');
    const handleChange = (event) => {
        setSelectedType(event.target.value);
        if(props.questions[props.id - 1] == null){
            props.appendQuestion({id: props.id})
        }else {
            let questionObject = props.questions[props.id - 1]
            questionObject["questionText"] = event.target.value
            console.log(props.questions)
            console.log(selectedType)
            if (selectedType == 4) {
                questionObject["options"] = ["True", "False"]
            }
        }
    };
    const appendQuestion = (e) =>{
        if(props.questions[props.id - 1] == null){
            props.appendQuestion({id: props.id})
        }else {
            let questionObject = props.questions[props.id - 1]
            questionObject["questionText"] = e.target.value
            props.questions[props.id - 1] = questionObject
            console.log(props.questions)
        }
    }
    const setOptionText = (e) =>{
        const optionText = e.target.value;
        // setOptions([...options,optionText])
        setAddOptionText(optionText)

    }

    const addOption = (e) => {
        if (options.length < 4) {
            setOptions([...options, addOptionText]);
            let questionObject = props.questions[props.id - 1]
            questionObject["options"] = [...options, addOptionText]
            props.questions[props.id - 1] = questionObject


        }else
            toast("4 options maximum")
        console.log(props.questions)
    }

    const deleteQuestionContainer = (e) => {

    }

        return (
            <Paper elevation={3} className={classes.paperStyle}>

                <Grid container spacing={2}>
                    <Grid xs={6} item>
                        <TextField id="filled-basic"
                                   label="question text"
                                   size="small"
                                   fullWidth
                                   onChange={appendQuestion}
                                   disabled={selectedType == 4 ? true : false}
                                   variant="standard" />

                    </Grid>
                    {/*<ImageIcon style={{ height: '40px', width: '40px',margin: '20px 5px',cursor: "pointer" }}/>*/}
                    <Grid xs={3} item>
                        <FormControl fullWidth variant="standard" >
                            <InputLabel id="type">Question Type</InputLabel>
                            <Select
                                labelId="type"
                                id="type"
                                value={selectedType}
                                label="Question type"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>MCQs</MenuItem>
                                <MenuItem value={2}>Text</MenuItem>
                                <MenuItem value={3}>Checkbox</MenuItem>
                                <MenuItem value={4}>Matching</MenuItem>
                                <MenuItem value={5}>True/False</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={3} item>
                        <TextField
                            className={classes.dropDown}
                            type="number"
                            fullWidth
                            variant="standard"
                            inputProps={{ min: 1, max: 100 }}
                             label={"points"}/>
                    </Grid>
                    <Grid xs={12} container>
                        {selectedType == 1 ?
                            <Grid item
                                  style={{marginLeft:12}}
                                  justifyContent="center"
                                  alignItems="center"
                                  xs={12}>
                                <RadioGroup >
                                    {
                                        options.map((val,index)=>{
                                            return <FormControlLabel key={index} value={index} control={<Radio />} label={val} />
                                        })
                                    }
                                    <TextField id="filled-basic"
                                               label="Add Option"
                                               size="small"
                                               variant="standard"
                                               onChange={setOptionText}/>
                                    <br/>
                                    <Button
                                        variant={"outlined"}
                                        variant="contained"
                                        size={"medium"} onClick={addOption}>submit option</Button>
                                </RadioGroup>
                            </Grid> : null}
                        {selectedType == 2 ?
                            <div style={{marginLeft:12}}
                            >
                                <TextField id="filled-basic"
                                           label="long answer text"
                                           fullWidth
                                           disabled
                                           variant="standard" />
                            </div> : null}
                        {selectedType == 3 ?
                            <Grid container
                                  style={{marginLeft:12}}
                            >

                                {
                                    checkbox.map((val,index)=>{
                                        return  <Grid item xs={6}>
                                            <FormControlLabel control={<Checkbox />} label={val} />
                                        </Grid>
                                    })
                                }

                                <TextField id="filled-basic"
                                           label="Add Option"
                                           size="small"
                                           variant="standard"
                                           onChange={(e)=>
                                               (setCheckboxText(e.target.value))}/>
                                <br/>
                                <Button
                                    variant={"outlined"}
                                    variant="contained"
                                    size={"medium"} onClick={(e)=>
                                    (setCheckbox([...checkbox,checkboxText]))}>submit option</Button>

                            </Grid> : null}
                        {selectedType == 4 ?
                            <Grid container
                                  style={{marginLeft:12}}
                                  spacing={2}
                            >
                                <Grid item xs={4}>
                                <FormControl fullWidth variant="standard" margin={'normal'}>
                                    <InputLabel id="type">Question Options</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        label="Question Options"
                                    >
                                    {
                                      matchingOptions.map((val,index)=>{
                                         return <MenuItem
                                             value={index}
                                         >{val}</MenuItem>
                                      })
                                    }
                                        <TextField
                                            label="Add Option"
                                            size="small"
                                            fullWidth
                                            onChange={(e)=>
                                                (setMatchingOptionText(e.target.value))}
                                            variant="filled"/>
                                        <Button
                                            variant={"outlined"}
                                            variant="contained"
                                            fullWidth
                                            onClick={(e)=>(setMatchingOptions([...matchingOptions,matchingOptionText]))}
                                            size={"small"}>Add option</Button>
                                    </Select>
                                </FormControl>
                                </Grid>
                                <Grid item xs={7} >
                                    <FormControl fullWidth margin={'normal'}>
                                    <TextField
                                        label="question text"
                                        size="small"
                                        fullWidth
                                        variant="standard"/>
                                    </FormControl>
                                </Grid>
                                <br/>
                                {/*<Grid item xs={12}>*/}
                                {/*    <Button*/}
                                {/*        variant={"outlined"}*/}
                                {/*        variant="contained"*/}
                                {/*        fullWidth*/}
                                {/*        size={"medium"}>Add matching</Button>*/}
                                {/*</Grid>*/}
                            </Grid> : null}
                        {selectedType == 5 ?
                            <RadioGroup style={{marginLeft:12}}
                            >
                                <FormControlLabel value={1} control={<Radio />} label={"True"} />
                                <FormControlLabel value={0} control={<Radio />} label={"False"} />
                            </RadioGroup> : null}
                    </Grid>


                </Grid>

                <Grid xs={12}>
                {/*<DeleteOutlinedIcon*/}
                {/*    onClick={deleteQuestionContainer}*/}
                {/*    className={classes.deleteIcon}/>*/}
                </Grid>
            </Paper>
        );

}

const mapStateToProps = state => {
    return {
        questions : state.ExamReducer.questions,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        appendQuestion: (question) => dispatch({type:Actions.APPEND_QUESTION,
            payload : {question}}),
        setQuestionArray: (questionAr) => dispatch({type:Actions.SET_QUESTION_ARRAY,
            payload : {questionAr}})

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizBody);