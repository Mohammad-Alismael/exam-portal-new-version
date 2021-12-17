import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import QuestionHeader from "../QuestionHeader";
import {makeStyles} from "@material-ui/core/styles";
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
function Mcq(props) {
    const classes = useStyles();
    const [options,setOptions] = React.useState([...props.options])
    const setOptionText = (e) =>{
        let text = e.target.id
        const id = text.substring(text.indexOf(" "));
        const copy = [...options]
        copy[id-1] = e.target.value;
        setOptions(copy,function () {
            console.log("options =>",options)
        })

    }
    const updateQuestion = (e) =>{

    }
    const loadOptions = (index) =>{
        return(
            <>
                <Grid item xs={1}>
                    <FormControlLabel value={options[index]} control={<Radio checked={index == props.correctAnswer ? true : false}/>}  label="" />
                </Grid>
                <Grid item xs={11}>
                <TextField
                    id={"option " + (index+1)}
                    label={"option " + (index+1)}
                    size="small"
                    variant="filled"
                    value={options[index]}
                    onChange={setOptionText}
                    fullWidth
                />
                </Grid>
            </>
        )
    }
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    points={props.points}
                    whoCanSee={props.whoCanSee}
                    questionText={props.questionText}
                    isActive={props.isActive}
                    options={props.isActive}
                    selectedType={1}
                />
                <Grid xs={12} container>
                    <Grid item
                          style={{marginLeft:12}}
                          justifyContent="center"
                          alignItems="center"
                          xs={12}>
                        <RadioGroup >
                            <Grid container style={{padding:'10px 0'}}>
                            {
                                options.map((val,index)=>{
                                    return loadOptions(index)
                                    // return <FormControlLabel key={index} value={index} control={<Radio />} label={val} />
                                })
                            }
                            </Grid>
                            <br/>
                            <Button
                                variant={"outlined"}
                                variant="contained"
                                size={"medium"}
                                onClick={updateQuestion}
                            >update question</Button>
                        </RadioGroup>
                    </Grid>
                </Grid>

            </Grid>
        </Paper>
        )

}

Mcq.propTypes = {};

export default Mcq;