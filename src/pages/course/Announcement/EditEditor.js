import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Editor} from "react-draft-wysiwyg";
import {Button} from "@mui/material";
import {convertFromRaw, EditorState} from "draft-js";
const calcState = (text) => {
    return text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        : EditorState.createEmpty();
};
function EditEditor({text}) {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );
    useEffect(() => {
        setEditorState(calcState(text));
    }, []);
    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                image: {
                    // uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: true },
                },
            }}
        />
    );
}

export default EditEditor;