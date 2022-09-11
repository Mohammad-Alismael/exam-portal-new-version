import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";

export function QuestionText({ questionIndex }) {
    const { submissions } = useSelector((state) => state.SubmissionsReducer);

    return (
        <>
            <Grid item xs={10}>
                <Typography
                    style={{ color: "black" }}
                    sx={{ ml: 1, flex: 1 }}
                    variant="h6"
                >
                    {submissions[questionIndex]["questionDetails"].question_text}
                </Typography>
            </Grid>
        </>
    );
}
