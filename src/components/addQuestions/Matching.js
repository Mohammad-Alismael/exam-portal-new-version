import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { OptionEditor } from "./OptionEditor";
import { convertToRaw, EditorState } from "draft-js";
import { calcState, createMarkup } from "../../utils/global/GlobalConstants";
import { convertToHTML } from "draft-convert";
function Matching({
  questionIndex,
  updateQuestionArray,
  updateQuestionOptions,
}) {
  const [optionValue, setOptionValue] = React.useState("");
  const exam = useSelector((state) => state.ExamReducer);
  const options = exam.questions[questionIndex].options;
  const [openOptionEditor, setOpenOptionEditor] = useState(false);
  const [editorStateOption, setEditorStateOption] = React.useState(
    EditorState.createEmpty()
  );
  const addMatchingOption = (e) => {
    e.preventDefault();
    let id = uuidv4();
    let newObj = {
      id,
      optionValue,
    };
    updateQuestionOptions([...options, newObj]);
    setOpenOptionEditor(false);
  };

  const SetCorrectAnswer = (e) => {
    console.log("SetCorrectAnswer = >", parseInt(e.target.value));
    updateQuestionArray({ answerKey: [parseInt(e.target.value)] });
  };

  const updateQuestionOption = (e) => {
    setEditorStateOption(e);
    const db = JSON.stringify(
      convertToRaw(editorStateOption.getCurrentContent())
    );
    setOptionValue(db);
  };

  return (
    <>
      <Grid item xs={4}>
        <FormControl fullWidth variant="standard" margin="normal">
          <InputLabel id="type">Question Options</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="Question Options"
            value={exam.questions[questionIndex].answerKey[0]}
            onChange={SetCorrectAnswer}
          >
            {options.map((val, index) => {
              return (
                <MenuItem key={index} value={index}>
                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      convertToHTML(
                        calcState(val["optionValue"]).getCurrentContent()
                      )
                    )}
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      {!exam.isItPreview ? (
        <>
          <OptionEditor
            open={openOptionEditor}
            setEditOpen={setOpenOptionEditor}
            addOption={addMatchingOption}
            updateQuestionOption={updateQuestionOption}
            editorStateOption={editorStateOption}
          />
          <Button fullwidth onClick={() => setOpenOptionEditor(true)}>
            add option
          </Button>
        </>
      ) : null}
    </>
  );
}

export default Matching;
