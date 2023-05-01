import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import Grid from "@material-ui/core/Grid";
import LongMenu from "./LongMenu";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../api/services/Comment";
import { setCourseAnnouncements } from "../actions/CourseAction";
import { useDispatch, useSelector } from "react-redux";
import { SET_COURSE_ANNOUNCEMENTS } from "../store/actions";
const useStyles = makeStyles((theme) => ({
  Container: {
    marginBottom: "0.8rem",
    display: "flex",
    flexDirection: "row",
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
  howManyComments: {
    margin: "10px 0 0 0",
    color: "#818181",
    fontSize: "0.85rem",
  },
  CommentContent: {
    padding: "0.6rem",
    backgroundColor: "#F1F2F6",
    width: "92%",
    marginLeft: "1rem",
    borderRadius: "10px 0 0 10px",
  },
  dots: {
    backgroundColor: "#F1F2F6",
    borderRadius: "0 10px 10px 0",
  },
}));

function Comment({
  commentId,
  text,
  file,
  userInfo,
  createdAt,
  announcementIndex,
}) {
  const classes = useStyles();
  const course = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();

  return (
    <div className={classes.Container}>
      <Avatar
        className={classes.icon}
        alt={"m"}
        src="/static/images/avatar/2.jpg"
      />
      <div className={classes.CommentContent}>
        <Typography className={classes.username}>
          <b>
            {userInfo?.username}{" "}
            <span style={{ color: "#BBBBBB", fontSize: 14 }}>
              <span style={{ color: "#646464", fontSize: 12 }}>
                ({userInfo?.role_id === 3 ? "Admin" : "Student"})
              </span>
              .{moment(createdAt).fromNow()}
            </span>
          </b>
        </Typography>
        <Typography
          style={{ color: "black" }}
          sx={{ ml: 1, mb: 1, flex: 1 }}
          variant="body1"
        >
          {text}
        </Typography>
      </div>
      <div className={classes.dots}>
        <LongMenu
          options={["Delete Comment"]}
          icons={[<DeleteOutlineIcon />]}
          functions={[
            function (e) {
              e.stopPropagation();
              deleteComment(commentId)
                .then((data) => {
                  let announcementObj = course.announcements[announcementIndex];
                  announcementObj.comments = announcementObj.comments.filter(
                    ({ id }) => {
                      return id !== commentId;
                    }
                  );
                  course.announcements[announcementIndex] = announcementObj;
                  dispatch({
                    type: SET_COURSE_ANNOUNCEMENTS,
                    payload: { announcements: course.announcements },
                  });
                  // dispatch(setCourseAnnouncements(course.announcements))
                })
                .catch(console.log);
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Comment;
