import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import classes from "../../img/classes.jpg";
import Grid from "@material-ui/core/Grid";
import {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import Post from "./Announcement/Post";
import CreateAnnouncement from "./Announcement/CreateAnnouncement";
import { withStyles } from "@material-ui/core/styles";
import { fetchCourseInfo } from "../../api/services/Course";
import { useDispatch } from "react-redux";
import {SET_COURSE_ANNOUNCEMENTS, SET_COURSE_ID} from "../../store/actions";
import { CourseAction } from "../../actions/CourseAction";
import NoAnnouncement from "./Announcement/NoAnnouncement";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CourseContainer } from "../../components/Sidebar/Sidebar.styles";
import Button from "@mui/material/Button";
import EditClassroom from "../classes/EditClassroom";
import NavbarDashboard from "../../layouts/Navbar/NavbarDashboard";
import {CircularProgress} from "@material-ui/core";
import {Check} from "@mui/icons-material";
import {fetch5More} from "../../api/services/Annoucments";
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
const CourseNameHeader = withStyles({
    root: {
        color: "#FFFFFF",
        fontSize: '6vmin'
    },
})(Typography);

const CourseSectionHeader = withStyles({
    root: {
        color: "#FFFFFF",
        fontSize: '3.5vmin'
    },
})(Typography);

function CoursePage(props) {
    const classes = useStyles();
    const { course_id } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const {user} = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const {courseList} = useSelector((state)=> state.CourseListReducer);
    const [loadingPosts,setLoadingPosts] = useState(false)
    const location = useLocation();
    const [editOpen,setEditOpen] = useState(false);
    const courseObj = courseList.filter(({classroom_id},index)=> {
        return classroom_id === course_id;
    })[0];
    console.log(courseObj)
    const load5MorePost = () =>{
        // setLoadingPosts(true)
        const minId = course.announcements.reduce((min, current) => current.id < min ? current.id : min, course.announcements[0].id);
        fetch5More(minId).then((data)=>{
            const newAr = course.announcements.concat(data);
            dispatch({ type: SET_COURSE_ANNOUNCEMENTS, payload: { announcements: newAr } });
        }).catch(console.log)
    }
    useEffect(() => {
        const controller = new AbortController();
        dispatch({ type: SET_COURSE_ID, payload: { courseId: course_id } });
        fetchCourseInfo(course_id, controller)
            .then((data) => {
                dispatch(CourseAction(data));
                setIsLoading(false);
            })
            .catch(console.log);
        return () => {
            controller.abort();
        };
    }, [location.pathname]);
    useEffect(() => {
        console.log("this is from course page", course.announcements);
    }, [course.announcements.length]);
    return (
        <div>
            <NavbarDashboard loading={isLoading}/>
            <>
                <Sidebar />
                <CourseContainer>
                    <Box sx={{display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center',gap: '2rem', paddingTop: '4rem'}}>
                        <Paper
                            elevation={5}
                            className={classes.paperStyle}
                            style={{
                                backgroundImage: `url(${course?.course_info?.img_path})`,
                            }}
                        >
                            {parseInt(user.role_id) === 3 ?<Button onClick={(e)=>{setEditOpen(!editOpen)}}>edit</Button> : null}
                            {editOpen ? <EditClassroom open={editOpen} setEditOpen={setEditOpen}/> : null}
                            <CourseNameHeader variant="h4">
                                <b>{course?.course_info?.class_name}</b>
                            </CourseNameHeader>
                            <CourseSectionHeader variant="h3">
                                section {course?.course_info?.section.toUpperCase()}
                            </CourseSectionHeader>
                            <div className={classes.instructorInfo}>
                                <img
                                    alt="img"
                                    loading
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo3luud5KPZknLR5zdUUwzvYBztWgTxrkbA&usqp=CAU"
                                />
                                <p>
                                    {parseInt(user.role_id) === 3
                                        ? user.username
                                        : course?.course_info?.instructor["username"]}
                                </p>
                            </div>
                        </Paper>
                        <Grid container className={classes.mainGrid}>
                            <Grid item xs={10}>
                                {parseInt(user.role_id) === 3 ||courseObj['allow_students_to_announcements'] === 1 ? <CreateAnnouncement /> : null}
                                <Grid item>
                                    {course.announcements.length !== 0 &&
                                        course.announcements
                                            .sort(function (a, b) {
                                                return b.created_at - a.created_at;
                                            })
                                            .map(
                                                (
                                                    { id, announcement_text, file_path, created_at },
                                                    index
                                                ) => {
                                                    return (
                                                        <Post
                                                            key={index}
                                                            file={file_path}
                                                            announcementId={id}
                                                            text={announcement_text}
                                                            createdAt={created_at}
                                                        />
                                                    );
                                                }
                                            )}
                                    {course.announcements.length === 0 ? (
                                        <NoAnnouncement />
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Grid>
                        {course.announcements.length >= 5 ? <Button sx={{mb: 10}} variant="contained" onClick={load5MorePost}>load more</Button> : null}
                    </Box>
                </CourseContainer>
            </>
        </div>
    );
}

export default CoursePage;
