import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
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
function QuestionHeader(props) {
    const classes = useStyles();
    return (
            <>
                <Grid xs={4} item>
                    <TextField
                        id="filled-basic"
                        label="Question text"
                        size="small"
                        value={props.questionText}
                        fullWidth
                        // onChange={appendQuestion}
                        variant="standard" />

                </Grid>
                {/*<ImageIcon style={{ height: '40px', width: '40px',margin: '20px 5px',cursor: "pointer" }}/>*/}
                <Grid xs={3} item>
                    <FormControl fullWidth variant="standard" >
                        <InputLabel id="type">Question Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            disabled={true}
                            value={props.selectedType}
                            label="Question type"
                            // onChange={handleQuestionType}
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
                    <FormControl fullWidth variant="standard" >
                        <InputLabel id="type">Who can see</InputLabel>
                        <Select
                            value={props.whoCanSee}
                            label="Who can see"
                            // onChange={handleWhoCanSee}
                        >
                            <MenuItem value={1}>Undergraduate</MenuItem>
                            <MenuItem value={2}>Graduate</MenuItem>
                            <MenuItem value={3}>Undergraduate & Graduate</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={2} item>
                    <FormControl fullWidth variant="standard" >
                    <TextField
                        type="number"
                        fullWidth
                        value={props.points}
                        // onChange={(e)=>(setPoints(e))}
                        variant="standard"
                        inputProps={{ min: 1, max: 100 }}
                        label={"points"}/>
                    </FormControl>
                </Grid>
            </>
        )

}

QuestionHeader.propTypes = {};

export default QuestionHeader;