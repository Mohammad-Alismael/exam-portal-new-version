import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {SET_EXAM_STUDENT_TIMER, SET_QUESTION_INDEX, SET_QUESTION_TIME_LEFT} from "../../store/actions";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {submitUserAnswer} from "../../api/services/UserAnswer";
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#FFF",
        height: "7vh",
        padding: "0 1rem",
    }
}));
function ExamStudentNavbar(props) {
    const classes = useStyles();
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const [timer,setTimer] = React.useState("");
    const { examId } = useParams();

    const course = useSelector(state => state.CourseReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitExam = (e) => {
        e.preventDefault()
        submitUserAnswer(examStudent?.questions,examId).then((data)=>{
            navigate(`/courses/${course?.courseId}/exams`)
            toast("you have successfully submitted the exam!")
        }).catch((err)=>{
            console.log(err)
        })

    }
    useEffect(() => {
        let interval;
        const { timeLeft } = examStudent?.examDetails || {};

        if (timeLeft) {
            interval = setInterval(() => {
                const hours = parseInt((timeLeft / (1000 * 60 * 60)) % 24, 10);
                const minutes = parseInt((timeLeft / (1000 * 60)) % 60, 10);
                const seconds = parseInt((timeLeft / 1000) % 60, 10);

                setTimer(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                const updatedTimeLeft = timeLeft - 1000;
                dispatch({ type: SET_EXAM_STUDENT_TIMER, payload: { timeLeft: updatedTimeLeft } });

                if (updatedTimeLeft < 0) {
                    submitUserAnswer(examStudent?.questions, examId).then(console.log);
                    navigate(`/courses/${course?.courseId}/exams`);
                    toast("you have finished the exam!");
                    clearInterval(interval);
                }
            }, 999);
        }

        return () => clearInterval(interval);
    }, [examStudent, course, examId, dispatch]);


    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            maxWidth="xl"
            className={classes.container}
        >
            <Typography variant={"h6"}>{examStudent?.examDetails['title'].toUpperCase()}</Typography>
            <Typography>
                <b>{timer}</b> left
            </Typography>
            <Button variant="contained" onClick={submitExam}>
                submit exam
            </Button>
        </Grid>
    );
}

export default ExamStudentNavbar;