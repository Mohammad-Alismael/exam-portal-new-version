import Grid from "@mui/material/Grid";
import React from "react";
import { useSelector } from "react-redux";

export default function QuestionImg({ questionIndex }) {
    const { submissions } = useSelector((state) => state.SubmissionsReducer);

    return (
        <>
            {submissions[questionIndex]["questionDetails"]["file_path"] != null ? (
                <Grid xs={12} item>
                    <img
                        style={{ maxWidth: "100%", marginBottom: "1rem" }}
                        src={
                            submissions[questionIndex]["questionDetails"]["previewFile"][
                                "preview"
                                ]
                        }
                        alt={"question img"}
                    />
                </Grid>
            ) : null}
        </>
    );
}
