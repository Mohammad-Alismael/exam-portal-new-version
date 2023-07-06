import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {steps} from '../utils/global/GlobalConstants'

function Navigate_({setActiveStep, activeStep, onClick1}) {
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {
        if (activeStep < steps.length)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        else setActiveStep(0);
    };
    return <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
        <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{mr: 1}}
        >
            Back
        </Button>
        <Box sx={{flex: "1 1 auto"}}/>
        {activeStep === steps.length ? (
            <Button onClick={onClick1}>post exam</Button>
        ) : (
            <Button onClick={handleNext}>Next</Button>
        )}
    </Box>;
}


export default memo(Navigate_);