import classnames from "classnames";
import Comment from "../../../components/Comment";
import AddCommentElement from "./AddCommentElement";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { fetchComments } from "../../../api/services/Comment";
import { useSelector } from "react-redux";
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
}));
export default function CommentContainer({
  openCommentContainer,
  announcementIndex,
  announcementId,
}) {
  const classes = useStyles();
  const course = useSelector((state) => state.CourseReducer);

  return (
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
  );
}

CommentContainer.propTypes = {
  openCommentContainer: PropTypes.bool,
  announcementId: PropTypes.number,
};
