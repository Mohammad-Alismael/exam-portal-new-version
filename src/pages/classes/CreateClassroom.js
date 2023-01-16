import React, {useCallback, useState} from 'react';
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
import {createCourse} from "../../api/services/Course";
import {toast} from "react-toastify";
import DefaultImages from "./DefaultImages";
import {useDispatch, useSelector} from "react-redux";
import uuid from "draft-js/lib/uuid";
import Dropzone from "./Dropzone";
import {
    CHANGE_PREVIEW, SET_ANNOUNCEMENTS_COMMENTS,
    SET_BACKGROUND_OBJECT_FILE, SET_LET_STUDENTS_ASK_QUESTIONS,
    SET_NEW_COURSE_NAME,
    SET_NEW_COURSE_SECTION
} from "../../store/actions";
import CreateNewCourseReducer from "../../store/reducers/CreateNewCourseReducer";

function CreateClassroom({open,onClose,setLoadingProp,courses,setCourses}) {
    const [DefaultImgOpen, setDefaultImgOpen] = React.useState(false);
    const user = useSelector((state) => state.UserReducerV2).user;
    const dispatch = useDispatch();
    const newCourseProperties = useSelector((state) => state.CreateNewCourseReducer);
    const setCourseName = (e) => {
        dispatch({ type: SET_NEW_COURSE_NAME, payload: { courseName: e.target.value } });
    }
    const setCourseSection = (e) => {
        dispatch({ type: SET_NEW_COURSE_SECTION, payload: { section: e.target.value } });

    }
    const letStudentsAskQuestions = (e) =>{
        dispatch({ type: SET_LET_STUDENTS_ASK_QUESTIONS, payload: { letStudentsAskQuestions: e.target.checked } });
    }
    const letStudentsToComment = (e) =>{
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
    const createClass = () => {
        setLoadingProp(true);
        createCourse(newCourseProperties, user["user_id"])
            .then((res) => {
                toast(res["message"]);
                console.log("new course => " , res["newClassroom"])
                setCourses([...courses, res["newClassroom"]]);
                setLoadingProp(false);
            })
            .catch((error) => {
                console.log(error);
            });
        onClose();
    };

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle><b>Create New Classroom</b></DialogTitle>
        <DialogContent>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} xl={12}>
                    <TextField
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
                            control={<Switch onChange={letStudentsAskQuestions} color="primary"/>}
                            label="Let students ask questions/announcements"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Switch onChange={letStudentsToComment} color="primary"/>}
                            style={{justifyContent: 'space-around'}}
                            label="Let students comment under my announcements"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={createClass}>Create</Button>
        </DialogActions>
        <DefaultImages open={DefaultImgOpen} setDefaultImgOpen={setDefaultImgOpen}/>
    </Dialog>
}

export default CreateClassroom;