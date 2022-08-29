import React, {useEffect, useLayoutEffect, useRef} from "react";
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
const CheckBoxComp = ({ questionIndex,updateQuestionArray,updateQuestionOptions,selectedOptionForCheckbox,getOptionIndex,checkOptionText,setOptionText,deleteOption }) => {
    // const [options, setOptions] = React.useState([]);
    const [checkedAr, setCheckedAr] = React.useState([]);

    const [optionValue, setOptionValue] = React.useState("");
    const [optionImg, setOptionImg] = React.useState(null);
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const itemsRef = useRef([]);
    const options = exam.questions[questionIndex].options
    const answerKeyArray = exam?.questions[questionIndex].answerKey
    let selectedAnswerKeyOptions = options.map((val,i)=>{
        return answerKeyArray.includes(i)
    })
    const [boolAr, setBoolAr] = React.useState([selectedAnswerKeyOptions]);
    const handleCheckBoxOptions = (e) => {
        e.preventDefault();
        let id = uuidv4();
        let newObj = {
            id,
            optionValue,
            img: optionImg,
        };

        if (checkOptionText(optionValue) === -1){
            updateQuestionOptions( [...options, newObj])
            // updateQuestionArray({ options: });
            setOptionImg(null);
        }

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
            <Grid container direction="row"
                  justifyContent="flex-start"
                  alignItems="center">
                <FormControlLabel
                    key={index}
                    value={index}
                    control={
                        <Checkbox
                            onChange={handleChangebox}
                            checked={!!boolAr[index]}
                            id={options[index]["id"]}
                        />
                    }
                    label=""
                />
                <TextField
                    id={options[index]["id"]}
                    label={"option " + (index + 1)}
                    size="small"
                    variant="filled"
                    value={options[index]['optionValue']}
                    onChange={setOptionText}
                />
                <Tooltip title={'delete option'}>
                    <IconButton>
                        <CloseIcon onClick={()=>(deleteOption(options[index]["id"]))} />
                    </IconButton>
                </Tooltip>
                {options[index]["img"] != null ? (
                    <Grid xs={12} item>
                        <Badge badgeContent={'x'} color="primary" onClick={()=>(removeFile(options[index]["id"]))} sx={{cursor: 'pointer'}}>
                            <img style={{width: '100%',outline: '1px solid'}} src={options[index]["img"]["preview"]} alt={"question"} />
                        </Badge>
                    </Grid>
                ) : null}
            </Grid>
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
        const answerKeyArray = exam?.questions[questionIndex].answerKey
        const a = options.map((val,i)=>{
            return answerKeyArray.includes(i)
        })
        setBoolAr(a)
        setCheckedAr([...answerKeyArray])
    }, []);
    return (
        <>
            <Grid item xs={12}>
                <FormGroup onChange={handleCheckedAr}>
                    {options.map((val, index) => {
                        return loadCheckboxOptions(index);
                    })}
                </FormGroup>
            </Grid>
            {!exam.isItPreview ? <Grid item xs={7}>
                <TextField
                    id="filled-basic"
                    label="Add Option"
                    size="small"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setOptionValue(e.target.value)}
                />
            </Grid> : null }
            {!exam.isItPreview ? <Tooltip title="upload option file">
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
            </Tooltip> : null}
            {!exam.isItPreview ? <Grid item xs={4}>
                <Button
                    fullWidth
                    variant="contained"
                    size={"medium"}
                    sx={{ mb: 2 }}
                    onClick={handleCheckBoxOptions}
                >
                    submit option
                </Button>
            </Grid> : null}
        </>
    );
};

export default CheckBoxComp;
