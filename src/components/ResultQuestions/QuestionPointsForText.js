import { useParams } from "react-router-dom";
import { correctQuestionText } from "../../api/services/UserAnswer";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import React from "react";
import {useSelector} from "react-redux";

export function QuestionPointsForText({questionIndex}) {
    const { examId, username } = useParams();
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    const handlePoints = (e) => {
        const points = parseInt(e.target.value);
        const questionId = parseInt(
            submissions[questionIndex]["questionDetails"]["question_id"]
        );
        correctQuestionText(points, questionId,username).catch(console.log);
    };
    return (
        <>
            <Grid item xs={1}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        sx={{ float: "right", flex: 1 }}
                        type="number"
                        fullWidth
                        onChange={handlePoints}
                        variant="standard"
                        inputProps={{
                            min: 1,
                            max: submissions[questionIndex]["questionDetails"].points,
                        }}
                        label={"points"}
                    />
                </FormControl>
            </Grid>
        </>
    );
}
