import React, { useCallback, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { FormGroup, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";
import DefaultImages from "./DefaultImages";
import { useDispatch, useSelector } from "react-redux";
import uuid from "draft-js/lib/uuid";
import Dropzone from "./Dropzone";
import {
    CHANGE_PREVIEW,
    SET_ANNOUNCEMENTS_COMMENTS,
    SET_BACKGROUND_OBJECT_FILE, SET_COURSE_LIST,
    SET_LET_STUDENTS_ASK_QUESTIONS,
    SET_NEW_COURSE_NAME,
    SET_NEW_COURSE_SECTION,
} from "../../store/actions";
import CreateNewCourseReducer from "../../store/reducers/CreateNewCourseReducer";
import {createCourse} from "../../api/services/Course";
import {toast} from "react-toastify";
import useErrorMessage from "../../utils/hooks/useErrorMessage";
import {dataURLtoFile, toDataURL} from "../../utils/global/GlobalConstants";
import {BASE_URL} from "../../api/axios";
import {resetCourseReducer} from "../../actions/CourseAction";

function CreateClassroom({open, onClose, setLoadingProp}) {
    const [DefaultImgOpen, setDefaultImgOpen] = React.useState(false);
    const { user } = useSelector((state) => state.UserReducerV2);
    const {courseList} = useSelector((state)=> state.CourseListReducer);

    const dispatch = useDispatch();
    const {
        showError,
        showMsg,
        showErrorSection,
        showMsgSection,
        showErrorMsg,
        showErrorSectionMsg,
        hideErrorMsg,
        hideErrorSectionMsg,
    } = useErrorMessage();

    const newCourseProperties = useSelector(
        (state) => state.CreateNewCourseReducer
    );

    const { courseName, section, backgroundFileObject } = newCourseProperties;
    const setCourseName = (e) => {
        dispatch({
            type: SET_NEW_COURSE_NAME,
            payload: { courseName: e.target.value },
        });
    };
    const setCourseSection = (e) => {
        dispatch({
            type: SET_NEW_COURSE_SECTION,
            payload: { section: e.target.value },
        });
    };
    const letStudentsAskQuestions = (e) => {
        dispatch({
            type: SET_LET_STUDENTS_ASK_QUESTIONS,
            payload: { letStudentsAskQuestions: e.target.checked },
        });
    };
    const letStudentsToComment = (e) => {
        dispatch({
            type: SET_ANNOUNCEMENTS_COMMENTS,
            payload: { announcementsComments: e.target.checked },
        });
    };
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log({ id: uuid(), src: e.target.result });
            };
            reader.readAsDataURL(file);
            dispatch({
                type: SET_BACKGROUND_OBJECT_FILE,
                payload: { backgroundFileObject: file },
            });
            return file;
        });
    }, []);

    async function createBackgroundFileObject() {
        if (backgroundFileObject == null) {
            const randomNum = Math.floor(Math.random() * 9) + 1;
            const url = `${BASE_URL}/default-backgrounds/ep_option${randomNum}.png`;
            const fileName = url.split("/")[4];

            try {
                const dataUrl = await toDataURL(url);
                const fileData = dataURLtoFile(dataUrl, fileName);
                console.log("file data =>", fileData);
                return fileData;
            } catch (error) {
                console.log(error);
                return null;
            }
        }else{
            return backgroundFileObject
        }
    }

    async function handleCreateCourse(newCourseProperties, userId) {

        try {
            const res = await createCourse(newCourseProperties, userId);
            const newClassroom = res.newClassroom;

            toast(res.message);
            console.log("new course => ", newClassroom);

            dispatch(resetCourseReducer());
            dispatch({
                type: SET_COURSE_LIST,
                payload: { courseList: [...courseList, newClassroom] }
            });
            setLoadingProp(false);
            onClose();
        } catch (error) {
            console.log(error)
        }
    }

    const createClass = async () => {
        setLoadingProp(true);
        if (!courseName && !section) {
            showErrorMsg("Course name can't be empty");
            showErrorSectionMsg("Section can't be empty");
            return;
        }

        if (!courseName) {
            showErrorMsg("Course name can't be empty");
            return;
        }

        if (!section) {
            showErrorSectionMsg("Section can't be empty");
            return;
        }
        const backgroundFileObject = await createBackgroundFileObject();
        const courseProperties = {...newCourseProperties, backgroundFileObject};

        await handleCreateCourse(courseProperties, user["user_id"]);
    }


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <b>Create New Classroom</b>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12} xl={12}>
                        <TextField
                            error={showError}
                            onChange={setCourseName}
                            onFocus={hideErrorMsg}
                            autoFocus
                            margin="dense"
                            id="class_name"
                            label="class name (required)"
                            type="text"
                            fullWidth
                            variant="filled"
                            helperText={showMsg}
                        />
                        <TextField
                            error={showErrorSection}
                            onChange={setCourseSection}
                            onFocus={hideErrorSectionMsg}
                            autoFocus
                            margin="dense"
                            id="section"
                            label="section (required)"
                            type="text"
                            fullWidth
                            variant="filled"
                            helperText={showMsgSection}
                        />
                        <Dropzone
                            onDrop={onDrop}
                            setDefaultImgOpen={setDefaultImgOpen}
                            accept={"image/*"}
                        />
                        <FormGroup>
                            <FormControlLabel
                                sx={{ justifyContent: "space-between",ml: 0 }}
                                control={
                                    <Switch onChange={letStudentsAskQuestions} color="primary" />
                                }
                                label="Let students ask questions/posts"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={
                                    <Switch onChange={letStudentsToComment} color="primary" />
                                }
                                sx={{ justifyContent: "space-between",ml: 0 }}
                                label="Let students comment on posts"
                                labelPlacement="start"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{mb: 4}}
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    sx={{mr: 4,mb: 4}}
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={createClass}
                >
                    Create
                </Button>
            </DialogActions>
            <DefaultImages
                open={DefaultImgOpen}
                setDefaultImgOpen={setDefaultImgOpen}
            />
        </Dialog>
    );
}

export default CreateClassroom;
