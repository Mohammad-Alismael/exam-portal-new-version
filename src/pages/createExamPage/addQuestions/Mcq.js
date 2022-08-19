import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import * as Actions from "../../../store/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import withAddQuestion from "./withAddQuestion";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
    SET_ANSWER_KEY,
    SET_OPTIONS,
    SET_QUESTIONS,
} from "../../../store/actions";
import { store } from "../../../index";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from '@mui/icons-material/Close';
import {Badge} from "@mui/material";

function Mcq({ questionIndex, updateQuestionArray }) {
    const [options, setOptions] = React.useState([]);
    const [optionValue, setOptionValue] = React.useState("");
    const [optionImg, setOptionImg] = React.useState(null);
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    const addOption = (e) => {
        e.preventDefault();
        let id = uuidv4();
        let newObj = {
            id,
            optionValue,
            img: optionImg,
        };
        if (options.length < 4) {
            updateQuestionArray({ options: [...options, newObj] });
            setOptions([...options, newObj]);
            setOptionImg(null);
        } else {
            toast.info("MCQ can only have 4 options max!");
        }
    };
    const getOptionIndex = (id) => {
        return options.findIndex((option, index) => {
            if (option.id === id) return true;
        });
    }
    const updateQuestionOptions = (newOptionsArray) => {
        updateQuestionArray({ options: newOptionsArray });
        setOptions(newOptionsArray);
    }
    const setOptionText = (e) => {
        const id = e.target.id;
        const optionIndexFound = getOptionIndex(id);
        const tmp = [...options];
        tmp[optionIndexFound] = {
            ...tmp[optionIndexFound],
            optionValue: e.target.value,
        };
        updateQuestionOptions(tmp)
    };
    const SetCorrectAnswer = (e) => {
        updateQuestionArray({ answerKey: parseInt(e.target.value) });
    };
    const optionFile = (e) => {
        e.preventDefault();
        let myFiles = e.target.files;
        Object.assign(myFiles[0], {
            preview: URL.createObjectURL(myFiles[0]),
        });
        setOptionImg(myFiles[0]);
    };
    const deleteOption = (id) => {
        const optionIndexFound = getOptionIndex(id);
        const tmp = [...options];
       tmp.splice(optionIndexFound,1)
        updateQuestionOptions(tmp)
    }
    const removeFile = (optionId) => {
        const optionIndex = options.findIndex((option,i)=>{
            return option.id === optionId
        })
        const deepCopy = [...options]
        deepCopy[optionIndex] = {...deepCopy[optionIndex], img : null}
        setOptions(deepCopy)
    }
    const loadOptions = (index) => {
        return (
            <>
                {options[index]["img"] != null ? (
                    <Grid xs={12} item>
                        <Badge badgeContent={'x'} color="primary" onClick={()=>(removeFile(options[index]["id"]))} sx={{cursor: 'pointer'}}>
                            <img style={{width: '100%',outline: '1px solid'}} src={options[index]["img"]["preview"]} alt={"question"} />
                        </Badge>
                    </Grid>
                ) : null}
                <Grid container alignItems={'center'} xs={12} style={{backgroundColor: 'transparent'}}>
                    <FormControlLabel
                        value={index}
                        control={<Radio />}
                        label=""
                    />
                    <TextField
                        id={options[index]["id"]}
                        label={""}
                        size="small"
                        variant="filled"
                        value={options[index]["optionValue"]}
                        onChange={setOptionText}
                    />
                    <Tooltip title={'delete option'}>
                        <IconButton aria-label="upload picture" component="label">
                            <CloseIcon onClick={()=>(deleteOption(options[index]["id"]))} sx={{ mt: 3}}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </>
        );
    };

    useEffect(() => {
        setOptions([...exam.questions[questionIndex].options]);
    }, []);
    return (
        <Grid xs={12} container>
            <Grid
                item
                style={{ marginLeft: 12 }}
                justifyContent="center"
                alignItems="center"
                xs={12}
            >
                <RadioGroup onChange={SetCorrectAnswer}>
                    <Grid container>
                        {options.map((val, index) => {
                            return loadOptions(index);
                        })}
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={7}>
                            <TextField
                                label={"option value"}
                                size="small"
                                variant="filled"
                                fullWidth
                                onChange={(e) => setOptionValue(e.target.value)}
                            />
                        </Grid>
                        <Tooltip title="upload option file">
                            <IconButton aria-label="upload picture" component="label">
                                <input
                                    onChange={optionFile}
                                    hidden
                                    accept="image/*"
                                    type="file"
                                />
                                <ImageIcon
                                    sx={{
                                        height: "40px",
                                        width: "40px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Grid
                            item
                            xs={4}
                            sx={{ backgroundColor: "transparent", position: "relative" }}
                        >
                            <Button
                                sx={{ position: "absolute", bottom: 10 }}
                                variant="contained"
                                size={"medium"}
                                fullWidth
                                onClick={addOption}
                            >
                                add option
                            </Button>
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default Mcq;
