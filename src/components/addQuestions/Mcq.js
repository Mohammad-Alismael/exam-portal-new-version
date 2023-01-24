import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {calcState, createMarkup} from "../../utils/global/GlobalConstants";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { OptionEditor } from "./OptionEditor";
import { CHANGE_QUESTION_OPTIONS } from "../../store/actions";
import {convertToHTML} from "draft-convert";
const useStyles = makeStyles((theme) => ({
    textEditorContainer: {
        minHeight: "50px",
        padding: "0.8rem",
        // background: 'blue',
        borderTop: "1px solid #D9D9D9",
    },
}));

const Option = ({ options, index, onClick1, id, questionIndex }) => {
    const [editorState, setEditorState] = React.useState(
        calcState(options[index]["optionValue"])
    );
    const [open, setEditOpen] = React.useState(false);
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();

    const matchAny = () => {
        return options.some(({ optionValue }, index) => {
            return optionValue === editorState;
        });
    };
    const getOptionIndex = () => {
        return options.findIndex((val, index) => val.id == id);
    };
    const updateOption = (e) => {
        e.preventDefault();
        // if option index matches any index text then throw an error
        if (matchAny()) {
            return toast.info("option value already exists!");
        }
        // console.log(
        //     "update =>",
        //     JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        // );
        // console.log("getOptionIndex =>", getOptionIndex());
        const optionIndexFound = getOptionIndex();
        const tmp = [...exam.questions[questionIndex].options];
        tmp[optionIndexFound] = {
            ...tmp[optionIndexFound],
            optionValue: JSON.stringify(
                convertToRaw(editorState.getCurrentContent())
            ),
        };
        console.log("tmp =>", tmp);
        dispatch({
            type: CHANGE_QUESTION_OPTIONS,
            payload: { newOptions: tmp, index: questionIndex },
        });
        setEditOpen(false);
    };
    return (
        <>
            <Grid container alignItems={"center"} xs={12}>
                <Grid container alignItems={"center"} xs={12}>
                    <FormControlLabel value={index} control={<Radio />} label="" />
                    {/*<Editor*/}
                    {/*    wrapperClassName="wrapper-class"*/}
                    {/*    editorClassName="editor-class"*/}
                    {/*    toolbarClassName="toolbar-class"*/}
                    {/*    id={options[index]["id"]}*/}
                    {/*    readOnly={true}*/}
                    {/*    editorState={calcState(options[index]["optionValue"])}*/}
                    {/*    toolbar={{*/}
                    {/*        options: [],*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <div dangerouslySetInnerHTML={createMarkup(convertToHTML(calcState(options[index]["optionValue"]).getCurrentContent()))}></div>
                    <Button onClick={(e) => setEditOpen(true)}>Edit</Button>
                    <Button onClick={onClick1}>Delete</Button>
                </Grid>
            </Grid>
            <OptionEditor
                open={open}
                setEditOpen={setEditOpen}
                addOption={updateOption}
                updateQuestionOption={(e) => setEditorState(e)}
                editorStateOption={editorState}
            />
        </>
    );
};

Option.propTypes = {
    options: PropTypes.any,
    index: PropTypes.any,
    onClick: PropTypes.func,
    onClick1: PropTypes.func,
};

function Mcq({
                 questionIndex,
                 updateQuestionArray,
                 updateQuestionOptions,
                 checkOptionText,
                 setOptionText,
                 deleteOption,
             }) {
    const classes = useStyles();

    const [optionValue, setOptionValue] = React.useState("");
    const [optionImg, setOptionImg] = React.useState(null);
    const exam = useSelector((state) => state.ExamReducer);
    const {options} = exam.questions[questionIndex];

    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    const [editorState, setEditorState] = React.useState(
        calcState(exam.questions[questionIndex]["questionText"])
    );
    const [editorStateOption, setEditorStateOption] = React.useState(
        EditorState.createEmpty()
    );
    const updateQuestionOption = (e) => {
        setEditorStateOption(e);
        const db = JSON.stringify(
            convertToRaw(editorStateOption.getCurrentContent())
        );
        setOptionValue(db);
    };

    const [openOptionEditor, setOpenOptionEditor] = useState(false);

    const addOption = (e) => {
        e.preventDefault();
        let id = uuidv4();
        let newObj = {
            id,
            optionValue,
            img: optionImg,
        };

        if (options.length < 4) {
            if (checkOptionText(optionValue) === -1) {
                updateQuestionOptions([
                    ...exam.questions[questionIndex].options,
                    newObj,
                ]);
                setOptionImg(null);
            }
        } else {
            toast.info("MCQ can only have 4 options max!");
        }
        setOpenOptionEditor(false);
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

    const removeFile = (optionId) => {
        const optionIndex = exam.questions[questionIndex].options.findIndex(
            (option, i) => {
                return option.id == optionId;
            }
        );
        const deepCopy = [...exam.questions[questionIndex].options];
        deepCopy[optionIndex] = { ...deepCopy[optionIndex], img: null };
        updateQuestionOptions(deepCopy);
    };
    const loadOptions = (index) => {
        console.log(options[index]["optionValue"]);
        return (
            <Mcq.Option
                key={options[index]["id"]}
                id={options[index]["id"]}
                options={options}
                index={index}
                questionIndex={questionIndex}
                onClick={() => removeFile(options[index]["id"])}
                onClick1={() => deleteOption(options[index]["id"])}
            />
        );
    };

    useEffect(() => {
        console.log("questionIndex =>",questionIndex)
        console.log(exam.questions[questionIndex])
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
                <RadioGroup
                    onChange={SetCorrectAnswer}
                    value={exam?.questions[questionIndex]?.answerKey}
                >
                    <Grid container>
                        {options.map((val, index) => {
                            return loadOptions(index);
                        })}
                    </Grid>
                    <br />
                    {!exam.isItPreview ? (
                        <>
                            <OptionEditor
                                open={openOptionEditor}
                                setEditOpen={setOpenOptionEditor}
                                addOption={addOption}
                                updateQuestionOption={updateQuestionOption}
                                editorStateOption={editorStateOption}
                            />
                            <Button onClick={() => setOpenOptionEditor(true)}>
                                add option
                            </Button>
                        </>
                    ) : null}
                </RadioGroup>
            </Grid>
        </Grid>
    );
}
Mcq.Option = Option;

export default Mcq;
