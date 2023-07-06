import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import Question from "../components/addQuestions/Question";
import { fetchExamDetails } from "../api/services/Exam";
import { fetchExamQuestions } from "../api/services/Question";
import { CHANGE_PREVIEW } from "../store/actions";
import ExamLinearStepper from "../components/ExamLinearStepper";
import { CircularProgress } from "@material-ui/core";
import { setExamProperties } from "../actions/ExamActions";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "7% 15%",
    float: "center",
  },
  paperStyle: {
    padding: "1rem",
  },
  textField: {
    width: "100%",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
  addQuestionBtn: {
    float: "right",
  },
}));

function EditExam(props) {
  const classes = useStyles();
  const { examId, course_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [examDetails1, setExamDetails1] = useState(false);
  const course = useSelector((state) => state.CourseReducer);
  const exam = useSelector((state) => state.ExamReducer);
  const getQuestionIndex = (uid) => {
    const questionIndexFound = exam?.questions.findIndex((quest, index) => {
      return quest.tmpId === uid;
    });
    return questionIndexFound;
  };

  useEffect(() => {
    dispatch({ type: CHANGE_PREVIEW, payload: { isItPreview: true } });
    const controller = new AbortController();
    async function fetchData() {
      console.log("this course =>", course);
      try {
        const [examDetails, examQuestions] = await Promise.all([
          fetchExamDetails(examId, course_id, controller),
          fetchExamQuestions(examId, controller),
        ]);

        console.log("exam question => ", examQuestions);
        const ar = examQuestions.map(
          ({
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
          }) => {
            return {
              answerKey,
              isActive: is_active,
              options,
              time: time_limit,
              points: points,
              questionText: question_text,
              questionType: question_type,
              tmpId: question_id,
              whoCanSee: who_can_see,
              previewFile: file_path,
            };
          }
        );
        dispatch(setExamProperties(examDetails, ar));
        setLoading(false);
      } catch (err) {
        setExamDetails1(true);
        console.error(err);
        setLoading(false);
      }
    }

    fetchData().then(console.log);

    return () => {
      controller.abort();
    };
  }, [examId, course_id, dispatch]);

  if (examDetails1) {
    return <p style={{ color: "white", textTransform: 'capitalize' }}> no exam found</p>;
  }
  if (loading) {
    return <CircularProgress size={200} />;
  } else
    return (
      <>
        <div className={classes.container}>
          <ExamLinearStepper />
          {exam.questions.map(({ tmpId }, index) => {
            return (
              <Question
                key={tmpId}
                questionIndex={getQuestionIndex(tmpId)}
                uid={tmpId}
              />
            );
          })}
        </div>
      </>
    );
}

export default EditExam;
