import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@mui/material/TextField";
import { connect, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {SET_ANSWER_KEY, SET_OPTIONS} from "../../store/actions";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import {Badge} from "@mui/material";
import {toast} from "react-toastify";
import {OptionEditor} from "./OptionEditor";
import {convertToRaw, EditorState} from "draft-js";
import * as PropTypes from "prop-types";
import {calcState, createMarkup} from "../../utils/global/GlobalConstants";
import {convertToHTML} from "draft-convert";

const Option = (props) => {
    return <Grid container direction="row"
                 justifyContent="flex-start"
                 alignItems="center">
        <FormControlLabel

            value={props.value}
            control={
                <Checkbox
                    onChange={props.onChange}
                    checked={!!props.boolAr[props.value]}
                    id={props.options[props.value]["id"]}
                />
            }
            label=""
        />
        <div dangerouslySetInnerHTML={createMarkup(convertToHTML(calcState(props.options[props.value]["optionValue"]).getCurrentContent()))}></div>
        <Button>Edit</Button>
        <Button>Delete</Button>
    </Grid>;
}

Option.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    boolAr: PropTypes.arrayOf(PropTypes.any),
    options: PropTypes.any,
    onChange1: PropTypes.any,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};
const CheckBoxComp = ({ questionIndex,updateQuestionArray,updateQuestionOptions,selectedOptionForCheckbox,getOptionIndex,checkOptionText,setOptionText,deleteOption }) => {
    const [checkedAr, setCheckedAr] = React.useState([]);
    const [optionValue, setOptionValue] = React.useState("");
    const [optionImg, setOptionImg] = React.useState(null);
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const options = exam.questions[questionIndex].options
    const answerKeyArray = exam?.questions[questionIndex].answerKey == null ? [] : exam?.questions[questionIndex].answerKey
    let selectedAnswerKeyOptions = options.map((val,i)=>{
        return answerKeyArray.includes(i)
    })
    const [boolAr, setBoolAr] = React.useState([selectedAnswerKeyOptions]);
    const [openOptionEditor, setOpenOptionEditor] = useState(false);
    const [editorStateOption, setEditorStateOption] = React.useState(
        EditorState.createEmpty()
    );

    const addOption = (e) => {
        e.preventDefault();
        let id = uuidv4();
        let newObj = {
            id,
            optionValue
        };

        if (checkOptionText(optionValue) === -1){
            updateQuestionOptions( [...options, newObj])
            // updateQuestionArray({ options: });
            setOptionImg(null);
        }
        setOpenOptionEditor(false);

    };

    const handleCheckedAr = (e) =>{
        const id = e.target.id
        const checked = e.target.checked
        const optionIndex = getOptionIndex(id)
        // if checked and not in array then add it
        if (checked && !checkedAr.includes(optionIndex)) {
            setCheckedAr([...checkedAr, optionIndex])
            updateQuestionArray({answerKey:[...checkedAr, optionIndex]})
        }
        // if not checked and in array then remove it
        if (!checked && checkedAr.includes(optionIndex)){
            const new_ar = checkedAr.filter((_id,index)=>{
                return _id !== optionIndex
            })
            updateQuestionArray({answerKey:[...new_ar]})
            setCheckedAr([...new_ar])
        }
    }
    const handleChangebox = (e)=>{
        const id = e.target.id
        const index = getOptionIndex(id)
        const checked = e.target.checked
        const deepCopy = [...boolAr]
        deepCopy[index] = !boolAr[index]
        setBoolAr(deepCopy)
    }

    const loadCheckboxOptions = (index) => {
        return (
            <Option key={index} value={index} onChange={handleChangebox} boolAr={boolAr} options={options}
                    onChange1={setOptionText} onClick={() => (deleteOption(options[index]["id"]))}
                    onClick1={() => (removeFile(options[index]["id"]))}/>
        );
    };
    const removeFile = (optionId) => {
        const optionIndex = options.findIndex((option,i)=>{
            return option.id === optionId
        })
        const deepCopy = [...options]
        deepCopy[optionIndex] = {...deepCopy[optionIndex], img : null}
        updateQuestionOptions(deepCopy)
    }
    const optionFile = (e) => {
        e.preventDefault();
        let myFiles = e.target.files;
        Object.assign(myFiles[0], {
            preview: URL.createObjectURL(myFiles[0]),
        });
        setOptionImg(myFiles[0]);
    };
    useEffect(() => {
        const selectedOptions = options.map((val,i)=>{
            return answerKeyArray.includes(i)
        })
        setBoolAr(selectedOptions)
        setCheckedAr([...answerKeyArray])
    }, []);
    const updateQuestionOption = (e) => {
        setEditorStateOption(e);
        const db = JSON.stringify(
            convertToRaw(editorStateOption.getCurrentContent())
        );
        setOptionValue(db);
    };
    return (
        <>
            <Grid item xs={12}>
                <FormGroup onChange={handleCheckedAr}>
                    {options.length !== 0 && options.map((val, index) => {
                        return loadCheckboxOptions(index);
                    })}
                </FormGroup>
            </Grid>
            {!exam.isItPreview ?
                <>
                    <OptionEditor
                        open={openOptionEditor}
                        setEditOpen={setOpenOptionEditor}
                        addOption={addOption}
                        updateQuestionOption={updateQuestionOption}
                        editorStateOption={editorStateOption}
                    />
                    <Button fullwidth onClick={() => setOpenOptionEditor(true)}>
                        add option
                    </Button>
                </>
                : null}
        </>
    );
};
CheckBoxComp.Option = Option;
export default CheckBoxComp;
