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
import {connect, useSelector} from "react-redux";
import withQuestion from "./withQuestion";
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
function Mcq({ questionIndex }) {
    const classes = useStyles();
    const [options, setOptions] = React.useState([]);
    const exam = useSelector((state) => state.ExamReducer);

    const loadOptions = (index) => {
        return (
            <Grid item xs={12} fullwidth>
                <FormControlLabel
                    value={options[index]['optionValue']}
                    control={<Radio />}
                    label={options[index]['optionValue']}
                />
                {options[index]["img"] != null ? (
                    <img style={{width: '100%',outline: '1px solid'}} src={options[index]["img"]["preview"]} alt={"question"} />
                ) : null}
            </Grid>
        );
    };
    useEffect(()=>{
        // console.log(exam.questions[questionIndex])
        setOptions([...exam.questions[questionIndex].options])
    },[])
    return (
        <Grid xs={12} container>
            <Grid
                item
                style={{ marginLeft: 12 }}
                justifyContent="center"
                alignItems="center"
                xs={12}
            >
                <RadioGroup>
                    <Grid container style={{ padding: "10px 0" }}>
                        {options.map((val, index) => {
                            return loadOptions(index);
                        })}
                    </Grid>
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default Mcq;
