import React, { useEffect, useRef } from "react";
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SET_QUESTIONS } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Question from "./addQuestions/Question";
import { v4 as uuidv4 } from "uuid";
import ExamDetails from "../../components/ExamDetails";
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

function CreateExamPage(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const exam = useSelector((state) => state.ExamReducer);
    const [questions, setQuestions] = React.useState([]);
    const dispatch = useDispatch();
    const getQuestionIndex = (uid) => {
        const questionIndexFound = exam?.questions.findIndex((quest, index) => {
            return quest.tmpId === uid;
        });
        return questionIndexFound;
    };
    const addQuestion = (e) => {
        e.preventDefault();
        const uid = uuidv4();
        const questionObj = {
            answerKey: null,
            isActive: true,
            options: null,
            time: null,
            points: 5,
            questionText: "",
            questionType: 5,
            tmpId: uid,
            whoCanSee: 3,
            previewFile: null,
        };

        const newQuestionAr = exam.questions;
        newQuestionAr.push(questionObj);
        dispatch({ type: SET_QUESTIONS, payload: { questions: newQuestionAr } });
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(exam.questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch({ type: SET_QUESTIONS, payload: { questions: items } });
    }

    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <ExamDetails />
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId={"questions"}>
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
            <div>
                <Button
                    sx={{ mt: 3 }}
                    onClick={addQuestion}
                    className={classes.addQuestionBtn}
                    variant="contained"
                    color="warning"
                >
                    <b>add question</b>
                </Button>
            </div>
        </>
    );
}

export default CreateExamPage;
