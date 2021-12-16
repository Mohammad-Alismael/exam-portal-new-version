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

function Mcq(props) {


    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <QuestionHeader
                points={props.points}
                whoCanSee={props.whoCanSee}
                questionText={props.questionText}
                isActive={props.isActive1}
                options={[]}
            />
        <Grid xs={12} container>
            <Grid item
                  style={{marginLeft:12}}
                  justifyContent="center"
                  alignItems="center"
                  xs={12}>
                <RadioGroup >
                    {
                        props.options.map((val,index)=>{
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
            </Grid>
        </Grid>
        </Paper>
        )

}

Mcq.propTypes = {};

export default Mcq;