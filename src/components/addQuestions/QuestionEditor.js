import {Editor} from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import React from "react";

export default function QuestionEditor(props) {
    function uploadImageCallBack(file) {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append("image", file);
            // setFormData(data);
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            resolve({ data: { link: file.preview } });
        });
    }
    return <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={props.editorState}
        onEditorStateChange={props.onEditorStateChange}
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
    editorState: PropTypes.any,
    onEditorStateChange: PropTypes.func,
    uploadCallback: PropTypes.func
};