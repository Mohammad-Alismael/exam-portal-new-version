import React, { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Question from "../components/addQuestions/Question";
import { fetchExamDetails} from "../api/services/Exam";
import {fetchExamQuestions} from "../api/services/Question"
import {
    CHANGE_PREVIEW,
    SET_ASSIGNED_FOR,
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
} from "../store/actions";
import ExamDetails from "../components/ExamDetails";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import withSideBarAndResAppBar from "../layouts/withSideBarAndResAppBar";
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
    const { examId,course_id } = useParams();
    const navigate = useNavigate();
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
        dispatch({type: CHANGE_PREVIEW, payload: {isItPreview: true}});
        const controller = new AbortController();
        async function fetchData() {
            console.log("this course =>", course)
            try {
                const [examDetails, examQuestions] = await Promise.all([
                    fetchExamDetails(examId, course_id, controller),
                    fetchExamQuestions(examId, controller)
                ]);

                dispatch({
                    type: SET_STARTING_AT,
                    payload: { startingAt: examDetails["starting_at"] }
                });
                dispatch({
                    type: SET_ENDING_AT,
                    payload: { endingAt: examDetails["ending_at"] }
                });
                dispatch({
                    type: SET_EXAM_TITLE,
                    payload: { examTitle: examDetails["title"] }
                });
                dispatch({
                    type: SET_ASSIGNED_FOR,
                    payload: { assignedFor: examDetails["assigned_for"] }
                });
                dispatch({
                    type: SET_NAVIGATION,
                    payload: { navigation: examDetails["navigation"] }
                });
                dispatch({
                    type: SET_EXAM_TIMER,
                    payload: { questionTimer: examDetails["question_timer"] }
                });
                dispatch({
                    type: SET_EXAM_RANDOMNESS,
                    payload: { questionRandomness: examDetails["question_randomness"] }
                });
                dispatch({
                    type: SET_EXAM_ANSWER_KEY_AT,
                    payload: { postingAnswerKeyAt: examDetails["see_result_at"] }
                });
                dispatch({
                    type: SET_EXAM_ANSWER_KEY,
                    payload: { postingAnswerKey: examDetails["see_result_at"] == null }
                });
                console.log("exam question => ", examQuestions)
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
                         answerKey
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
                            previewFile: file_path
                        };
                    }
                );
                dispatch({ type: SET_QUESTIONS, payload: { questions: ar } });
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
        return (
            <>
                <ResponsiveAppBar />
                <p style={{ color: "white" }}> no exam details for this exam</p>
            </>
        );
    }
    if (loading) {
        return <CircularProgress size={200} />;
    }else
        return (
            <>
                <div className={classes.container}>
                    <ExamDetails />
                    {exam.questions.map(({ tmpId }, index) => {
                        return  <Question
                            key={tmpId}
                            questionIndex={getQuestionIndex(tmpId)}
                            uid={tmpId}
                        />
                    })}
                </div>
            </>
        );
}

export default withSideBarAndResAppBar(EditExam);
