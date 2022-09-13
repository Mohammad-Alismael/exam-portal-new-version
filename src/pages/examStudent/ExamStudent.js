import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchExamDetailsForStudent } from "../../api/services/Exam";
import {fetchExamQuestionsStudent, updateExamQuestionsStudent} from "../../api/services/Question";
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
import ExamStudentNavbar from "./ExamStudentNavbar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
}));

function ExamStudent() {
    const { examId } = useParams();
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const [isLoading, setIsLoading] = React.useState(false);
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
                dispatch({
                    type: SET_STUDENT_EXAM_DETAILS,
                    payload: {examDetails:
                            {...data, timeLeft :parseInt(data['ending_at']) - parseInt(data['starting_at'])}}
                });
                dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: 0}});
            }
        });
        fetchExamQuestionsStudent(examId, controller).then((data) => {
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
                        maxAnswerCount
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
                        maxAnswerCount
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
                <ExamStudentNavbar/>
                <BorderLinearProgress
                    variant="determinate"
                    value={((examStudent?.questionIndex + 1) / examStudent.questions.length) * 100}
                    size={40}
                    thickness={4}
                />
                {/*{examStudent.questions[examStudent?.questionIndex].time != null ? <QuestionTimer /> : null}*/}
                <QuestionNavigation />
                <StudentQuestion />
            </>
        );
    }
}

export default ExamStudent;
