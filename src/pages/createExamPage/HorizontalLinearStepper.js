import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExamSettings from "./ExamSettings";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const steps = [
    "Exam Settings",
    "Exam Navigation",
    "Exam Timer",
    // "Exam Visibility",
    "Exam Randomness",
    "Answer key settings",
];

export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleNext = () => {
        if (activeStep < steps.length)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        else setActiveStep(0);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: "100%" }}>
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
                {activeStep == steps.length ? (
                    <Grid container spacing={2} sx={{ mt: 2, mb: 2, padding: "0 1rem" }}>
                        <Typography>finished exam details, now you can add questions</Typography>
                    </Grid>
                    ): (
                    <Grid container spacing={2} sx={{ mt: 2, mb: 2, padding: "0 1rem" }}>
                        {props.components[activeStep]}
                    </Grid>
                )}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {activeStep === steps.length ? <Button onClick={handleClickOpen}>post exam</Button> :
                        <Button onClick={handleNext}>Next</Button> }
                </Box>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to post the exam?"}
                    </DialogTitle>
                    {/*<DialogContent>*/}
                    {/*    <DialogContentText id="alert-dialog-description">*/}
                    {/*        Let Google help apps determine location. This means sending anonymous*/}
                    {/*        location data to Google, even when no apps are running.*/}
                    {/*    </DialogContentText>*/}
                    {/*</DialogContent>*/}
                    <DialogActions>
                        <Button onClick={handleClose}>no</Button>
                        <Button onClick={handleClose} autoFocus>yes</Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        </Box>
    );
}
