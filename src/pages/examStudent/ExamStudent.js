import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchExamDetailsForStudent } from "../../api/services/Exam";
import { fetchExamQuestions } from "../../api/services/Question";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import {
    SET_EXAM_QUESTIONS_STUDENT,
    SET_QUESTION_INDEX,
    SET_QUESTIONS,
    SET_STUDENT_EXAM_DETAILS
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import QuestionTimer from "./QuestionTimer";
import StudentQuestion from "./StudentQuestion";
import QuestionNavigation from "./QuestionNavigation";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#FFF",
        height: "7vh",
        padding: "0 1rem",
    }
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
}));

function ExamStudent() {
    const classes = useStyles();
    const { examId } = useParams();
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const [isLoading, setIsLoading] = React.useState(false);
    const [examDetails,setExamDetails] = React.useState(null);
    const dispatch = useDispatch();
    const course = useSelector(state => state.CourseReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        fetchExamDetailsForStudent(examId, controller).then((data) => {
            if (data == null) {
                navigate(`/courses/${course?.courseId}/exams`)
                toast("no exam found!")
            }else {
                setExamDetails(data)
                dispatch({
                    type: SET_STUDENT_EXAM_DETAILS,
                    payload: {examDetails: data},
                });
                dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: 0}});
            }
        });
        fetchExamQuestions(examId, controller).then((data) => {
            console.log("exam questions for students", data);
            const questions = data.map(
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
                        userAnswerList: [],
                        whoCanSee: who_can_see,
                        previewFile: file_path,
                    };
                }
            );
            dispatch({ type: SET_EXAM_QUESTIONS_STUDENT, payload: { questions } });
            setIsLoading(true)
        });
        return () => {
            controller.abort();
        };
    }, []);
    if (!isLoading) {
        return <CircularProgress />;
    } else {
        return (
            <>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    maxWidth="xl"
                    className={classes.container}
                >
                    <Typography variant={"h6"}>{examDetails['title'].toUpperCase()}</Typography>
                    <Typography>
                        <b>{(examDetails['ending_at'] - examDetails['starting_at'])/1000} mins</b> left
                    </Typography>
                    <Button variant="contained">
                        submit exam
                    </Button>
                </Grid>
                <BorderLinearProgress
                    variant="determinate"
                    value={((examStudent?.questionIndex + 1) / examStudent.questions.length) * 100}
                    size={40}
                    thickness={4}
                />
                {examStudent.questions[examStudent?.questionIndex].time != null ? <QuestionTimer /> : null}
                <QuestionNavigation />
                <StudentQuestion />
            </>
        );
    }
}

export default ExamStudent;
