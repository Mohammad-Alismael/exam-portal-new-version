import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Suspense, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Post from "./Announcement/Post";
import CreateAnnouncement from "./Announcement/CreateAnnouncement";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  fetchCourseInfoAction,
  fetchCourseInfoFailure,
  load5MoreAction,
} from "../../actions/CourseAction";
import NoAnnouncement from "./Announcement/NoAnnouncement";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CourseContainer } from "../../components/Sidebar/Sidebar.styles";
import Button from "@mui/material/Button";
import EditClassroom from "../classes/EditClassroom";
import NavbarDashboard from "../../layouts/Navbar/NavbarDashboard";
import { Skeleton } from "@mui/material";
import NotFound from "../../components/NotFound";
import LoadingSpinner from "../../components/LoadingSpinner";
import BackgroundImgSection from "../../components/BackgroundImgSection";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "blue",
  },
  paperStyle: {
    position: "relative",
    padding: 20,
    height: "28vh",
    width: "65%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "15px !important",
  },
  mainGrid: {
    width: "68%",
    justifyContent: "center",
  },
  textPaper: {
    padding: 20,
    height: "8vh",
    width: "50.5%",
    margin: "30px auto",
  },
  button: {
    width: "112px",
    fontSize: 15,
    padding: "12px",
    margin: theme.spacing(1),
    borderRadius: "5em",
    color: "#156bc1",
    marginBottom: "20px",
  },
  classworkPaper: {
    padding: 30,
    height: "100%",
    width: "63%",
    margin: "30px auto",
  },
  instructorInfo: {
    position: "absolute",
    bottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& img": {
      backgroundColor: "red",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "center",
    },
    "& p": {
      fontSize: "1.3rem",
      paddingLeft: "0.7rem",
      color: "#FFF",
    },
  },
}));

function CoursePage(props) {
  const classes = useStyles();
  const { course_id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducerV2);
  const course = useSelector((state) => state.CourseReducer);
  const location = useLocation();

  const load5MorePost = () => {
    const minId = course.announcements.reduce(
      (min, current) => (current.id < min ? current.id : min),
      course.announcements[0].id
    );
    dispatch(load5MoreAction(minId, course));
  };
  useEffect(() => {
    const controller = new AbortController();
    // dispatch(fetchCourseInfoFailure(null));
    dispatch(fetchCourseInfoAction(course_id, controller));
    return () => {
      controller.abort();
    };
  }, [location.pathname, course_id]);

  if (course.error != null) {
    return <NotFound error={course.error} />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        paddingTop: "4rem",
      }}
    >
      <BackgroundImgSection classes={classes} course={course} user={user} />
      <Grid container className={classes.mainGrid}>
        <Grid item xs={10}>
          {parseInt(user.role_id) === 3 ||
          course["course_info"]["allow_students_to_announcements"] === 1 ? (
            <CreateAnnouncement />
          ) : null}
          {!course.isLoading ? (
            <Grid item>
              {course?.announcements?.length &&
                course?.announcements
                  .sort(function (a, b) {
                    return (
                      new Date(a.created_at).getTime() -
                      new Date(b.created_at).getTime()
                    );
                  })
                  .map(
                    (
                      { id, announcement_text, file_path, created_at },
                      index
                    ) => {
                      return (
                        <Post
                          key={id}
                          file={file_path}
                          announcementId={id}
                          text={announcement_text}
                          createdAt={created_at}
                        />
                      );
                    }
                  )}
              {course?.announcements?.length === 0 ? <NoAnnouncement /> : null}
            </Grid>
          ) : null}
          <Grid item>
            {course.isLoading
              ? [...Array(5).keys()].map((val, index) => {
                  return (
                    <Skeleton
                      sx={{ background: "#fff", mb: 4 }}
                      variant="rectangular"
                      height={51}
                    />
                  );
                })
              : null}
          </Grid>
        </Grid>
      </Grid>
      {course?.announcements?.length >= 5 ? (
        <Button sx={{ mb: 10 }} variant="contained" onClick={load5MorePost}>
          load more
        </Button>
      ) : null}
    </Box>
  );
}

export default CoursePage;
