import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import {convertToHTML} from "draft-convert";
import {calcState, createMarkup} from "../../utils/global/GlobalConstants";

export function QuestionText({ questionIndex }) {
    const { submissions } = useSelector((state) => state.SubmissionsReducer);
    let html = convertToHTML(calcState(submissions[questionIndex]["questionDetails"].question_text).getCurrentContent());
    return (
        <>
            <Grid item xs={10}>
                <h3 dangerouslySetInnerHTML={createMarkup(html)}></h3>
            </Grid>
        </>
    );
}
