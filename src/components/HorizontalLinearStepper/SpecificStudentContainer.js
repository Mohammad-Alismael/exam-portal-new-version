import React, { useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@material-ui/core";
import {
  SET_ASSIGNED_FOR,
  SET_SPECIFIC_STUDENTS,
  SET_STUDENTS,
  SET_WHO_CAN_SEE_OBJECT,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchClassmates } from "../../api/services/Course";
import { setSpecificStudents } from "../../actions/ExamActions";

SpecificStudentContainer.propTypes = {};

function SpecificStudentContainer({ open, setOpen }) {
  const { examId, course_id } = useParams();
  const course = useSelector((state) => state.CourseReducer);
  const exam = useSelector((state) => state.ExamReducer);
  const [studentInfo, setStudentInfo] = React.useState("");
  const [students, setStudents] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    dispatch(setSpecificStudents(checked));
    setOpen(false);
  };
  const handleToggle = useCallback(
    (username) => {
      const studentIndex = students.findIndex(
        (student) => student.username === username
      );

      let newChecked;
      if (checked.some((student) => student.username === username)) {
        newChecked = checked.filter((student) => student.username !== username);
      } else if (studentIndex !== -1) {
        newChecked = [...checked, students[studentIndex]];
      } else {
        newChecked = checked;
      }
      dispatch(setSpecificStudents(newChecked));
      setChecked(newChecked);
    },
    [checked, dispatch, students]
  );
  const handleCheckedList = useCallback(
    (username) => {
      const checkedIndex = checked.findIndex((val, i) => {
        return val["username"] === username;
      });
      return checkedIndex !== -1;
    },
    [checked]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchClassmates(course_id, controller).then((data) => {
      console.log("students", data);
      dispatch({
        type: SET_STUDENTS,
        payload: { students: data },
      });
      setStudents(data);
    });
    if (examId == null) {
      //then we are in create exam route
      console.log(course.classmates);
    } else {
      //then we are in edit mode
      // alert(examId)
      // fetch specific students
    }

    // fetch exam/students
    // fetchExamStudents(examId,controller).then((data)=>{
    //     dispatch({
    //         type: SET_STUDENTS,
    //         payload: { students: data['students'] },
    //     });
    //     setStudents(data['students'])
    // dispatch({
    //     type: SET_SPECIFIC_STUDENTS,
    //     payload: { specificStudents: data["specificStudents"] },
    // });
    // setChecked(data["specificStudents"])

    // })
    console.log(exam);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {course?.course_info?.class_name} course students
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Student Username or Email Address"
          type="email"
          onChange={(e) => {
            setStudentInfo(e.target.value);
          }}
          fullWidth
          variant="standard"
        />
        <List
          dense
          sx={{
            width: 560,
            height: 250,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
          }}
        >
          {students
            .filter((student, i) => {
              return (
                student["username"].includes(studentInfo) ||
                student["email_id"].includes(studentInfo)
              );
            })
            .map(({ username }, i) => {
              const labelId = uuidv4();
              return (
                <ListItem
                  key={labelId}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={() => handleToggle(username)}
                      checked={handleCheckedList(username)} // Wrap with a callback function
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={username} />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={username} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOk}>ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SpecificStudentContainer;
