import React, { useEffect, useLayoutEffect } from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@mui/material/TextField";
import { connect, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {SET_ANSWER_KEY, SET_OPTIONS} from "../../../store/actions";
import { store } from "../../../index";
import FormGroup from "@mui/material/FormGroup";
const CheckBoxComp = ({ updateQuestionArray }) => {
    const [options, setOptions] = React.useState([
        {
            id: "90cba686-e279-46c4-8f1c-f2ff7435be0b",
            optionValue: "hello",
        },
        {
            id: "5df934ce-4761-442f-9364-bb879b2ffb2f",
            optionValue: "hello3",
        },
        {
            id: "2d36cca9-854b-46d7-961e-fe2ba8d8eaec",
            optionValue: "hello5",
        },
    ]);
    const [checkedAr, setCheckedAr] = React.useState([]);
    const [optionValue, setOptionValue] = React.useState("");
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    const handleCheckBoxOptions = (e) => {
        e.preventDefault();
        let id = uuidv4();
        let newObj = {
            id,
            optionValue,
        };
        updateQuestionArray({options: [...options, newObj]})
        setOptions([...options, newObj]);
    };

    const setOptionText = (e) => {
        const id = e.target.id;
        const optionIndexFound = options.findIndex((option, index) => {
            if (option.id === id) return true;
        });

        const tmp = [...options];
        tmp[optionIndexFound] = {
            ...tmp[optionIndexFound],
            optionValue: e.target.value,
        };

        updateQuestionArray({options: tmp})
        setOptions(tmp);
    };
    const handleCheckedAr = (e) =>{
        const id = e.target.id
        const checked = e.target.checked

        if (checked && !checkedAr.includes(id)) {
            setCheckedAr([...checkedAr, e.target.id])
            updateQuestionArray({answerKey:[...checkedAr, e.target.id]})
        }

        if (!checked && checkedAr.includes(id)){
            const new_ar = checkedAr.filter((_id,index)=>{
                return _id !== id
            })

            updateQuestionArray({answerKey:[...new_ar]})
            setCheckedAr([...new_ar])
        }
    }

    const loadCheckboxOptions = (index) => {
        return (
            <Grid container direction="row">
                <FormControlLabel
                    key={index}
                    value={index}
                    control={
                        <Checkbox
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
                    fullWidth
                />
            </Grid>
        );
    };
    return (
        <>
            <Grid item xs={12}>
                <FormGroup onChange={handleCheckedAr}>
                    {options.map((val, index) => {
                        return loadCheckboxOptions(index);
                    })}
                </FormGroup>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="filled-basic"
                    label="Add Option"
                    size="small"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setOptionValue(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    fullWidth
                    variant="contained"
                    size={"medium"}
                    sx={{ mb: 2 }}
                    onClick={handleCheckBoxOptions}
                >
                    submit option
                </Button>
            </Grid>
        </>
    );
};

export default CheckBoxComp;
