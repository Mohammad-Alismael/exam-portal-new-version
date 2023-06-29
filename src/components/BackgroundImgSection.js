import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditClassroom from "../pages/classes/EditClassroom";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function BackgroundImgSection(props) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <Paper
      elevation={5}
      className={props.classes.paperStyle}
      style={{
        backgroundImage: `url(${props.course?.course_info?.img_path})`,
      }}
    >
      {parseInt(props.user.role_id) === 3 ? (
        <Button onClick={() => setEditOpen(!editOpen)}>edit</Button>
      ) : null}
      {editOpen ? (
        <EditClassroom open={() => setEditOpen(true)} setEditOpen={setEditOpen} />
      ) : null}
      <CourseNameHeader variant="h4" sx={{ color: "black" }}>
        <b>{props.course?.course_info?.class_name}</b>
      </CourseNameHeader>
      <CourseSectionHeader variant="h3" id="course-section">
        section {props.course?.course_info?.section.toUpperCase()}
      </CourseSectionHeader>
      <div className={props.classes.instructorInfo}>
        <img
          alt="img"
          loading
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo3luud5KPZknLR5zdUUwzvYBztWgTxrkbA&usqp=CAU"
        />
        <p>
          {parseInt(props.user.role_id) === 3
            ? props.user.username
            : props.course?.course_info?.instructor?.username}
        </p>
      </div>
    </Paper>
  );
}

const CourseNameHeader = withStyles({
    root: {
        color: "#FFFFFF",
        fontSize: "6vmin",
    },
})(Typography);

const CourseSectionHeader = withStyles({
    root: {
        color: "#FFFFFF",
        fontSize: "3.5vmin",
    },
})(Typography);

export default BackgroundImgSection;
