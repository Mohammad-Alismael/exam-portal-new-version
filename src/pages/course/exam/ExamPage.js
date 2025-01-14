import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import ExamInstructor from "./ExamInstructor";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExams } from "../../../api/services/Exam";
import { setCourseExams } from "../../../actions/CourseAction";
import { CircularProgress } from "@material-ui/core";
import {
    SET_ASSIGNED_FOR,
    SET_COURSE_EXAMS,
    SET_ENDING_AT,
    SET_EXAM_ANSWER_KEY,
    SET_EXAM_ANSWER_KEY_AT,
    SET_EXAM_RANDOMNESS,
    SET_EXAM_TIMER,
    SET_EXAM_TITLE,
    SET_NAVIGATION,
    SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT,
    SET_STUDENTS,
} from "../../../store/actions";
import ResetExamReducer from "../../../actions/ResetExamReducer";
import ExamStudent from "./ExamStudent";
import NoExam from "./NoExam";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { CourseContainer } from "../../../components/Sidebar/Sidebar.styles";
import withSideBarAndResAppBar from "../../../layouts/withSideBarAndResAppBar";
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
        dispatch(ResetExamReducer());
        navigate(`/courses/${course_id}/create-exam`);
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
    }, []);
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
                                onClick={createNewExam}
                                className={classes.createExamBtn}
                                variant="contained"
                                color="warning"
                                endIcon={<AddIcon />}
                            >
                                <b>create</b>
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

export default withSideBarAndResAppBar(ExamPage);
