import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import * as PropTypes from "prop-types";
import React from "react";

export default function ExamTimer(props) {
    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">setting a timer for each
                question</FormLabel>
            <RadioGroup defaultValue="0" name="radio-buttons-group">
                <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={0} control={<Radio/>} label="No"/>
            </RadioGroup>
            <TextField
                label="mins per question"
                type="number"
                fullWidth
                // value={props.value}
                inputProps={{min: 1}}
                // onChange={props.onChange}
                required
                variant="outlined"/>
        </FormControl>
    </Grid>;
}

ExamTimer.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
};