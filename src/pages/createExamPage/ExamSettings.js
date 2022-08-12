import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExamReducer from "../../store/reducers/ExamReducer";
import {
    SET_ASSIGNED_FOR,
    SET_ENDING_AT,
    SET_EXAM_TITLE,
    SET_STARTING_AT,
} from "../../store/actions";
import {TextField} from "@mui/material";

function ExamSettings(props) {
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();
    const updateStartingAt = (e) => {
        dispatch({
            type: SET_STARTING_AT,
            payload: { startingAt: Date.parse(e.target.value) },
        });
    };
    const updateEndingAt = (e) => {
        dispatch({
            type: SET_ENDING_AT,
            payload: { endingAt: Date.parse(e.target.value) },
        });
    };
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    id="filled-basic"
                    label="exam title"
                    fullWidth
                    required
                    value={exam?.examTitle}
                    onChange={(e) =>
                        dispatch({
                            type: SET_EXAM_TITLE,
                            payload: { examTitle: e.target.value },
                        })
                    }
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        setting an test for all students
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={exam?.assignedFor}
                        label="Age"
                        onChange={(e) =>
                            dispatch({
                                type: SET_ASSIGNED_FOR,
                                payload: { assignedFor: e.target.value },
                            })
                        }
                    >
                        <MenuItem value={1}>undergraduate</MenuItem>
                        <MenuItem value={2}>graduate</MenuItem>
                        <MenuItem value={3}>both</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="datetime-local"
                    label="Starting At"
                    type="datetime-local"
                    fullWidth
                    // defaultValue={new Date(exam?.startingAt).toISOString().slice(0, 16)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={updateStartingAt}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="datetime-local"
                    label="Ending At"
                    type="datetime-local"
                    fullWidth
                    onChange={updateEndingAt}
                    // defaultValue={new Date(exam?.endingAt).toISOString().slice(0, 16)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </>
    );
}

export default ExamSettings;
