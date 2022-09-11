import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";

export default function QuestionPoints({ questionIndex }) {
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    const questionType =
        submissions[questionIndex]["questionDetails"].question_type;
    const userPoints = submissions[questionIndex]?.user_points;
    const questionPoints = submissions[questionIndex]["questionDetails"].points;
    return (
        <>
            <Grid item xs={2}>
                <Typography
                    style={{ color: "black" }}
                    sx={{ float: "right", flex: 1 }}
                    variant="subtitle1"
                >
                    <b>
                        {userPoints}/{questionPoints} points
                    </b>
                </Typography>
            </Grid>
        </>
    );
}
