import React, { useCallback, useEffect, useState } from "react";
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
  SET_BACKGROUND_OBJECT_FILE,
} from "../../store/actions";
import { useParams } from "react-router-dom";
import { setCourseInfo, updateClassAction } from "../../actions/CourseAction";
import {
  setCourseNameAction,
  setCourseSectionAction,
  setFileObjectAction,
  setLetStudentCommentAction,
  setLetStudentsAskQuestionsAction,
} from "../../actions/CreateNewCourseAction";

function EditClassroom({ open, setEditOpen }) {
  const [DefaultImgOpen, setDefaultImgOpen] = React.useState(false);
  const { user } = useSelector((state) => state.UserReducerV2);
  const dispatch = useDispatch();
  const { course_id } = useParams();
  const courseObj = useSelector((state) => state.CourseReducer)["course_info"];
  const [localState, setLocalState] = useState({
    courseName: courseObj["class_name"],
    section: courseObj["section"],
    backgroundFileObject: { url: courseObj["img_path"] },
    letStudentsAskQuestions: courseObj["allow_students_to_announcements"],
    announcementsComments: courseObj["allow_students_to_comment"],
  });
  const newCourseProperties = useSelector(
    (state) => state.CreateNewCourseReducer
  );
  const setCourseName = (e) => {
    setLocalState({
      ...localState,
      courseName: e.target.value,
    });
    dispatch(setCourseNameAction(e.target.value));
  };

  const setCourseSection = (e) => {
    setLocalState({
      ...localState,
      section: e.target.value,
    });
    dispatch(setCourseSectionAction(e.target.value));
  };

  const letStudentsAskQuestions = (e) => {
    setLocalState({
      ...localState,
      letStudentsAskQuestions: e.target.checked,
    });
    dispatch(setLetStudentsAskQuestionsAction(e.target.checked));
  };
  const letStudentsToComment = (e) => {
    setLocalState({
      ...localState,
      announcementsComments: e.target.checked,
    });
    dispatch(setLetStudentCommentAction(e.target.checked));
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
  const updateClass = () => {
    dispatch(
      updateClassAction(
        {
          ...localState,
          backgroundFileObject: newCourseProperties["backgroundFileObject"],
        },
        course_id,
        (value) => {
          setEditOpen(value);
        }
      )
    );
  };

  useEffect(() => {
    dispatch(setFileObjectAction({ url: courseObj["img_path"] }));
  }, []);

  return (
    <Dialog open={open} onClose={(e) => setEditOpen(false)}>
      <DialogTitle>
        <b>Edit Classroom Details</b>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} xl={12}>
            <TextField
              value={localState.courseName}
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
              value={localState.section}
              onChange={setCourseSection}
              autoFocus
              margin="dense"
              id="section"
              label="section"
              type="text"
              fullWidth
              variant="filled"
            />
            <Dropzone
              onDrop={onDrop}
              setDefaultImgOpen={setDefaultImgOpen}
              accept={"image/*"}
            />
            <FormGroup>
              <FormControlLabel
                style={{ justifyContent: "space-around" }}
                control={
                  <Switch
                    checked={localState.letStudentsAskQuestions == 1}
                    onChange={letStudentsAskQuestions}
                    color="primary"
                  />
                }
                label="Let students ask questions/announcements"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={localState.announcementsComments == 1}
                    onChange={letStudentsToComment}
                    color="primary"
                  />
                }
                style={{ justifyContent: "space-around" }}
                label="Let students comment under my announcements"
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => setEditOpen(false)}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={updateClass}>
          update
        </Button>
      </DialogActions>
      <DefaultImages
        open={DefaultImgOpen}
        setDefaultImgOpen={setDefaultImgOpen}
      />
    </Dialog>
  );
}

export default EditClassroom;
