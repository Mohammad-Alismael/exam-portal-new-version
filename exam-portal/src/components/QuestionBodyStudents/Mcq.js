import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from "@mui/material/Grid";
import {toast} from "react-toastify";



function Mcq(props) {
    const handleChange = (event) => {
        toast.info(event.target.value);
    };
    return (
        <RadioGroup
            name="radio-buttons-group"
            onChange={handleChange}
        >
            { props.options.map((val,index)=>{
                return (
                    <Grid item fullwidth>
                        <FormControlLabel value={index} control={<Radio />} label={val} />
                    </Grid>
                )
            })

            }

        </RadioGroup>
    );
}

export default Mcq;