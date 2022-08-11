import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as PropTypes from "prop-types";
import React from "react";

function ExamSettings(props) {
    return <>
        <Grid item xs={6}>
            <TextField
                id="filled-basic"
                label="exam title"
                fullWidth
                required
                // value={props.value}
                // onChange={props.onChange}
                variant="outlined"
            />
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">setting an test for all students</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                >
                    <MenuItem value={10}>undergraduate</MenuItem>
                    <MenuItem value={20}>graduate</MenuItem>
                    <MenuItem value={30}>both</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField
                id="datetime-local"
                label="Ending At"
                type="datetime-local"
                fullWidth
                // defaultValue={new Date(props.startingAt).toISOString().slice(0, 16)}
                InputLabelProps={{
                    shrink: true,
                }}
                // onChange={props.onChange1}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                id="datetime-local"
                label="Ending At"
                type="datetime-local"
                fullWidth
                // onChange={props.onChange2}
                // defaultValue={new Date(props.endingAt).toISOString().slice(0, 16)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>
    </>;
}

ExamSettings.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    startingAt: PropTypes.number,
    onChange1: PropTypes.func,
    onChange2: PropTypes.func,
    endingAt: PropTypes.number
};

export default ExamSettings