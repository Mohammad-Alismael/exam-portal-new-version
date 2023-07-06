import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchExamDetailsForStudent } from "../../api/services/Exam";
import { fetchExamQuestionsStudent } from "../../api/services/Question";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import {
  SET_EXAM_QUESTIONS_STUDENT,
  SET_QUESTION_INDEX,
  SET_STUDENT_EXAM_DETAILS,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import StudentQuestion from "./StudentQuestion";
import QuestionNavigation from "./QuestionNavigation";
import ExamStudentNavbar from "./ExamStudentNavbar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    position: "relative",
  },
  numberContainer: {
    borderRadius: "5px",
    backgroundColor: "#D9D9D9",
    display: "inline-block",
    padding: "0.8rem",
    cursor: "pointer",
    "& p": {
      float: "center",
      padding: 0,
      margin: 0,
      fontWeight: "bold",
    },
  },
}));

function ExamStudent() {
  const classes = useStyles();
  const { examId } = useParams();
  const examStudent = useSelector((state) => state.ExamStudentReducer);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.CourseReducer);
  const navigate = useNavigate();
  async function fetchExamData(examId, controller) {
    const examDetails = await fetchExamDetailsForStudent(examId, controller);
    console.log('examDetails', examDetails)
    if (examDetails == null) {
      navigate(`/course-page/${course?.courseId}/exams`);
      toast("no exam found!");
      return;
    }
    dispatch({
      type: SET_STUDENT_EXAM_DETAILS,
      payload: {
        examDetails: {
          ...examDetails,
          timeLeft:
            parseInt(examDetails["ending_at"]) -
            parseInt(examDetails["starting_at"]),
        },
      },
    });
    dispatch({ type: SET_QUESTION_INDEX, payload: { questionIndex: 0 } });

    const examQuestions = await fetchExamQuestionsStudent(examId, controller);
    console.log("exam PreviewQuestions for students", examQuestions);
    const questions = examQuestions.map(
      (
        {
          is_active,
          time_limit,
          points,
          question_text,
          question_type,
          question_id,
          who_can_see,
          file_path,
          options,
          answerKey,
          maxAnswerCount,
        },
        i
      ) => {
        return {
          answerKey,
          isActive: is_active,
          options,
          time: time_limit * 60,
          points: points,
          questionText: question_text,
          questionType: question_type,
          tmpId: question_id,
          userAnswer: null,
          whoCanSee: who_can_see,
          previewFile: file_path,
          maxAnswerCount,
        };
      }
    );
    dispatch({ type: SET_EXAM_QUESTIONS_STUDENT, payload: { questions } });
    setIsLoading(true);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchExamData(examId, controller).then(console.log).catch(console.log);
    return () => {
      controller.abort();
    };
  }, []);
  if (!isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <ExamStudentNavbar />
        <BorderLinearProgress
          variant="determinate"
          value={
            ((examStudent?.questionIndex + 1) / examStudent.questions.length) *
            100
          }
          size={40}
          thickness={4}
        />
        <Grid container spacing={10} style={{ padding: "7% 15%" }}>
          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            xl={3}
            className={classes.innerContainer}
          >
            <QuestionNavigation />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={9}
            xl={9}
            className={classes.innerContainer}
          >
            <StudentQuestion />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ExamStudent;
