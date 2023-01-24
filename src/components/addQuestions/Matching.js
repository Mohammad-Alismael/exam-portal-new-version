import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import withAddQuestion from "./withAddQuestion";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { SET_ANSWER_KEY, SET_OPTIONS } from "../../store/actions";
import { OptionEditor } from "./OptionEditor";
import { convertToRaw, EditorState } from "draft-js";
import {calcState, createMarkup} from "../../utils/global/GlobalConstants";
import {convertToHTML} from "draft-convert";
const useStyles = makeStyles((theme) => ({}));
function Matching({
                      questionIndex,
                      updateQuestionArray,
                      updateQuestionOptions,
                  }) {
    const classes = useStyles();
    const [optionValue, setOptionValue] = React.useState("");
    const exam = useSelector((state) => state.ExamReducer);
    const options = exam.questions[questionIndex].options;
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const [openOptionEditor, setOpenOptionEditor] = useState(false);
    const [editorStateOption, setEditorStateOption] = React.useState(
        EditorState.createEmpty()
    );
    const addMatchingOption = (e) => {
        e.preventDefault();
        let id = uuidv4();
        let newObj = {
            id,
            optionValue,
        };
        updateQuestionOptions([...options, newObj]);
        // updateQuestionArray({options: [...options, newObj]})
        setOpenOptionEditor(false)
    };

    const SetCorrectAnswer = (e) => {
        updateQuestionArray({ answerKey: parseInt(e.target.value) });
    };

    const updateQuestionOption = (e) => {
        setEditorStateOption(e);
        const db = JSON.stringify(
            convertToRaw(editorStateOption.getCurrentContent())
        );
        setOptionValue(db);
    };

    useEffect(() => {}, []);
    return (
        <>
            <Grid item xs={4}>
                <FormControl fullWidth variant="standard" margin={"normal"}>
                    <InputLabel id="type">Question Options</InputLabel>
                    <Select
                        labelId="type"
                        id="type"
                        label="Question Options"
                        defaultValue={exam.questions[questionIndex].answerKey}
                        onChange={SetCorrectAnswer}
                    >
                        {options.map((val, index) => {
                            return(
                            <>
                                <MenuItem value={index}>
                                    <div dangerouslySetInnerHTML={createMarkup(convertToHTML(calcState(val["optionValue"]).getCurrentContent()))} value={index} />
                                </MenuItem>
                            </>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            {!exam.isItPreview ? (
                <>
                    <OptionEditor
                        open={openOptionEditor}
                        setEditOpen={setOpenOptionEditor}
                        addOption={addMatchingOption}
                        updateQuestionOption={updateQuestionOption}
                        editorStateOption={editorStateOption}
                    />
                    <Button fullwidth onClick={() => setOpenOptionEditor(true)}>
                        add option
                    </Button>
                </>
            ) : null}
        </>
    );
}

export default Matching;
