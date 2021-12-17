import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import QuestionHeader from "../QuestionHeader";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
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
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    points={props.points}
                    whoCanSee={props.whoCanSee}
                    questionText={props.questionText}
                    isActive={props.isActive}
                    options={props.isActive}
                    selectedType={5}
                />
                <RadioGroup style={{marginLeft:12}}>
                    <FormControlLabel value={1} control={<Radio />} label={"True"} />
                    <FormControlLabel value={0} control={<Radio />} label={"False"} />
                </RadioGroup>
            </Grid>
        </Paper>
    );
};



export default Truth;