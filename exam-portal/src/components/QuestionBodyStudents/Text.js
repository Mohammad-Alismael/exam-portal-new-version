import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function Text(props) {
    return (
        <Grid item xs={12}>
            <TextField id="filled-basic"
                       label="long answer text"
                       fullWidth
                       variant="standard" />
        </Grid>
    );
}

export default Text;