import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {FormGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";
import {updateCourse} from "../../api/services/Course";
import {toast} from "react-toastify";
import DefaultImages from "./DefaultImages";
import {useDispatch, useSelector} from "react-redux";
import uuid from "draft-js/lib/uuid";
import Dropzone from "./Dropzone";
import {
    SET_ANNOUNCEMENTS_COMMENTS,
    SET_BACKGROUND_OBJECT_FILE, SET_LET_STUDENTS_ASK_QUESTIONS,
    SET_NEW_COURSE_NAME,
    SET_NEW_COURSE_SECTION
} from "../../store/actions";
import CreateNewCourseReducer from "../../store/reducers/CreateNewCourseReducer";
import {useParams} from "react-router-dom";
import useSelectImg from "../../utils/hooks/useSelectImg";
import {setCourseInfo, setNewCourseReducer} from "../../actions/CourseAction";

function EditClassroom({open,setEditOpen}) {
    const [DefaultImgOpen, setDefaultImgOpen] = React.useState(false);
    const {user} = useSelector((state) => state.UserReducerV2);
    const dispatch = useDispatch();
    const { course_id } = useParams();
    const courseObj = useSelector((state) => state.CourseReducer)['course_info']

    const [courseName_,setCourseName_] = useState(courseObj['class_name']);
    const [section,setSection] = useState(courseObj['section']);
    const [letStudentsAskQuestions_, setLetStudentsAskQuestions] = React.useState(courseObj['allow_students_to_announcements']);
    const [announcementsComments_, setAnnouncementsComments] = React.useState(courseObj['allow_students_to_comment']);
    const newCourseProperties = useSelector((state) => state.CreateNewCourseReducer);
    const selectImg = (url) => {
        const fileName = url.split("/")[4];
        const toDataURL = (url) =>
            fetch(url)
                .then((response) => response.blob())
                .then((blob) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    })
                );

        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
        }
        function stringify(obj) {
            let cache = [];
            let str = JSON.stringify(obj, function(key, value) {
                if (typeof value === "object" && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            });
            cache = null; // reset the cache
            return str;
        }
        toDataURL(url)
            .then((dataUrl) => {
                const fileData = dataURLtoFile(dataUrl, fileName);
                dispatch({ type: SET_BACKGROUND_OBJECT_FILE, payload: { backgroundFileObject: JSON.parse(stringify(fileData)) } });
            })
    };
    const setCourseName = (e) => {
        setCourseName_(e.target.value)
        dispatch({ type: SET_NEW_COURSE_NAME, payload: { courseName: e.target.value } });
    }

    const setCourseSection = (e) => {
        setSection(e.target.value)
        dispatch({ type: SET_NEW_COURSE_SECTION, payload: { section: e.target.value } });
    }

    const letStudentsAskQuestions = (e) =>{
        setLetStudentsAskQuestions(e.target.checked)
        dispatch({ type: SET_LET_STUDENTS_ASK_QUESTIONS, payload: { letStudentsAskQuestions: e.target.checked } });
    }
    const letStudentsToComment = (e) =>{
        setAnnouncementsComments(e.target.checked)
        dispatch({ type: SET_ANNOUNCEMENTS_COMMENTS, payload: { announcementsComments: e.target.checked } });
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log( { id: uuid(), src: e.target.result })
            };
            reader.readAsDataURL(file);
            dispatch({ type: SET_BACKGROUND_OBJECT_FILE, payload: { backgroundFileObject: file } });
            return file;
        });
    }, []);
    const updateClass_ = () => {
        updateCourse(newCourseProperties,course_id).then((data)=>{
            toast.success(data['message'])
            dispatch(setCourseInfo(data['updated_data']))
            dispatch(setNewCourseReducer(data['updated_data']))
            setEditOpen(false)
        }).catch(console.log)
    };

    useEffect(()=>{
        // sets default values for redux reducer
        selectImg(courseObj['img_path'])
        // dispatch({ type: SET_ANNOUNCEMENTS_COMMENTS, payload: { announcementsComments: courseObj['allow_students_to_announcements'] } });
        // dispatch({ type: SET_LET_STUDENTS_ASK_QUESTIONS, payload: { letStudentsAskQuestions: courseObj['allow_students_to_comment'] }});
        // dispatch({ type: SET_NEW_COURSE_SECTION, payload: {section:courseObj['section']}});
        // dispatch({ type: SET_NEW_COURSE_NAME, payload: {courseName:courseObj['class_name']}});

    },[])

    return <Dialog open={open} onClose={(e)=>(setEditOpen(false))}>
        <DialogTitle><b>Create New Classroom</b></DialogTitle>
        <DialogContent>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} xl={12}>
                    <TextField
                        value={courseName_}
                        onChange={setCourseName}
                        autoFocus
                        margin="dense"
                        id="class_name"
                        label="class name (required)"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        value={section}
                        onChange={setCourseSection}
                        autoFocus
                        margin="dense"
                        id="section"
                        label="section"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <Dropzone onDrop={onDrop} setDefaultImgOpen={setDefaultImgOpen} accept={"image/*"} />
                    <FormGroup>
                        <FormControlLabel
                            style={{justifyContent: 'space-around'}}
                            control={<Switch checked={letStudentsAskQuestions_ === 1 } onChange={letStudentsAskQuestions} color="primary"/>}
                            label="Let students ask questions/announcements"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Switch checked={announcementsComments_ === 1} onChange={letStudentsToComment} color="primary"/>}
                            style={{justifyContent: 'space-around'}}
                            label="Let students comment under my announcements"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" color="primary" onClick={(e)=>(setEditOpen(false))}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={updateClass_}>update</Button>
        </DialogActions>
        <DefaultImages open={DefaultImgOpen} setDefaultImgOpen={setDefaultImgOpen}/>
    </Dialog>
}

export default EditClassroom;