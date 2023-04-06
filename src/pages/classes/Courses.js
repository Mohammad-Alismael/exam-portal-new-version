import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClassCard from "./ClassCard";
import { Fab, FormGroup, Skeleton, Typography } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import jwt from "jwt-decode";
import { token } from "../../api/axios";
import CryptoJS from "crypto-js";
import useClipboard from "react-hook-clipboard";
import CreateClassroom from "./CreateClassroom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CourseContainer } from "../../components/Sidebar/Sidebar.styles";
import ContainerWithHeader from "../../components/ContainerWithHeader/ContainerWithHeader";
import NavbarDashboard from "../../layouts/Navbar/NavbarDashboard";
import { getCoursesAction } from "../../actions/CourseAction";

const useStyles = makeStyles((theme) => ({
  createClass: {
    height: 190,
    "& button": {
      marginLeft: "50%",
      transform: "translate(-50%,200%)",
    },
  },
  noClass: {
    transform: "translate(0%,100%)",
  },
  addClassBtn: {
    position: "absolute",
    bottom: "3%",
    right: "2%",
  },
  defaultImgs: {
    width: 290,
    margin: 1,
    cursor: "pointer",
  },
}));

function Courses(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clipboard, copyToClipboard] = useClipboard();
  const { user } = useSelector((state) => state.UserReducerV2);
  const courseList = useSelector((state) => state.CourseListReducer);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    dispatch(getCoursesAction(controller));
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <NavbarDashboard loading={courseList.isLoading} />
      <Sidebar />
      <CourseContainer>
        <ContainerWithHeader
          title="overview courses"
          children={
            <Grid container spacing={2}>
              {!courseList.isLoading &&
                courseList.courseList.map((course, index) => {
                  const {
                    class_name,
                    classroom_id,
                    section,
                    instructor_info,
                    img_path,
                  } = course;
                  const isStudent = parseInt(user?.role_id) === 3;

                  const options = isStudent
                    ? ["invitation link"]
                    : ["withdraw course"];

                  const functions = isStudent
                    ? [
                        function (e) {
                          const user_data = jwt(token);
                          const textBeforeHash = `${classroom_id}:${user_data.username}:${class_name}`;
                          let encrypted = encodeURIComponent(
                            CryptoJS.AES.encrypt(
                              textBeforeHash,
                              process.env.REACT_APP_INVITATION_KEY
                            )
                          ).toString();
                          copyToClipboard(
                            window.location.origin + "/invitation/" + encrypted
                          );
                          toast.info("copied to clipboard");
                        },
                      ]
                    : [
                        function (e) {
                          toast.info("withdraw course");
                        },
                      ];

                  return (
                    <ClassCard
                      key={index}
                      username={
                        isStudent ? user.username : instructor_info["username"]
                      }
                      courseInfo={course}
                      id={classroom_id}
                      options={options}
                      functions={functions}
                    />
                  );
                })}
              {courseList.isLoading
                ? [...Array(10).keys()].map((val, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={3}>
                        <Skeleton sx={{background: 'white'}} variant="rounded" width={300} height={180} />
                      </Grid>
                    );
                  })
                : null}
              {!courseList.isLoading && courseList.courseList?.length === 0 ? (
                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.createClass}>
                    <Typography
                      variant="h5"
                      align="center"
                      className={classes.noClass}
                    >
                      you haven't join any courses yet.
                    </Typography>
                  </Card>
                </Grid>
              ) : null}
            </Grid>
          }
        />

        {parseInt(user?.role_id) === 3 ? (
          <div className={classes.addClassBtn}>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
          </div>
        ) : null}
      </CourseContainer>

      <CreateClassroom
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default Courses;
