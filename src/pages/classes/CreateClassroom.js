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
import { SET_COURSE_LIST } from "../../store/actions";
import { createCourse } from "../../api/services/Course";
import { toast } from "react-toastify";
import useErrorMessage from "../../utils/hooks/useErrorMessage";
import { dataURLtoFile, toDataURL } from "../../utils/global/GlobalConstants";
import { BASE_URL } from "../../api/axios";
import {
  fetchCourseInfoRequest,
  fetchCourseInfoSuccess,
  resetCourseReducer,
} from "../../actions/CourseAction";
import {
  createNewCourseAction,
  setFileObjectAction,
} from "../../actions/CreateNewCourseAction";
import { stringify } from "flatted";
function CreateClassroom({ open, onClose }) {
  const [DefaultImgOpen, setDefaultImgOpen] = React.useState(false);
  const { user } = useSelector((state) => state.UserReducerV2);
  const [loading, setLoading] = useState(false);
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
  const [localState, setLocalState] = useState({
    courseName: newCourseProperties.courseName,
    section: newCourseProperties.section,
    backgroundFileObject: newCourseProperties.backgroundFileObject,
    letStudentsAskQuestions: false,
    announcementsComments: false,
  });
  const setCourseName = (e) => {
    setLocalState({
      ...localState,
      courseName: e.target.value,
    });
  };
  const setCourseSection = (e) => {
    setLocalState({
      ...localState,
      section: e.target.value,
    });
  };
  const letStudentsAskQuestions = (e) => {
    setLocalState({
      ...localState,
      letStudentsAskQuestions: e.target.checked,
    });
  };
  const letStudentsToComment = (e) => {
    setLocalState({
      ...localState,
      announcementsComments: e.target.checked,
    });
  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log({ id: uuid(), src: e.target.result });
      };
      reader.readAsDataURL(file);
      setLocalState({
        ...localState,
        backgroundFileObject: file,
      });
      return file;
    });
  }, []);

  function createBackgroundFileObject() {
    const { backgroundFileObject } = newCourseProperties;
    if (backgroundFileObject == null) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      const url = `${BASE_URL}/default-backgrounds/ep_option${randomNum}.png`;
      return { url };
    }
  }

  async function handleCreateCourse(newCourseProperties, userId) {
    dispatch(createNewCourseAction(newCourseProperties, userId, onClose));
  }

  const createClass = async () => {
    const { courseName, section } = localState;
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
    setLoading(true);
    const backgroundFileObject = createBackgroundFileObject();
    const courseProperties = { ...localState, backgroundFileObject };
    await handleCreateCourse(courseProperties, user["user_id"]);
    setLocalState({
      courseName: "",
      section: "",
      backgroundFileObject: null,
      letStudentsAskQuestions: false,
      announcementsComments: false,
    });
    setLoading(false);
  };
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
              value={localState.courseName}
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
              value={localState.section}
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
              accept="image/*"
            />
            <FormGroup>
              <FormControlLabel
                sx={{ justifyContent: "space-between", ml: 0 }}
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
                sx={{ justifyContent: "space-between", ml: 0 }}
                label="Let students comment on posts"
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mb: 4 }}
          variant="outlined"
          size="small"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          sx={{ mr: 4, mb: 4 }}
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
