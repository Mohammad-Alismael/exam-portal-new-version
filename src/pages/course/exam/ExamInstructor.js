import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import LongMenu from "../../../components/LongMenu";
import { SET_COURSE_EXAMS, SET_QUESTIONS } from "../../../store/actions";
import { deleteExam } from "../../../api/services/Exam";
import GradingIcon from "@mui/icons-material/Grading";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ExamActions } from "../../../actions/ExamActions";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerForOnClick: {
    width: "100%",
    padding: "0.6rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    "&& img": {
      marginLeft: "0.8rem",
    },
    "&& h6": {
      marginLeft: "0.8rem",
    },
  },
}));

function ExamInstructor({ examTitle, examId, startingAt, endingAt }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const course = useSelector((state) => state.CourseReducer);
  const { course_id } = useParams();
  const dispatch = useDispatch();
  const redirect = (e) => {
    e.stopPropagation();
    dispatch({ type: SET_QUESTIONS, payload: { questions: [] } });
    dispatch(ExamActions());
    navigate(`/course-page/${course_id}/edit-exam/${examId}`);
  };
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <Paper elevation={5} className={classes.container}>
      <div className={classes.containerForOnClick} onClick={redirect}>
        <div className={classes.subContainer}>
          <img src="/images/icons/exam_logo.svg" alt="logo" />
          <Typography variant="h6">{examTitle}</Typography>
        </div>
        <div className={classes.subContainer}>
          <div className={classes.time}>
            <Typography variant="caption">
              {moment(startingAt).format("MMMM Do, h:mm:ss a")}
            </Typography>{" "}
            <Typography variant="caption">
              {moment(endingAt).format("MMMM Do, h:mm:ss a")}
            </Typography>
          </div>
        </div>
      </div>
      <LongMenu
        options={["Delete Exam", "See Grades", "Exam Statistics"]}
        icons={[<DeleteOutlineIcon />, <GradingIcon />, <BarChartIcon />]}
        functions={[
          function (e) {
            e.stopPropagation();
            deleteExam(examId).then((data) => {
              const newExamsArray = course.exams.filter(({ exam_id }, i) => {
                return exam_id !== examId;
              });
              dispatch({
                type: SET_COURSE_EXAMS,
                payload: { exams: newExamsArray },
              });
            });
          },
          function (e) {
            e.stopPropagation();
            navigate(`/course-page/${course_id}/grades/${examId}`);
          },
          function (e) {
            e.stopPropagation();
            navigate(`/course-page/${course_id}/statistics/${examId}`);
          },
        ]}
      />
    </Paper>
  );
}

export default ExamInstructor;
