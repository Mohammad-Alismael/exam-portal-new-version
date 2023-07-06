import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { convertToRaw, EditorState } from "draft-js";
import { OptionEditor } from "./OptionEditor";
import Option from "./Option";
function Mcq({
  questionIndex,
  updateQuestionArray,
  updateQuestionOptions,
  checkOptionText,
  deleteOption,
}) {
  const [optionValue, setOptionValue] = React.useState("");
  const [optionImg, setOptionImg] = React.useState(null);
  const exam = useSelector((state) => state.ExamReducer);
  const { options } = exam.questions[questionIndex];
  const [editorStateOption, setEditorStateOption] = React.useState(
    EditorState.createEmpty()
  );
  const updateQuestionOption = (e) => {
    setEditorStateOption(e);
    const db = JSON.stringify(
      convertToRaw(editorStateOption.getCurrentContent())
    );
    setOptionValue(db);
  };

  const [openOptionEditor, setOpenOptionEditor] = useState(false);

  const addOption = (e) => {
    e.preventDefault();
    let id = uuidv4();
    let newObj = {
      id,
      optionValue,
      img: optionImg,
    };

    if (options.length < 4) {
      if (checkOptionText(optionValue) === -1) {
        updateQuestionOptions([
          ...exam.questions[questionIndex].options,
          newObj,
        ]);
        setOptionImg(null);
      }
    } else {
      toast.info("MCQ can only have 4 options max!");
    }
    setOpenOptionEditor(false);
  };

  const SetCorrectAnswer = (e) => {
    updateQuestionArray({ answerKey: [parseInt(e.target.value)] });
  };
  const optionFile = (e) => {
    e.preventDefault();
    let myFiles = e.target.files;
    Object.assign(myFiles[0], {
      preview: URL.createObjectURL(myFiles[0]),
    });
    setOptionImg(myFiles[0]);
  };

  const removeFile = (optionId) => {
    const optionIndex = exam.questions[questionIndex].options.findIndex(
      (option, i) => {
        return option.id == optionId;
      }
    );
    const deepCopy = [...exam.questions[questionIndex].options];
    deepCopy[optionIndex] = { ...deepCopy[optionIndex], img: null };
    updateQuestionOptions(deepCopy);
  };
  const loadOptions = (index) => {
    console.log(options[index]["optionValue"]);
    return (
      <Option
        key={options[index]["id"]}
        id={options[index]["id"]}
        options={options}
        index={index}
        questionIndex={questionIndex}
        onClick={() => removeFile(options[index]["id"])}
        onClick1={() => deleteOption(options[index]["id"])}
      />
    );
  };

  useEffect(() => {
    console.log("questionIndex =>", questionIndex);
    console.log(exam.questions[questionIndex]);
  }, []);
  return (
    <Grid xs={12} container>
      <Grid
        item
        style={{ marginLeft: 12 }}
        justifyContent="center"
        alignItems="center"
        xs={12}
      >
        <RadioGroup
          onChange={SetCorrectAnswer}
          value={exam?.questions[questionIndex]?.answerKey[0]}
        >
          <Grid container>
            {options.map((val, index) => {
              return loadOptions(index);
            })}
          </Grid>
          <br />
          {!exam.isItPreview ? (
            <>
              <OptionEditor
                open={openOptionEditor}
                setEditOpen={setOpenOptionEditor}
                addOption={addOption}
                updateQuestionOption={updateQuestionOption}
                editorStateOption={editorStateOption}
              />
              <Button onClick={() => setOpenOptionEditor(true)}>
                add option
              </Button>
            </>
          ) : null}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default Mcq;
