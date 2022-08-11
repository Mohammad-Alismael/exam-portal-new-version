import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import * as PropTypes from "prop-types";
import React from "react";

export default function ExamAnswerKey(props) {
    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Posting answer key right after the
                students finishes the exam</FormLabel>
            <RadioGroup defaultValue="1" name="radio-buttons-group">
                <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={0} control={<Radio/>} label="No"/>
            </RadioGroup>
            <TextField
                id="datetime-local"
                label="posting answer key At"
                type="datetime-local"
                fullWidth
                // onChange={props.onChange}
                // defaultValue={new Date(props.endingAt).toISOString().slice(0, 16)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
    </Grid>;
}

ExamAnswerKey.propTypes = {
    onChange: PropTypes.func,
    endingAt: PropTypes.number
};