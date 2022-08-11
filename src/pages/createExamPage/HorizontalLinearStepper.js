import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExamSettings from "./ExamSettings";
import Grid from "@mui/material/Grid";

const steps = ['Exam Settings', 'Exam Navigation', 'Exam Timer','Exam Visibility','Exam Randomness','Answer key settings'];

export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep < steps.length)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        else
            setActiveStep(0)

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
                <React.Fragment>
                    <Grid container spacing={2} sx={{mt: 2, mb:2,padding: '0 1rem'}}>
                        {props.components[activeStep]}
                    </Grid>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            disabled={activeStep === steps.length}
                            onClick={handleNext}>
                            Next
                        </Button>
                    </Box>
                </React.Fragment>
        </Box>
    );
}
