import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
const Truth = () => {
    return (
        <RadioGroup style={{marginLeft:12}}>
            <FormControlLabel value={1} control={<Radio />} label={"True"} />
            <FormControlLabel value={0} control={<Radio />} label={"False"} />
        </RadioGroup>
    );
};

export default Truth;