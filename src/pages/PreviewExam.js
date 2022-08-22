import React, {Component, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Question from "./createExamPage/addQuestions/Question";
import {fetchExamDetails, fetchExamQuestions} from "../api/services/Exam";
import {
    SET_ASSIGNED_FOR,
    SET_ENDING_AT, SET_EXAM_ANSWER_KEY, SET_EXAM_ANSWER_KEY_AT, SET_EXAM_RANDOMNESS, SET_EXAM_TIMER,
    SET_EXAM_TITLE,
    SET_NAVIGATION,
    SET_QUESTIONS,
    SET_STARTING_AT
} from "../store/actions";
import ExamDetails from "../components/ExamDetails";
import {CircularProgress} from "@material-ui/core";
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

    const course = useSelector(state => state.CourseReducer);
    const exam = useSelector((state) => state.ExamReducer);
    const getQuestionIndex = (uid) => {
        const questionIndexFound = exam?.questions.findIndex((quest, index) => {
            return quest.tmpId === uid;
        });
        console.log(questionIndexFound);
        return questionIndexFound;
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(exam.questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    }
    useEffect(() => {
        const controller = new AbortController();
        fetchExamDetails(examId, controller).then((data)=>{
            console.log('exam details', data)
            dispatch({type: SET_STARTING_AT, payload: { startingAt: data['starting_at']}});
            dispatch({type: SET_ENDING_AT, payload: { endingAt: data['ending_at']}});
            dispatch({type: SET_EXAM_TITLE, payload: { examTitle: data['title']}});
            dispatch({type: SET_ASSIGNED_FOR, payload: { assignedFor: data['assigned_for'] }});
            dispatch({type: SET_NAVIGATION, payload: { navigation: data['navigation'] }});
            dispatch({type: SET_EXAM_TIMER, payload: { questionTimer: data['question_timer'] }});
            dispatch({type: SET_EXAM_RANDOMNESS, payload: { questionRandomness: data['question_randomness']}})
            dispatch({type: SET_EXAM_ANSWER_KEY_AT, payload: { postingAnswerKeyAt: data['see_result_at']}});
            dispatch({type: SET_EXAM_ANSWER_KEY, payload: { postingAnswerKey: data['see_result_at'] == null}});
            var ar = [];
            for (let i = 0; i < data['questions'].length; i++) {
                const questionObject = {
                    answerKey: null,
                    isActive: data['questions'][i]["is_active"],
                    options: [],
                    time: data['questions'][i]["time_limit"],
                    points: data['questions'][i]["points"],
                    questionText: data['questions'][i]["question_text"],
                    questionType: data['questions'][i]["question_type"],
                    tmpId: data['questions'][i]["question_id"],
                    whoCanSee: data['questions'][i]["who_can_see"],
                    previewFile: data['questions'][i]["file_path"],
                };
                ar.push(questionObject);
            }

            dispatch({ type: SET_QUESTIONS, payload: { questions: ar } });
            setLoading(false)
        })

        fetchExamQuestions(examId, controller).then((data) => {
            console.log('exam questions',data)
            var ar = [];
            for (let i = 0; i < data.length; i++) {
                const questionObject = {
                    answerKey: null,
                    isActive: data[i]["is_active"],
                    options: [],
                    time: data[i]["time_limit"],
                    points: data[i]["points"],
                    questionText: data[i]["question_text"],
                    questionType: data[i]["question_type"],
                    tmpId: data[i]["question_id"],
                    whoCanSee: data[i]["who_can_see"],
                    previewFile: data[i]["file_path"],
                };
                ar.push(questionObject);
            }

            dispatch({ type: SET_QUESTIONS, payload: { questions: ar } });
            setLoading(false)
        });

        return () => {
            controller.abort();
        };
    }, []);
    if (loading) {
        return <CircularProgress size={200}/>;
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <ExamDetails />
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId={"previewQuestions"}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {exam.questions.map(({ tmpId }, index) => {
                                    return (
                                        <Draggable key={tmpId} draggableId={tmpId} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Question
                                                        questionIndex={getQuestionIndex(tmpId)}
                                                        uid={tmpId}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
}

export default PreviewExam;
