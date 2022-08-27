import React, { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Question from "./createExamPage/addQuestions/Question";
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

function PreviewExam(props) {
    const classes = useStyles();
    const { examId } = useParams();
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
        dispatch({ type: CHANGE_PREVIEW, payload: { isItPreview: true } });
        const controller = new AbortController();
        fetchExamDetails(examId, controller)
            .then((data) => {
                console.log("exam details", data);
                dispatch({
                    type: SET_STARTING_AT,
                    payload: { startingAt: data["starting_at"] },
                });
                dispatch({
                    type: SET_ENDING_AT,
                    payload: { endingAt: data["ending_at"] },
                });
                dispatch({
                    type: SET_EXAM_TITLE,
                    payload: { examTitle: data["title"] },
                });
                dispatch({
                    type: SET_ASSIGNED_FOR,
                    payload: { assignedFor: data["assigned_for"] },
                });
                dispatch({
                    type: SET_SPECIFIC_STUDENTS,
                    payload: { specificStudents: data["specificStudents"] },
                });
                dispatch({
                    type: SET_STUDENTS,
                    payload: { students: data["students"] },
                });
                dispatch({
                    type: SET_NAVIGATION,
                    payload: { navigation: data["navigation"] },
                });
                dispatch({
                    type: SET_EXAM_TIMER,
                    payload: { questionTimer: data["question_timer"] },
                });
                dispatch({
                    type: SET_EXAM_RANDOMNESS,
                    payload: { questionRandomness: data["question_randomness"] },
                });
                dispatch({
                    type: SET_EXAM_ANSWER_KEY_AT,
                    payload: { postingAnswerKeyAt: data["see_result_at"] },
                });
                dispatch({
                    type: SET_EXAM_ANSWER_KEY,
                    payload: { postingAnswerKey: data["see_result_at"] == null },
                });

                setLoading(false);
            })
            .catch((err) => {
                setExamDetails1(true);
                console.log(err);
                setLoading(false);
            });

        fetchExamQuestions(examId, controller).then((data) => {
            console.log("exam questions", data);
            const ar = data.map(
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
                        answerKey
                    },
                    i
                ) => {
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
            dispatch({ type: SET_QUESTIONS, payload: { questions: ar } });
            setLoading(false);
        });

        return () => {
            controller.abort();
        };
    }, []);
    if (loading) {
        return <CircularProgress size={200} />;
    }
    if (examDetails1) {
        return (
            <>
                <ResponsiveAppBar />
                <p style={{ color: "white" }}> no exam details for this exam</p>
            </>
        );
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <ExamDetails />
                {exam.questions.map(({ tmpId }, index) => {
                    return  <Question
                        questionIndex={getQuestionIndex(tmpId)}
                        uid={tmpId}
                    />
                })}
            </div>
        </>
    );
}

export default PreviewExam;
