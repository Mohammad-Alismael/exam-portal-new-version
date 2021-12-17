import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from "@mui/material/Paper";
import QuestionHeader from "../QuestionHeader";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
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
function Text (props) {
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
                    selectedType={2}
                />
                <Grid xs={12} style={{marginLeft:12}}
                >
                    <TextField id="filled-basic"
                               label="long answer text"
                               fullWidth
                               disabled
                               variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={"outlined"}
                        variant="contained"
                        size={"medium"}
                        fullWidth
                        // onClick={updateQuestion}
                    >update question</Button>
                </Grid>
            </Grid>
        </Paper>
    );

}

Text.propTypes = {};

export default Text;