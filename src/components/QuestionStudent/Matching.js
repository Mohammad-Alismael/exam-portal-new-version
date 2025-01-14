import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import ExamStudentReducer from "../../store/reducers/ExamStudentReducer";
import {SET_QUESTION_USER_ANSWER} from "../../store/actions";
import {convertToHTML} from "draft-convert";
import {calcState} from "../../utils/global/GlobalConstants";
const useStyles = makeStyles((theme) => ({
}));
function Matching ({questionIndex}) {
    const classes = useStyles();
    const [options,setOptions] = React.useState();
    const dispatch = useDispatch();

    const exam = useSelector((state) => state.ExamStudentReducer);
    const handleChange = (e) => {
        e.preventDefault()

        dispatch({
            type: SET_QUESTION_USER_ANSWER,
            payload: {userAnswer: e.target.value,index:questionIndex},
        });
    }
    useEffect(()=>{
        setOptions([...exam.questions[questionIndex].options])
    },[])
    return (
            <Grid container direction={'row'}>
                <Grid item xs={3} fullwidth style={{height:'40px'}}>
                    <FormControl fullWidth variant="standard" >
                        <Select
                            labelId="type"
                            id="type"
                            label="Question Options"
                            onChange={handleChange}
                        >
                            {
                                exam.questions[questionIndex].options.map((val,index)=>{
                                    return <MenuItem
                                        key={index+1}
                                        value={index}
                                    >{<p dangerouslySetInnerHTML={{__html: convertToHTML(calcState(options[index]["optionValue"]).getCurrentContent())}} />}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7} fullwidth>
                    <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                        {exam.questions[questionIndex].questionText}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{color:"black"}} sx={{ float: 'right', flex: 1 }} variant="h6">
                        {exam.questions[questionIndex].points} points
                    </Typography>
                </Grid>
            </Grid>
        );

}


export default Matching;