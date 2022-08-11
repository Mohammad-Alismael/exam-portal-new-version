import React from "react";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import {Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "7% 25%",
        float: "center",
    },
    paperStyle: {
        padding: '1rem',
    },
    textField: {
        width: "100%",
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
    },
}));

function CreateExamPage(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [questions, setQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [examTitle, setExamTitle] = React.useState("");
    const [examPoints, setExamPoints] = React.useState(0);
    const [startingAt, setStartingAt] = React.useState(0);
    const [endingAt, setEndingAt] = React.useState(0);
    const updateStartingAt = (e) => {
        setStartingAt(Date.parse(e.target.value));
    };
    const updateEndingAt = (e) => {
        setEndingAt(Date.parse(e.target.value));
    };
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <Paper elevation={5} className={classes.paperStyle}>
                    <Typography variant="h4" align={'left'}>
                        <b>Exam Details</b>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="filled-basic"
                                label="exam title"
                                fullWidth
                                required
                                value={examTitle}
                                onChange={(e) => setExamTitle(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">setting an test for all students</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>undergraduate</MenuItem>
                                    <MenuItem value={20}>graduate</MenuItem>
                                    <MenuItem value={30}>both</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Ending At"
                                type="datetime-local"
                                fullWidth
                                defaultValue={new Date(startingAt).toISOString().slice(0, 16)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateStartingAt}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Ending At"
                                type="datetime-local"
                                fullWidth
                                onChange={updateEndingAt}
                                defaultValue={new Date(endingAt).toISOString().slice(0, 16)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Exam/Quiz navigation</FormLabel>
                                <RadioGroup defaultValue="1" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">setting a timer for each question</FormLabel>
                                <RadioGroup defaultValue="0" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                </RadioGroup>
                                <TextField
                                    label="mins per question"
                                    type="number"
                                    fullWidth
                                    value={examPoints}
                                    inputProps={{ min: 1}}
                                    onChange={(e) =>(setExamPoints(parseInt(e.target.value)))}
                                    required
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Visible to student before the time exam</FormLabel>
                                <RadioGroup defaultValue="1" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                </RadioGroup>
                                <TextField
                                    label="mins per question"
                                    type="number"
                                    fullWidth
                                    value={examPoints}
                                    inputProps={{ min: 1}}
                                    onChange={(e) =>(setExamPoints(parseInt(e.target.value)))}
                                    required
                                    variant="outlined" />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Show questions randomly</FormLabel>
                                <RadioGroup defaultValue="1" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Posting answer key right after the students finishes the exam</FormLabel>
                                <RadioGroup defaultValue="1" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                </RadioGroup>
                                <TextField
                                    id="datetime-local"
                                    label="posting answer key At"
                                    type="datetime-local"
                                    fullWidth
                                    onChange={updateEndingAt}
                                    defaultValue={new Date(endingAt).toISOString().slice(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>

                    </Grid>

                </Paper>
            </div>
        </>
    );
}

export default CreateExamPage;
