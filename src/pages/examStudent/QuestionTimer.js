import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_QUESTION_INDEX} from "../../store/actions";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function QuestionTimer(props) {
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const [timer,setTimer] = React.useState("");
    const dispatch = useDispatch();
    const course = useSelector(state => state.CourseReducer);
    const navigate = useNavigate();

    useEffect(()=>{
        let interval;
        if (examStudent.questions[examStudent?.questionIndex].time != null) {
            let timer_ = examStudent.questions[examStudent?.questionIndex].time * 60;
            let minutes;
            let seconds;
            interval = setInterval(function () {
                minutes = parseInt(timer_ / 60, 10);
                seconds = parseInt(timer_ % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                setTimer(minutes + ":" + seconds)
                if (--timer_ < 0) {
                    if (examStudent?.questionIndex < examStudent.questions.length - 1)
                        dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: examStudent.questionIndex + 1},});
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
    return <div className={props.classes.questionTimerContainer}>
        <Typography><b>{timer}</b></Typography>
        <img src={"/images/icons/questionTimer.svg"} alt={"questionTime"}/>
    </div>;
}