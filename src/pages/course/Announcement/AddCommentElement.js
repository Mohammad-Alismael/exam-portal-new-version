import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { createComment } from "../../../api/services/Comment";
import { useDispatch, useSelector } from "react-redux";
import { setCourseAnnouncements } from "../../../actions/CourseAction";
import { SET_COURSE_ANNOUNCEMENTS } from "../../../store/actions";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Avatar from "@mui/material/Avatar";
const useStyles = makeStyles((theme) => ({
  addComment: {
    position: "relative",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    borderRadius: "10px",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    height: 39,
    width: "92%",
    border: "1px solid #818181",
    float: "right",
    "& input": {
      border: "none",
      width: "80%",
      fontSize: 18,
    },
  },
  icon: {
    width: 35,
    cursor: "pointer",
    color: "#b9b9b9",
    "& :hover": {
      color: "rgba(0,0,0,0.8)",
      transition: "color 0.6s",
    },
  },
}));
export default function AddCommentElement({
  announcementId,
  announcementIndex,
}) {
  const [commentText, setCommentText] = useState();
  const course = useSelector((state) => state.CourseReducer);
  const { user } = useSelector((state) => state.UserReducerV2);

  const dispatch = useDispatch();
  const setCommentValue = (e) => {
    setCommentText(e.target.value);
  };
  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment(commentText, announcementId);
      if (response.status === 204) {
        toast.error("Comment already exists!");
        return;
      }
      const announcement = course.announcements[announcementIndex];
      const comments = [...announcement.comments, response.data];
      const updatedAnnouncement = { ...announcement, comments };
      const updatedAnnouncements = [
        ...course.announcements.slice(0, announcementIndex),
        updatedAnnouncement,
        ...course.announcements.slice(announcementIndex + 1),
      ];
      dispatch({
        type: SET_COURSE_ANNOUNCEMENTS,
        payload: { announcements: updatedAnnouncements },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();

  return (
    <div style={{ display: "inline" }}>
      <Avatar
        style={{ display: "inline-flex" }}
        alt={user?.username}
        src="/static/images/avatar/2.jpg"
      />
      <div className={classes.addComment}>
        <input
          data-cy="post-comment-textfield"
          type="text"
          placeholder="write a comment ... "
          onChange={setCommentValue}
        />
        <AttachFileIcon className={classes.icon} />
        <SendIcon
          className={classes.icon}
          onClick={postComment}
          data-cy="post-comment-btn"
        />
      </div>
    </div>
  );
}
