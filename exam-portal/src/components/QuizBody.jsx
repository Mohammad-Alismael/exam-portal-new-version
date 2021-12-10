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
    }
}));
function  QuizBody() {
    const classes = useStyles();
    const [selectedType, setSelectedType] = React.useState('');
    const [options,setOptions] = React.useState([]);
    const [checkbox,setCheckbox] = React.useState([])
    const [addOptionText, setAddOptionText] = React.useState('');
    const [checkboxText, setCheckboxText] = React.useState('');
    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };
    const setOptionText = (e) =>{
        const optionText = e.target.value;
        // setOptions([...options,optionText])
        setAddOptionText(optionText)
    }
    const addOption = (e) => {
        if (options.length < 4)
            setOptions([...options, addOptionText])
        else
            toast("4 options maximum")
    }

        return (
            <Paper elevation={3} className={classes.paperStyle}>

                <Grid container >
                    <Grid xs={7}>
                        <TextField id="filled-basic"
                                   label="question text"
                                   size="small"
                                   fullWidth
                                   variant="filled" />

                    </Grid>
                    <ImageIcon style={{ height: '40px', width: '40px',margin:'5px',cursor: "pointer" }}/>
                    <Grid xs={4}>
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
                    <Grid xs={12}>
                        {selectedType == 1 ?
                            <Grid>
                                <RadioGroup >
                                    {
                                        options.map((val,index)=>{
                                            return <FormControlLabel value={index} control={<Radio />} label={val} />
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
                            <div>
                                <TextField id="filled-basic"
                                           label="long answer text"
                                           fullWidth
                                           disabled
                                           variant="standard" />
                            </div> : null}
                        {selectedType == 3 ?
                            <Grid container>

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
                            <div>
                                <TextField id="filled-basic"
                                           label="long answer text"
                                           fullWidth
                                           variant="standard" />
                            </div> : null}
                        {selectedType == 5 ?
                            <RadioGroup>
                                <FormControlLabel value={1} control={<Radio />} label={"True"} />
                                <FormControlLabel value={0} control={<Radio />} label={"False"} />
                            </RadioGroup> : null}
                    </Grid>
                </Grid>

            </Paper>
        );

}


export default QuizBody;