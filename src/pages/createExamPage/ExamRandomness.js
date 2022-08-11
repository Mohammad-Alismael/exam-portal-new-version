import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React from "react";

export default function ExamRandomness() {
    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Show questions randomly</FormLabel>
            <RadioGroup defaultValue="1" name="radio-buttons-group">
                <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={0} control={<Radio/>} label="No"/>
            </RadioGroup>
        </FormControl>
    </Grid>;
}