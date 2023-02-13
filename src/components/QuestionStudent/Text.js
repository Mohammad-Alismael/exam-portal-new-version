import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {SET_QUESTION_USER_ANSWER} from "../../store/actions";
import {useDispatch} from "react-redux";
import {Editor} from "react-draft-wysiwyg";
import {calcState} from "../../utils/global/GlobalConstants";
import {convertToRaw} from "draft-js";
function Text({questionIndex}) {
    const dispatch = useDispatch();
    const [editorState, setEditorState] = React.useState(calcState(""));
    const updateQuestionText = (e) => {
        setEditorState(e);
        const db = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        console.log(db)
        dispatch({
            type: SET_QUESTION_USER_ANSWER,
            payload: {userAnswer: db,index:questionIndex},
        });
    };
    return (
        <Grid xs={12} style={{ marginLeft: 12 }}>
            <Editor
                placeholder="Write your answer here..."
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={updateQuestionText}
                toolbar={{
                    options: ["inline", "blockType", "fontSize", "fontFamily", "list","textAlign", "colorPicker", "link", "embedded", "remove", "history"],
                }}
            />
        </Grid>
    );
}

export default Text;
