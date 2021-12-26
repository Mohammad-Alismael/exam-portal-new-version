import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function Text(props) {
    const [answeredText,setAnsweredText] = React.useState('');
    return (
        <Grid item xs={12}>
            <TextField id="filled-basic"
                       label="long answer text"
                       fullWidth
                       onChange={(e)=>(setAnsweredText(e.target.value))}
                       variant="standard" />
        </Grid>
    );
}

export default Text;