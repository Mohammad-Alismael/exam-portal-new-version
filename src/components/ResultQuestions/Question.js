import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import Mcq from "./Mcq";
import Text from "./Text";
import CheckBoxComp from "./CheckBoxComp";
import Matching from "./Matching";
import Truth from "./Truth";
import {useDispatch, useSelector} from "react-redux";
import {SET_ENDING_AT, SET_QUESTION_INDEX} from "../../store/actions";
import {makeStyles} from "@material-ui/core/styles";
import SubmissionsReducer from "../../store/reducers/SubmissionsReducer";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
const useStyles = makeStyles((theme) => ({

}));
export default function Question({questionIndex}) {
    const classes = useStyles();
    const examStudent = useSelector((state) => state.SubmissionsReducer);
    const dispatch = useDispatch();

    const chooseQuestionType = (questionType) => {

        if (questionType === 1) {
            return <Mcq questionIndex={questionIndex} />;
        } else if (questionType === 2) {
            return <Text questionIndex={questionIndex} />;
        }
        else if (questionType === 3) {
            return <CheckBoxComp questionIndex={questionIndex} />;
        }
        else if (questionType === 4) {
            return <Matching questionIndex={questionIndex} />;
        } else {
            return <Truth questionIndex={questionIndex} />;
        }
    };
    const handlePoints = (e) =>{
        alert(e.target.value)
    }
    return <Paper elevation={3} className={classes.questionContainer}>
        <Grid container spacing={2} sx={{mt: 2, mb: 2, padding: "0 1rem"}}>
            {examStudent.submissions[questionIndex]['questionDetails']["file_path"] != null ? (
                <Grid xs={12} item>
                    <img
                        style={{maxWidth: "100%", marginBottom: "1rem"}}
                        src={
                            examStudent.submissions[questionIndex]['questionDetails']["previewFile"]["preview"]
                        }
                        alt={"question img"}
                    />
                </Grid>
            ) : null}
            {examStudent.submissions[questionIndex]['questionDetails'].question_type !== 4 ? (
                <Grid item xs={10}>
                    <Typography
                        style={{color: "black"}}
                        sx={{ml: 1, flex: 1}}
                        variant="h6"
                    >
                        {examStudent.submissions[questionIndex]['questionDetails'].question_text}
                    </Typography>
                </Grid>
            ) : null}
            {examStudent.submissions[questionIndex]['questionDetails'].question_type !== 4 ? (
                <Grid item xs={2}>
                    <Typography
                        style={{color: "black"}}
                        sx={{float: "right", flex: 1}}
                        variant="subtitle1"
                    >
                        <b>{examStudent.submissions[questionIndex]?.user_points}/{examStudent.submissions[questionIndex]['questionDetails'].points} points</b>
                    </Typography>
                </Grid>
            ) : null}
            {examStudent.submissions[questionIndex]['questionDetails'].question_type == 2 ? (
                <Grid item xs={2}>
                    <FormControl fullWidth variant="standard">
                        <TextField
                            type="number"
                            fullWidth
                            onChange={handlePoints}
                            variant="standard"
                            inputProps={{ min: 1, max: examStudent.submissions[questionIndex]['questionDetails'].points }}
                            label={"points"}
                        />
                    </FormControl>
                </Grid>
            ) : null}
        </Grid>
        <Grid item xs={12} style={{margin: "0 12px"}}>
            {chooseQuestionType(examStudent.submissions[questionIndex]['questionDetails'].question_type)}
        </Grid>
    </Paper>;
}