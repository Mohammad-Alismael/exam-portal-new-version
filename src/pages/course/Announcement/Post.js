import React, { Component, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Comment from "../../../components/Comment";
import classNames from "classnames";
import classnames from "classnames";
import LongMenu from "../../../components/LongMenu";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentElement from "./AddCommentElement";
import CommentContainer from "./CommentContainer";
import { fetchComments } from "../../../api/services/Comment";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import {deleteAnnoucmentFile, deleteAnnouncement, deleteAnnouncementFile} from "../../../api/services/Annoucments";
import EditEditor from "./EditEditor";
import { setCourseAnnouncements } from "../../../actions/CourseAction";
import { Badge } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: "10px",
    margin: "auto auto 0.8rem auto",
  },
  userContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyItems: "center",
  },
  icon: {
    marginTop: "0.2rem",
  },
  userInfo: {
    // backgroundColor: 'red',
    display: "inline-flex",
    position: "relative",
  },
  username: {
    color: "black",
    fontSize: "1.2rem",
    margin: 0,
    padding: 0,
  },
  userType: {
    display: "inline-block",
    color: "#818181",
    fontSize: "0.7rem",
  },
  largeIcon: {
    width: 40,
    height: 40,
  },
  textField: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  uploadPreview: {
    padding: "0.8rem 0",
    maxWidth: "calc(100%)",
  },
  commentContainer: {
    marginTop: "0.62rem",
    backgroundColor: "#D9D9D9",
    padding: "0.6rem",
  },
  commentContainerOpen: {
    display: "block",
  },
  commentContainerClose: {
    display: "none",
  },
  addComment: {
    display: "flex",
    justifyItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    height: 41,
    "& input": {
      border: "none",
      width: "80%",
      fontSize: 18,
    },
    "& img": {
      width: 25,
    },
  },
}));
const calcState = (text) => {
  return text
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
    : EditorState.createEmpty();
};
function Post({ announcementId, createdAt, file, text }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.UserReducerV2);
  const course = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();
  const [editAnnouncement, setEditAnnouncement] = useState(false);
  const announcementIndex = course.announcements.findIndex(({ id }) => {
    return parseInt(announcementId) === parseInt(id);
  });

  const deleteFile = () => {
    // deleteAnnouncementFile(announcementId, ).then((data)=>{
    //
    // })
  }

  const handleEditAnnouncement = useCallback(
    (e) => {
      e.stopPropagation();
      setEditAnnouncement(!editAnnouncement);
    },
    [editAnnouncement]
  );

  const handleDeleteAnnouncement = useCallback(
    (e) => {
      e.stopPropagation();
      deleteAnnouncement(announcementId, course.courseId)
        .then((data) => {
          console.log(JSON.parse(text).blocks[0].text);
          const announcements = course.announcements.filter(({ id }) => {
            return id !== announcementId;
          });
          dispatch(setCourseAnnouncements(announcements));
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [announcementId, course.courseId, course.announcements, dispatch]
  );

  return (
    <Paper elevation={5} className={classes.paperStyle}>
      <div className={classes.userContainer}>
        <div className={classes.userInfo}>
          <Avatar
            className={classes.icon}
            alt={user.username}
            src="/static/images/avatar/2.jpg"
          />
          <div style={{ marginLeft: "0.8rem" }}>
            <Typography className={classes.username} data-cy="username">
              <b>
                {course.course_info?.instructor?.username}
                <span style={{ color: "#BBBBBB", fontSize: 14 }}>
                  . {moment(createdAt).fromNow()}
                </span>
              </b>
            </Typography>
            <Typography className={classes.userType}>Instructor</Typography>
          </div>
        </div>
        {parseInt(user.role_id) === 3 ? (
          <LongMenu
            options={["Edit Post", "Delete Post"]}
            icons={[<EditIcon />, <DeleteOutlineIcon />]}
            functions={[handleEditAnnouncement, handleDeleteAnnouncement]}
          />
        ) : null}
      </div>
      <Grid item xs={12} style={{ padding: "0 0.8rem" }} data-cy="post">
        {!editAnnouncement ? (
          <>
            <Editor
              toolbarClassName={classes.toolbarEditor}
              wrapperClassName={classes.wrapperEditor}
              editorClassName={classes.editor}
              editorState={calcState(text)}
              readOnly={true}
              toolbarHidden
            />
            {file && (
              <img style={{ width: "100%" }} src={file} alt="Uploaded" />
            )}
          </>
        ) : (
          <>
            <EditEditor
              announcementId={announcementId}
              text={text}
              setEditAnnouncement={setEditAnnouncement}
            />
            {file && (
              <Badge
                badgeContent="x"
                color="primary"
                onClick={() => alert("delete image")}
              >
                <img
                  style={{ width: "100%", cursor: "pointer" }}
                  src={file}
                  alt="Uploaded"
                />
              </Badge>
            )}
          </>
        )}
      </Grid>
      <CommentContainer
        announcementIndex={announcementIndex}
        announcementId={announcementId}
      />
    </Paper>
  );
}

export default Post;
