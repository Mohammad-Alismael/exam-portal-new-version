import React, { useEffect, useLayoutEffect } from "react";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@mui/material/TextField";
import {connect, useDispatch, useSelector} from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import ExamStudentReducer from "../../store/reducers/ExamStudentReducer";
import {SET_QUESTION_USER_ANSWER} from "../../store/actions";
import {toast} from "react-toastify";
import LoadCheckBoxOptions from "../LoadCheckBoxOptions";
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
        right: 15,
        // paddingTop: 20
    },
}));
const CheckBoxComp = ({ questionIndex }) => {
    const exam = useSelector((state) => state.ExamStudentReducer);
    const options = exam.questions[questionIndex].options;
    const [checkedAr, setCheckedAr] = React.useState([]);
    const dispatch = useDispatch();
    const getOptionIndex = (id) => {
        return options.findIndex((option, index) => {
            return option.id == id
        });
    }
    const handleCheckedAr = (e) =>{
        if (checkedAr.length > exam.questions[questionIndex].maxAnswerCount) return toast.info('you have exceeded answer limit')
        const id = e.target.id
        const checked = e.target.checked
        const optionIndex = getOptionIndex(id)
        // if checked and not in array then add it
        if (checked && !checkedAr.includes(optionIndex)) {
            setCheckedAr([...checkedAr, optionIndex])
            dispatch({
                type: SET_QUESTION_USER_ANSWER,
                payload: {userAnswer:[...checkedAr, optionIndex]},
            });
        }
        // if not checked and in array then remove it
        if (!checked && checkedAr.includes(optionIndex)){
            const new_ar = checkedAr.filter((_id,index)=>{
                return _id !== optionIndex
            })
            dispatch({
                type: SET_QUESTION_USER_ANSWER,
                payload: {userAnswer:[...new_ar]},
            });
            setCheckedAr([...new_ar])
        }
    }
    // const loadCheckboxOptions = (index) => {
    //     return (
    //         <>
    //             <FormControlLabel
    //                 key={index}
    //                 value={index}
    //                 control={<Checkbox id={options[index]["id"]} />}
    //                 label={options[index]["optionValue"]}
    //             />
    //             {options[index]["img"] != null ? (
    //                 <img
    //                     style={{ maxWidth: "100%", outline: "1px solid" }}
    //                     src={options[index]["img"]["preview"]}
    //                     alt={"question"}
    //                 />
    //             ) : null}
    //         </>
    //     );
    // };
    useEffect(() => {}, []);
    return (
        <>
            <Grid item xs={12}>
                <FormGroup onChange={handleCheckedAr}>
                    {options.map((val, index) => {
                        return <LoadCheckBoxOptions options={options} index={index}/>
                    })}
                </FormGroup>
            </Grid>
        </>
    );
};

export default CheckBoxComp;
