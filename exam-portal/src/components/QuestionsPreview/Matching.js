import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import QuestionHeader from "../QuestionHeader";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
function Matching (props) {
    const classes = useStyles();
    const [options,setOptions] = React.useState([...props.options])

    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    points={props.points}
                    whoCanSee={props.whoCanSee}
                    questionText={props.questionText}
                    isActive={props.isActive}
                    options={props.isActive}
                    selectedType={4}
                />
                <Grid item xs={4}>
                    <FormControl fullWidth variant="standard" margin={'normal'}>
                        <InputLabel id="type">Question Options</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            label="Question Options"
                        >
                            {
                                options.map((val,index)=>{
                                    return <MenuItem
                                        value={index}
                                    >{val}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7} >
                    <FormControl fullWidth margin={'normal'}>
                        <TextField
                            label="Add Option"
                            size="small"
                            fullWidth
                            // onChange={(e)=>
//                                (setMatchingOptionText(e.target.value))}
                            variant="standard"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        // onClick={addMatchingOptions}
                        size={"small"}>Add option</Button>
                </Grid>
            </Grid>
        </Paper>
        );

}

export default Matching;