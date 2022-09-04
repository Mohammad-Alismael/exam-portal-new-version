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
import {axiosPrivate} from "../../api/axios";
import {CREATE_EXAM} from "../../api/services/RouteNames";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Backdrop} from "@mui/material";
import {CircularProgress} from "@material-ui/core";
import {createExam, updateExamDetails} from "../../api/services/Exam";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {updateExamQuestions} from "../../api/services/Question";
import {
    SET_ASSIGNED_FOR,
    SET_ENDING_AT, SET_EXAM_ANSWER_KEY, SET_EXAM_ANSWER_KEY_AT, SET_EXAM_RANDOMNESS, SET_EXAM_TIMER,
    SET_EXAM_TITLE, SET_NAVIGATION, SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT, SET_STUDENTS
} from "../../store/actions";
import {loginAction} from "../../actions/LoginAcion";
import ResetExamReducer from "../../actions/ResetExamReducer";

const steps = [
    "Exam Settings",
    "Exam Navigation",
    "Exam Timer",
    "Exam Randomness",
    "Answer key settings",
];

export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [postExamLoading, setPostExamLoading] = React.useState(false);
    const { examId } = useParams();
    const exam = useSelector((state) => state.ExamReducer);
    const course = useSelector(state => state.CourseReducer);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    function updateExam() {
        updateExamDetails({...exam, examId}).then(res => {
            toast.info(res['message'])
            if (exam?.questions.length == 0) setPostExamLoading(false)
        }).catch((e) => {
            console.log(e)
            setPostExamLoading(false)
        })
        if (exam?.questions.length !== 0) {
            updateExamQuestions({...exam, examId}).then(res => {
                toast.info(res['message'])
                setPostExamLoading(false)
            }).catch((e) => {
                console.log(e)
                setPostExamLoading(false)
            })
        }
    }

    const postExam = (e) => {
        e.preventDefault()
        setOpen(false);
        setPostExamLoading(true)
        const str = location.pathname
        const words = str.split('/')
        if (words.includes('preview')){
            updateExam();
        }else {
            createExam({...exam, classroom_id: course?.course_info?.id})
                .then(res => {
                    toast.info(res['message'])
                    setPostExamLoading(false)
                    navigate(`/courses/${course?.courseId}/exams`)
                    dispatch(ResetExamReducer())
                }).catch((e) => {
                console.log(e)
                setPostExamLoading(false)
            })
        }

    }

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
                    <DialogActions>
                        <Button onClick={handleClose}>no</Button>
                        <Button onClick={postExam} autoFocus>yes</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Backdrop
                sx={{ color: '#FFCD38', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={postExamLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Box>
    );
}
