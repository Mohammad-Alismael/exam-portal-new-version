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
import {createQuestions, createQuestionsRequest, updateExamQuestions} from "../../api/services/Question";
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
    "Answer Key Settings",
];

export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [postExamLoading, setPostExamLoading] = React.useState(false);
    const { examId,course_id } = useParams();
    console.log({examId,course_id})
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

    async function updateExam() {

        try {
            const detailsRes = await updateExamDetails({ ...exam, examId,courseId: course_id });
            // toast.info(detailsRes.message);

            if (!exam || exam.questions.length === 0) {
                setPostExamLoading(false);
                return;
            }
        } catch (e) {
            console.error(e);
            setPostExamLoading(false);
            return;
        }

        try {
            const questionsRes = await updateExamQuestions({ questions: exam.questions, exam_id: examId });
            // toast.info(questionsRes.message);
        } catch (e) {
            console.error(e);
        } finally {
            setPostExamLoading(false);
        }
    }


    function calcTotalPoints() {
        const totalPoints = exam.questions.map(({points}, i) => {
            return points
        }).reduce((previousValue, currentValue, currentIndex) => previousValue + currentValue, 0)
        return totalPoints;
    }

    const postExam = async (e) => {
        e.preventDefault();
        setOpen(false);
        setPostExamLoading(true);
        try {
            const path = location.pathname;
            const words = path.split("/");

            if (words.includes("edit-exam")) {
                await updateExam();
                toast.info("exam update it successfully !");
            } else {
                const totalPoints = calcTotalPoints();
                const res = await createExam({ ...exam, courseId: course_id, totalPoints });
                console.log("exam created =>", res)
                const questionsResult = await createQuestionsRequest({ questions: exam.questions, courseId: course_id, totalPoints, exam_id: res['exam_id'] });
                console.log(questionsResult);
                toast.info(res["message"]);

            }
            setPostExamLoading(false);
            navigate(`/courses/${course_id}/exams`);
            dispatch(ResetExamReducer());
        } catch (e) {
            console.log(e);
            setPostExamLoading(false);
        }
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
                        <Typography>you have successfully finished exam details, now you can add questions</Typography>
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
                        Are you sure you want to post the exam?
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
