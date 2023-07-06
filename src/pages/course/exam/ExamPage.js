import React, { useEffect, useState } from "react";
import ExamInstructor from "./ExamInstructor";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExams } from "../../../api/services/Exam";
import { CircularProgress } from "@material-ui/core";
import { SET_COURSE_EXAMS } from "../../../store/actions";
import { ExamActions } from "../../../actions/ExamActions";
import ExamStudent from "./ExamStudent";
import NoExam from "./NoExam";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "7% 25%",
    float: "center",
    cursor: "pointer",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
  createExamBtnContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: "30px",
    margin: "1.2rem",
  },
  createExamBtn: {
    borderRadius: "20px !important",
    float: "right",
  },
}));
const ExamPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { course_id } = useParams();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducerV2);
  const course = useSelector((state) => state.CourseReducer);
  const createNewExam = (e) => {
    e.preventDefault();
    dispatch(ExamActions());
    navigate(`/course-page/${course_id}/create-exam`);
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchExams(course_id, controller)
      .then((data) => {
        console.log("exams", data);
        setExams(data);
        dispatch({ type: SET_COURSE_EXAMS, payload: { exams: data } });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      controller.abort();
    };
  }, [course_id]);
  if (loading) {
    return <CircularProgress size={200} />;
  }
  return (
    <>
      <div className={classes.container}>
        {parseInt(user.role_id) === 3 ? (
          <div className={classes.createExamBtnContainer}>
            <Tooltip title="create new exam/quiz for this course">
              <Button
                data-cy="create-exam-btn"
                onClick={createNewExam}
                className={classes.createExamBtn}
                variant="contained"
                color="warning"
                startIcon={<AddIcon />}
              >
                <b>Exam</b>
              </Button>
            </Tooltip>
          </div>
        ) : null}
        {course?.exams != 0 &&
          course?.exams.map(
            (
              { exam_id, title, starting_at, ending_at, see_result_at },
              index
            ) => {
              return parseInt(user.role_id) === 3 ? (
                <ExamInstructor
                  key={index}
                  examTitle={title}
                  examId={exam_id}
                  startingAt={starting_at}
                  endingAt={ending_at}
                />
              ) : (
                <ExamStudent
                  key={index}
                  examTitle={title}
                  examId={exam_id}
                  startingAt={starting_at}
                  endingAt={ending_at}
                  seeResultAt={see_result_at}
                />
              );
            }
          )}
        {course?.exams == 0 ? <NoExam /> : null}
      </div>
    </>
  );
};

export default ExamPage;
