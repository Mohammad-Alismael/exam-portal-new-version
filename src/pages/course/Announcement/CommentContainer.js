import classnames from "classnames";
import Comment from "../../../components/Comment";
import AddCommentElement from "./AddCommentElement";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { fetchComments } from "../../../api/services/Comment";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
const useStyles = makeStyles((theme) => ({
  commentContainer: {
    marginTop: "0.62rem",
    backgroundColor: "#fff",
    padding: "0.6rem 0.6rem 0 0.6rem",
  },
  commentContainerOpen: {
    display: "block",
  },
  commentContainerClose: {
    display: "none",
  },
  commentsMetaData: {
    display: "inline-flex",
    padding: "10px",
    alignItems: "center",
  },
  howManyComments: {
    display: "inline-block",
    paddingLeft: "10px",
    margin: 0,
    color: "#818181",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  commentsIcon: {
    margin: 0,
    padding: 0,
    width: "18px",
  },
}));
export default function CommentContainer({
  announcementIndex,
  announcementId,
}) {
  const classes = useStyles();
  const course = useSelector((state) => state.CourseReducer);
  const [openCommentContainer, setOpenCommentContainer] = useState(false);
  const handleComments = (e) => {
    e.preventDefault();
    setOpenCommentContainer(!openCommentContainer);
  };
  return (
    <>
      <Divider />
      <div
        className={classes.commentsMetaData}
        onClick={handleComments}
        data-cy="comment-btn"
      >
        <img
          className={classes.commentsIcon}
          src="/images/icons/comments_icon.svg"
          alt="icon"
        />
        <p className={classes.howManyComments}>
          {course.announcements[announcementIndex].comments
            ? `${course.announcements[announcementIndex].comments.length} Comments`
            : "No Comments"}
        </p>
      </div>
      <Divider />
      <div
        className={classnames(
          openCommentContainer
            ? classes.commentContainerOpen
            : classes.commentContainerClose
        )}
      >
        <div className={classnames(classes.commentContainer)}>
          {course.announcements[announcementIndex].comments.map(
            ({ id, userInfo, text, created_at, file_path }) => {
              return (
                <Comment
                  key={id}
                  commentId={id}
                  text={text}
                  createdAt={created_at}
                  announcementIndex={announcementIndex}
                  userInfo={userInfo}
                />
              );
            }
          )}
        </div>
        <AddCommentElement
          announcementId={announcementId}
          announcementIndex={announcementIndex}
        />
      </div>
    </>
  );
}

CommentContainer.propTypes = {
  openCommentContainer: PropTypes.bool,
  announcementId: PropTypes.number,
};
