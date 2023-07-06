import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { calcState, createMarkup } from "../../utils/global/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { convertToRaw } from "draft-js";
import { CHANGE_QUESTION_OPTIONS } from "../../store/actions";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { convertToHTML } from "draft-convert";
import Button from "@mui/material/Button";
import { OptionEditor } from "./OptionEditor";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  textEditorContainer: {
    minHeight: "50px",
    padding: "0.8rem",
    borderTop: "1px solid #D9D9D9",
  },
}));

const Option = ({ options, index, onClick1, id, questionIndex }) => {
  const [editorState, setEditorState] = React.useState(
    calcState(options[index]["optionValue"])
  );
  const [open, setEditOpen] = React.useState(false);
  const exam = useSelector((state) => state.ExamReducer);
  const dispatch = useDispatch();

  const matchAny = () => {
    return options.some(({ optionValue }, index) => {
      return optionValue === editorState;
    });
  };
  const getOptionIndex = () => {
    return options.findIndex((val, index) => val.id == id);
  };
  const updateOption = (e) => {
    e.preventDefault();
    // if option index matches any index text then throw an error
    if (matchAny()) {
      return toast.info("option value already exists!");
    }
    // console.log(
    //     "update =>",
    //     JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    // );
    // console.log("getOptionIndex =>", getOptionIndex());
    const optionIndexFound = getOptionIndex();
    const tmp = [...exam.questions[questionIndex].options];
    tmp[optionIndexFound] = {
      ...tmp[optionIndexFound],
      optionValue: JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      ),
    };
    console.log("tmp =>", tmp);
    dispatch({
      type: CHANGE_QUESTION_OPTIONS,
      payload: { newOptions: tmp, index: questionIndex },
    });
    setEditOpen(false);
  };
  return (
    <>
      <Grid container alignItems={"center"} xs={12}>
        <Grid container alignItems={"center"} xs={12}>
          <FormControlLabel value={index} control={<Radio />} label="" />
          {/*<Editor*/}
          {/*    wrapperClassName="wrapper-class"*/}
          {/*    editorClassName="editor-class"*/}
          {/*    toolbarClassName="toolbar-class"*/}
          {/*    id={options[index]["id"]}*/}
          {/*    readOnly={true}*/}
          {/*    editorState={calcState(options[index]["optionValue"])}*/}
          {/*    toolbar={{*/}
          {/*        options: [],*/}
          {/*    }}*/}
          {/*/>*/}
          <div
            dangerouslySetInnerHTML={createMarkup(
              convertToHTML(
                calcState(options[index]["optionValue"]).getCurrentContent()
              )
            )}
          ></div>
          <Button onClick={(e) => setEditOpen(true)}>Edit</Button>
          <Button onClick={onClick1}>Delete</Button>
        </Grid>
      </Grid>
      <OptionEditor
        open={open}
        setEditOpen={setEditOpen}
        addOption={updateOption}
        updateQuestionOption={(e) => setEditorState(e)}
        editorStateOption={editorState}
      />
    </>
  );
};

Option.propTypes = {
  options: PropTypes.any,
  index: PropTypes.any,
  onClick: PropTypes.func,
  onClick1: PropTypes.func,
};

export default Option
