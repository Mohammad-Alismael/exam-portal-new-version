import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CHANGE_PREVIEW } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Question from "../../components/addQuestions/Question";
import ExamLinearStepper from "../../components/ExamLinearStepper";
import { createNewQuestion, setQuestionsList } from "../../actions/ExamActions";
import { selectExamQuestions } from "../../utils/selectors/ExamSelectors";

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
  const { questions } = useSelector(selectExamQuestions);
  const classes = useStyles();
  const dispatch = useDispatch();
  const getQuestionIndex = useCallback(
    (uid) => {
      return questions.findIndex((quest, index) => {
        return quest.tmpId === uid;
      });
    },
    [questions]
  );
  const addQuestion = (e) => {
    e.preventDefault();
    dispatch(createNewQuestion(questions));
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setQuestionsList(items));
  }
  useEffect(() => {
    dispatch({ type: CHANGE_PREVIEW, payload: { isItPreview: false } });
  }, [dispatch]);
  return (
    <>
      <div className={classes.container}>
        <ExamLinearStepper />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map(({ tmpId }, index) => {
                  return (
                    <Draggable key={tmpId} draggableId={tmpId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Question
                            key={tmpId}
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
      </div>
    </>
  );
}

export default CreateExamPage;
