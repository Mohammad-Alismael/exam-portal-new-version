import React, {useEffect, useRef, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import * as Actions from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
function Matching({ questionIndex }) {
    const classes = useStyles();
    const [colors, setColors] = React.useState([]);
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    const selectRef = useRef(null);
    const [loading,setLoading] = useState(true)
    const options = submissions[questionIndex]["options"];
    useEffect(() => {

        const answerKey = parseInt(submissions[questionIndex].answerKey);
        const userAnswer = parseInt(submissions[questionIndex].userAnswer[0]);
        if (userAnswer === answerKey) {
            selectRef.current.children[0].style.color = "rgb(84,255,56)";
        } else {
            selectRef.current.children[0].style.color = "rgb(255,104,56)";
        }
        setLoading(false)
    }, []);

    return (
        <>
            <Grid container direction={"row"}>
                <Grid item xs={3} fullwidth style={{ height: "40px" }}>
                    <FormControl fullWidth variant="standard">
                        <Select label="Question Options" sx={{ml:1}} value={submissions[questionIndex].userAnswer[0]} ref={selectRef}>
                            {options.map((val, index) => {
                                return (
                                    <MenuItem

                                        key={index + 1}
                                        value={index}
                                        selected={
                                            parseInt(submissions[questionIndex].userAnswer[0]) === index
                                        }
                                    >
                                        {val["optionValue"]}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7} fullwidth>
                    <Typography
                        style={{ color: "black" }}
                        sx={{ ml: 1, flex: 1 }}
                        variant="h6"
                    >
                        {submissions[questionIndex]["questionDetails"].question_text}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography
                        style={{color: "black"}}
                        sx={{float: "right", flex: 1}}
                        variant="subtitle1"
                    >
                        <b>{submissions[questionIndex].user_points}/{submissions[questionIndex]["questionDetails"].points} points</b>
                    </Typography>
                </Grid>
            </Grid>
        </>

    );
}

export default Matching;
