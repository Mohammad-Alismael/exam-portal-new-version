import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Editor} from "react-draft-wysiwyg";
import {Button} from "@mui/material";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {deleteAnnouncement, updateAnnouncement} from "../../../api/services/Annoucments";
import {SET_COURSE_ANNOUNCEMENTS} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
const calcState = (text) => {
    return text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        : EditorState.createEmpty();
};
function EditEditor({announcementId,text,setEditAnnouncement}) {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();
    const {course_id} = useParams();
    const updateAnnouce = async (e) => {
        e.preventDefault();

        // Get the JSON representation of the current editor state
        const jsonDB = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        try {
            // Update the announcement with the new JSON data
            await updateAnnouncement(announcementId, jsonDB, course_id);

            // Update the state with the new announcements array
            const updatedAnnouncements = course.announcements.map((announcement) =>
                announcement.id === announcementId
                    ? { ...announcement, announcement_text: jsonDB }
                    : announcement
            );
            dispatch({
                type: SET_COURSE_ANNOUNCEMENTS,
                payload: { announcements: updatedAnnouncements },
            });
        } catch (error) {
            console.error(error);
        }

        // Set the edit announcement flag to false
        setEditAnnouncement(false);
    };

    useEffect(() => {
        setEditorState(calcState(text));
    }, []);
    return (
        <>
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
            <Button onClick={updateAnnouce}>update</Button>
       </>
    );
}

export default EditEditor;