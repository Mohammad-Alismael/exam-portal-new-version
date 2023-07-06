import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchExamsStudent,
  fetchMissedExams,
} from "../../../api/services/Exam";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPendingAndSubmittedExam } from "../../../api/services/UserSubmission";
import { CircularProgress } from "@material-ui/core";
import UpComingContainer from "../../../components/ExamContainers/Containers/UpComingContainer";
import PendingContainer from "../../../components/ExamContainers/Containers/PendingContainer";
import GradedContainer from "../../../components/ExamContainers/Containers/GradedContainer";
import MissedContainer from "../../../components/ExamContainers/Containers/MissedContainer";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: '1.5rem',
    rowGap: 0,
    marginTop: '1rem',
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)",
    },
    overflow: "hidden",
    height: "90vh",
  },
}));

function ExamsPageForStudent(props) {
  const classes = useStyles();
  const { course_id } = useParams();
  const { user } = useSelector((state) => state.UserReducerV2);
  const [upComingExams, setUpcomingExams] = useState([]);
  const [waitingToeGradedExams, setWaitingToeGradedExams] = useState([]);
  const [gradedExams, setGradedExams] = useState([]);
  const [missedExams, setMissedExams] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchExamData(course_id, controller) {
    try {
      const [upcomingExams, pendingAndGradedExams, missedExams] =
        await Promise.all([
          fetchExamsStudent(course_id, controller),
          fetchPendingAndSubmittedExam(course_id, user.user_id, controller),
          fetchMissedExams(course_id, controller),
        ]);

      setUpcomingExams(
        upcomingExams["exams"].concat(upcomingExams["makeupExams"])
      );
      console.log("upcoming exams exams", upcomingExams);

      setGradedExams(pendingAndGradedExams["graded_exams"]);
      setWaitingToeGradedExams(pendingAndGradedExams["pending_exams"]);
      console.log("pending and graded exams", pendingAndGradedExams);

      setMissedExams(missedExams);
      setLoading(false);
      console.log("missed exams =>", missedExams);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchExamData(course_id, controller).then(console.log);
    return () => {
      controller.abort();
    };
  }, [course_id]);

  if (loading) {
    return <CircularProgress size={200} />;
  }
  return (
    <div className={classes.container}>
      <UpComingContainer
        exams={upComingExams}
        title="upcoming exams"
        noExamTitle="no upcoming exams yet"
      />
      <PendingContainer
        exams={waitingToeGradedExams}
        title="waiting to be graded"
        noExamTitle="no pending exams yet"
      />
      <GradedContainer
        exams={gradedExams}
        title="graded exam"
        noExamTitle="no graded exams yet"
      />
      <MissedContainer
        exams={missedExams}
        title="missed exams"
        noExamTitle="no missed exams yet"
      />
    </div>
  );
}

export default ExamsPageForStudent;
