import {Editor} from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import React from "react";
import {SET_QUESTION_FILE_OBJECT} from "../../store/actions";
import {useDispatch} from "react-redux";

export default function QuestionEditor({updateQuestionArray,editorState,onEditorStateChange}) {
    const dispatch = useDispatch();
    function uploadImageCallBack(file) {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append("image", file);
            // setFormData(data);
            dispatch({
                type: SET_QUESTION_FILE_OBJECT,
                payload: { objectFile: data},
            });
            updateQuestionArray({ previewFile: file })
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            resolve({ data: { link: file.preview } });
        });
    }
    return <Editor
        placeholder="Write your question text here..."
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
            options: ["inline", "blockType", "fontSize", "fontFamily", "list","textAlign", "colorPicker", "link", "embedded", "image", "remove", "history"],
            image: {
                uploadCallback: uploadImageCallBack,
                alt: {present: true, mandatory: true},
            },
        }}
    />;
}

QuestionEditor.propTypes = {
    updateQuestionArray: PropTypes.func,
    editorState: PropTypes.any,
    onEditorStateChange: PropTypes.func,
    uploadCallback: PropTypes.func
};