import React, {useState} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Backdrop} from "@mui/material";
import {CircularProgress} from "@material-ui/core";
import {createExam, updateExamDetails} from "../../api/services/Exam";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createQuestionsRequest, updateExamQuestions,} from "../../api/services/Question";
import {ExamActions} from "../../actions/ExamActions";
import {selectExamProperties, selectExamQuestions} from "../../store/selectors/ExamSelectors";
import {steps} from '../../utils/global/GlobalConstants'
import Navigate_ from "../Navigate_";
function HorizontalLinearStepper(props) {
  const { examId, course_id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const exam = useSelector(selectExamProperties);
  const { questions } = useSelector(selectExamQuestions);
  const [open, setOpen] = useState(false);
  const [postExamLoading, setPostExamLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function updateExam() {
    checkForSpecificStudents()
    console.log('updating questions =>' ,{
      questions,
      exam_id: examId,
    });
    try {
      await updateExamDetails({
        ...exam,
        examId,
        courseId: course_id,
      });

      if (!exam || questions.length === 0) {
        setPostExamLoading(false);
        return;
      }
    } catch (e) {
      console.error(e);
      setPostExamLoading(false);
      return;
    }

    try {
      await updateExamQuestions({
        questions,
        exam_id: examId,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setPostExamLoading(false);
    }
  }

  function calcTotalPoints(questions) {
    return questions
        .map(({points}, i) => {
          return points;
        })
        .reduce(
            (previousValue, currentValue, currentIndex) =>
                previousValue + currentValue,
            0
        );
  }

  const checkForSpecificStudents = () => {
    if (exam.whoCanSee === 4 && exam.specificStudents === null) {
      toast.info('you must select one student or exam visibility')
      return;
    }
  }

  const postExam = async (e) => {
    checkForSpecificStudents()
    e.preventDefault();
    setOpen(false);
    setPostExamLoading(true);

    try {
      const path = location.pathname;
      const words = path.split("/");

      if (words.includes("edit-exam")) {
        await updateExam();
        toast.info("Exam updated successfully!");
      } else {
        const totalPoints = calcTotalPoints(questions);
        const res = await createExam({
          ...exam,
          courseId: course_id,
          totalPoints,
        });
        console.log("Exam created =>", res);
        console.log('questions =>', questions)

        const questionsResult = await createQuestionsRequest({
          questions,
          courseId: course_id,
          totalPoints,
          exam_id: res["exam_id"],
        });
        console.log(questionsResult);
        toast.info(res["message"]);
      }

      setPostExamLoading(false);
      navigate(`/course-page/${course_id}/exams`);
      dispatch(ExamActions());
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
            <Typography>
              you have successfully finished exam details, now you can add
              questions
            </Typography>
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ mt: 2, mb: 2, padding: "0 1rem" }}>
            {props.components[activeStep]}
          </Grid>
        )}
        <Navigate_
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          onClick1={handleClickOpen}
        />

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
            <Button onClick={postExam} autoFocus>
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Backdrop
        sx={{ color: "#FFCD38", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={postExamLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default HorizontalLinearStepper;
