import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";



function Mcq(props) {
    return (
        <>
            { props.options.map((val,index)=>{
                return (
                    <Grid item xs={1}>
                        <FormControlLabel value={val} control={<Radio />} label={val} />
                    </Grid>
                )
            })

            }

        </>
    );
}

export default Mcq;