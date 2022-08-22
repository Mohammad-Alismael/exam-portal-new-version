import React, { Component, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Question from "./createExamPage/addQuestions/Question";
import { fetchExamQuestions } from "../api/services/Exam";
import { SET_QUESTIONS } from "../store/actions";
import ExamDetails from "../components/ExamDetails";
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
        fetchExamQuestions(examId, controller).then((data) => {
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
        });
        return () => {
            controller.abort();
        };
    }, []);
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
