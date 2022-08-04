import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
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
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { withMobileDialog } from "@material-ui/core";
import { connect } from "react-redux";
import * as Actions from "../store/actions";
import CheckBoxComp from "./QuestionsPreview/CheckBoxComp";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: "15vh auto",
        width: "50%",
        margin: "30px auto",
        position: "relative",
    },
    textField: {
        width: "100%",
    },
    dropDown: {
        margin: "50px",
    },
    deleteIcon: {
        float: "right",
        cursor: "pointer",
        position: "absolute",
        top: 15,
        right: 55,
        // paddingTop: 20
    },
}));
function QuizBody(props) {
    const classes = useStyles();
    const [selectedType, setSelectedType] = React.useState("");
    const [whoCanSee, setWhoCanSee] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [checkbox, setCheckbox] = React.useState([]);
    const [matchingOptionText, setMatchingOptionText] = React.useState("");
    const [matchingOptions, setMatchingOptions] = React.useState([]);
    const [addOptionText, setAddOptionText] = React.useState("");
    const [checkboxText, setCheckboxText] = React.useState("");
    const [point, setPoint] = React.useState(0);
    const [checkboxBools, setCheckboxBools] = React.useState([]);
    const setTrueFalseOptions = () => {
        if (props.questions[props.id - 1] == null) {
            props.appendQuestion({ id: props.id });
        }
        let deepCopy = [...props.questions];
        let questionObject = deepCopy[props.id - 1];

        questionObject["options"] = ["True", "False"];
        deepCopy[props.id - 1] = questionObject;
        props.setQuestionArray(deepCopy);
    };
    const handleQuestionType = (event) => {
        setSelectedType(event.target.value);
        let deepCopy = [...props.questions];
        if (props.questions[props.id - 1] == null) {
            props.appendQuestion({ id: props.id });
        } else {
            let questionObject = deepCopy[props.id - 1];
            questionObject["QuestionType"] = event.target.value;
            deepCopy[props.id - 1] = questionObject;
        }
        if (event.target.value == 2) {
            if (deepCopy[props.id - 1]["options"] != null) {
                delete deepCopy[props.id - 1]["options"];
            }
        }
        if (event.target.value == 5) {
            setTrueFalseOptions();
        }
        props.setQuestionArray(deepCopy);
    };
    const handleWhoCanSee = (event) => {
        setWhoCanSee(event.target.value);
        if (props.questions[props.id - 1] == null) {
            props.appendQuestion({ id: props.id, WhoCanSee: event.target.value });
        } else {
            let deepCopy = [...props.questions];
            let questionObject = deepCopy[props.id - 1];
            questionObject["WhoCanSee"] = event.target.value;
            deepCopy[props.id - 1] = questionObject;
            props.setQuestionArray(deepCopy);
        }
    };
    const appendQuestion = (e) => {
        if (props.questions[props.id - 1] == null) {
            props.appendQuestion({ id: props.id });
        } else {
            let deepCopy = [...props.questions];
            let questionObject = deepCopy[props.id - 1];
            questionObject["questionText"] = e.target.value;
            deepCopy[props.id - 1] = questionObject;
            props.setQuestionArray(deepCopy);
        }
    };
    const setOptionText = (e) => {
        const optionText = e.target.value;
        // setOptions([...options,optionText])
        setAddOptionText(optionText);
    };

    const addOption = (e) => {
        if (options.length < 4) {
            setOptions([...options, addOptionText]);
            let deepCopy = [...props.questions];
            let questionObject = deepCopy[props.id - 1];
            questionObject["options"] = [...options, addOptionText];
            deepCopy[props.id - 1] = questionObject;
            props.setQuestionArray(deepCopy);
        } else toast("4 options maximum");
    };

    const handleCheckBoxOptions = (e) => {
        setCheckboxBools([...checkboxBools, false]);
        toast.info(checkboxText);
        setCheckbox([...checkbox, checkboxText]);
        let deepCopy = [...props.questions];
        let questionObject = deepCopy[props.id - 1];
        questionObject["options"] = [...checkbox, checkboxText];
        deepCopy[props.id - 1] = questionObject;
        props.setQuestionArray(deepCopy);
    };

    const addMatchingOptions = (e) => {
        if (!matchingOptions.includes(matchingOptionText)) {
            setMatchingOptions([...matchingOptions, matchingOptionText]);
            let deepCopy = [...props.questions];
            let questionObject = deepCopy[props.id - 1];
            questionObject["options"] = [...matchingOptions, matchingOptionText];
            props.questions[props.id - 1] = questionObject;
            deepCopy[props.id - 1] = questionObject;
            props.setQuestionArray(deepCopy);
        } else toast.info("you already have this option in your list");
    };

    const setPoints = (e) => {
        if (props.questions[props.id - 1] == null) {
            props.appendQuestion({ id: props.id });
        } else {
            let deepCopy = [...props.questions];
            let questionObject = deepCopy[props.id - 1];
            questionObject["points"] = parseInt(e.target.value);
            deepCopy[props.id - 1] = questionObject;
            props.setQuestionArray(deepCopy);
        }
    };

    const correctAnswer = (e) => {
        let deepCopy = [...props.questions];
        let questionObject = deepCopy[props.id - 1];
        questionObject["correctAnswer"] = parseInt(e.target.value);
        deepCopy[props.id - 1] = questionObject;
        props.setQuestionArray(deepCopy);
    };
    const handleChangeCheckBox = (e) => {
        const deepCopyB = [...checkboxBools];
        const i = parseInt(e.target.value);
        toast.info(i);
        deepCopyB[i] = !deepCopyB[i];
        setCheckboxBools(deepCopyB);
        let deepCopy = [...props.questions];
        let questionObject = deepCopy[props.id - 1];

        if (e.target.checked) {
            questionObject["correctAnswer"] = getIndex(checkboxBools);
            deepCopy[props.id - 1] = questionObject;
        } else {
            questionObject["correctAnswer"] = questionObject["correctAnswer"].filter(
                (item) => item !== i
            );
        }
        props.setQuestionArray(deepCopy);
        deepCopyB[i] = !deepCopyB[i];
        setCheckboxBools([...deepCopyB]);
    };
    const getIndex = (array) => {
        console.log(array);
        const tmp = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i]) {
                tmp.push(i);
            }
        }
        console.log(tmp);
        return tmp;
    };
    useEffect(() => {}, []);
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <Grid xs={4} item>
                    <TextField
                        id="filled-basic"
                        label="Question text"
                        size="small"
                        fullWidth
                        onChange={appendQuestion}
                        variant="standard"
                    />
                </Grid>
                {/*<ImageIcon style={{ height: '40px', width: '40px',margin: '20px 5px',cursor: "pointer" }}/>*/}
                <Grid xs={3} item>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="type">Question Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value={selectedType}
                            label="Question type"
                            onChange={handleQuestionType}
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
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="type">Who can see</InputLabel>
                        <Select
                            value={whoCanSee}
                            label="Who can see"
                            onChange={handleWhoCanSee}
                        >
                            <MenuItem value={1}>Undergraduate</MenuItem>
                            <MenuItem value={2}>Graduate</MenuItem>
                            <MenuItem value={3}>Undergraduate & Graduate</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={2} item>
                    <TextField
                        className={classes.dropDown}
                        type="number"
                        fullWidth
                        onChange={(e) => setPoints(e)}
                        variant="standard"
                        inputProps={{ min: 1, max: 100 }}
                        label={"points"}
                    />
                </Grid>

                <Grid xs={12} container>
                    {selectedType == 1 ? (
                        <Grid
                            item
                            style={{ marginLeft: 12 }}
                            justifyContent="center"
                            alignItems="center"
                            xs={12}
                        >
                            <RadioGroup onChange={correctAnswer}>
                                {options.map((val, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            value={index}
                                            control={<Radio />}
                                            label={val}
                                        />
                                    );
                                })}
                                <TextField
                                    id="filled-basic"
                                    label="Add Option"
                                    size="small"
                                    variant="standard"
                                    onChange={setOptionText}
                                />
                                <br />
                                <Button
                                    variant={"outlined"}
                                    variant="contained"
                                    size={"medium"}
                                    onClick={addOption}
                                >
                                    submit option
                                </Button>
                            </RadioGroup>
                        </Grid>
                    ) : null}
                    {selectedType == 2 ? (
                        <Grid xs={12} style={{ marginLeft: 12 }}>
                            <TextField
                                id="filled-basic"
                                label="long answer text"
                                fullWidth
                                disabled
                                variant="standard"
                            />
                        </Grid>
                    ) : null}
                    {selectedType == 3 ? (
                        <Grid container style={{ marginLeft: 12 }}>
                            {checkbox.map((val, index) => {
                                return (
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            key={index}
                                            id={index}
                                            onChange={handleChangeCheckBox}
                                            control={<Checkbox key={index} value={index} />}
                                            label={val}
                                        />
                                    </Grid>
                                );
                            })}

                            <TextField
                                id="filled-basic"
                                label="Add Option"
                                size="small"
                                variant="standard"
                                onChange={(e) => setCheckboxText(e.target.value)}
                            />
                            <br />
                            <Button
                                variant={"outlined"}
                                variant="contained"
                                size={"medium"}
                                onClick={handleCheckBoxOptions}
                            >
                                submit option
                            </Button>
                        </Grid>
                    ) : null}
                    {selectedType == 4 ? (
                        <Grid container style={{ marginLeft: 12 }} spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth variant="standard" margin={"normal"}>
                                    <InputLabel id="type">Question Options</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        onChange={correctAnswer}
                                        label="Question Options"
                                    >
                                        {matchingOptions.map((val, index) => {
                                            return <MenuItem value={index}>{val}</MenuItem>;
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={7}>
                                <FormControl fullWidth margin={"normal"}>
                                    <TextField
                                        label="Add Option"
                                        size="small"
                                        fullWidth
                                        onChange={(e) => setMatchingOptionText(e.target.value)}
                                        variant="standard"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={addMatchingOptions}
                                    size={"small"}
                                >
                                    Add option
                                </Button>
                            </Grid>
                        </Grid>
                    ) : null}
                    {selectedType == 5 ? (
                        <RadioGroup onChange={correctAnswer} style={{ marginLeft: 12 }}>
                            <FormControlLabel value={1} control={<Radio />} label={"True"} />
                            <FormControlLabel value={0} control={<Radio />} label={"False"} />
                        </RadioGroup>
                    ) : null}
                </Grid>
            </Grid>

            <Grid xs={12}></Grid>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        questions: state.CreateReducer.questionsC,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setQuestionArray: (newQuestionArray) =>
            dispatch({
                type: Actions.SET_CREATE_EXAM_ARRAY,
                payload: { newQuestionArray },
            }),
        appendQuestion: (question) =>
            dispatch({ type: Actions.APPEND_QUESTION_EXAM, payload: { question } }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuizBody);
