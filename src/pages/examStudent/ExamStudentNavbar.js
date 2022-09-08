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
    useEffect(()=>{
        let interval;
        let timer = examStudent?.examDetails?.timeLeft
        let hours;
        let minutes;
        let seconds;
        interval = setInterval(function () {
            hours = parseInt((timer/(1000*60*60)) % 24)
            minutes = parseInt( (timer/(1000*60)) % 60);
            seconds = parseInt((timer/1000) % 60);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            setTimer(hours + ":" + minutes + ":" + seconds)
            timer = timer - 1000
            dispatch({type: SET_EXAM_STUDENT_TIMER, payload: {timeLeft: timer}});

            if (timer < 0) {
                submitUserAnswer(examStudent?.questions,examId).then(console.log)
                navigate(`/courses/${course?.courseId}/exams`)
                toast("you have finished the exam!")
                clearInterval(interval)
            }

        }, 999);
    return () => clearInterval(interval); //This is important
    },[])

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