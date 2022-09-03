import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_QUESTION_INDEX, SET_QUESTION_TIME_LEFT} from "../../store/actions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    questionTimerContainer: {
        backgroundColor: '#fff',
        borderRadius: '5px 0 0 5px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '10px',
        padding: '0.5rem',
        float: 'right',
        marginTop: '2.5rem',
    }
}));
export default function QuestionTimer(props) {
    const classes = useStyles();
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const [timer,setTimer] = React.useState("");
    const dispatch = useDispatch();
    const course = useSelector(state => state.CourseReducer);
    const navigate = useNavigate();

    useEffect(()=>{
        let interval;
        if (examStudent.questions[examStudent?.questionIndex].time != null) {
            let timer_ = examStudent.questions[examStudent?.questionIndex].time;
            let minutes;
            let seconds;
            interval = setInterval(function () {
                minutes = parseInt(timer_ / 60, 10);
                seconds = parseInt(timer_ % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                setTimer(minutes + ":" + seconds)
                dispatch({type: SET_QUESTION_TIME_LEFT, payload: {time: timer_}});
                if (--timer_ < 0) {
                    if (examStudent?.questionIndex < examStudent.questions.length - 1)
                        dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: examStudent.questionIndex + 1}});
                    else{
                        navigate(`/courses/${course?.courseId}/exams`)
                        toast("you have finished the exam!")
                        clearInterval(interval)
                    }

                }

            }, 999);
        }
        return () => clearInterval(interval); //This is important

    },[examStudent?.questionIndex])

    return <div className={classes.questionTimerContainer}>
        <Typography><b>{timer}</b></Typography>
        <img src={"/images/icons/questionTimer.svg"} alt={"questionTime"}/>
    </div>;
}