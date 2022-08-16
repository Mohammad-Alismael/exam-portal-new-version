import React, {useEffect, useLayoutEffect} from 'react';
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@mui/material/TextField";
import {connect, useSelector} from "react-redux";
import withQuestion from "./withQuestion";
import FormGroup from "@mui/material/FormGroup";
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
    },
    dropDown: {
        margin:"50px"
    },
    deleteIcon : {
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
        // paddingTop: 20
    }
}));
const CheckBoxComp = ({questionIndex}) => {
    const exam = useSelector((state) => state.ExamReducer);

    const loadCheckboxOptions = (index) =>{
        return (
            <>
                <FormControlLabel
                    key={index}
                    value={index}
                    control={
                        <Checkbox
                            id={exam.questions[questionIndex].options[index]["id"]}
                        />
                    }
                    label={exam.questions[questionIndex].options[index]['optionValue']}

                />
            </>
        );
    }
    useEffect(()=>{

    },[])
    return (
        <>
            <Grid item xs={12}>
                <FormGroup>
                    {exam.questions[questionIndex].options.map((val, index) => {
                        return loadCheckboxOptions(index);
                    })}
                </FormGroup>
            </Grid>
        </>
    );
};

export default CheckBoxComp;