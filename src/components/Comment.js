import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import Grid from "@material-ui/core/Grid";
import LongMenu from "./LongMenu";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {deleteComment} from "../api/services/Comment";
import {setCourseAnnouncements} from "../actions/CourseAction";
import {useDispatch, useSelector} from "react-redux";
import {SET_COURSE_ANNOUNCEMENTS} from "../store/actions";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: "10px",
        margin: "auto auto 0.6rem auto",
    },
    userContainer: {
        width:'100%',
        position: 'relative',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        justifyItems: "center",
    },
    icon:{
        marginTop: '0.2rem'
    },
    userInfo:{
        // backgroundColor: 'red',
        display: "inline-flex",
        position: 'relative'
    },
    username: {
        color: "black",
        fontSize: '1.2rem',
        margin: 0,
        padding: 0
    },
    userType:{
        display: 'inline-block',
        color: "#818181",
        fontSize: '0.7rem'
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
        margin: '10px 0 0 0',
        color: "#818181",
        fontSize: '0.85rem'
    }
}));

function Comment({commentId,text,file,username,createdAt,announcementIndex}) {
    const classes = useStyles();
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();

    return (
        <Paper elevation={0} className={classes.paperStyle}>
            <div className={classes.userContainer}>
                <div className={classes.userInfo}>
                    <Avatar className={classes.icon} alt={"m"} src="/static/images/avatar/2.jpg" />
                    <div style={{marginLeft: '0.8rem'}}>
                        <Typography
                            className={classes.username}>
                            <b>{username} <span style={{color: '#BBBBBB',fontSize: 14}}>. {moment(createdAt).fromNow()}</span></b>
                        </Typography>
                        <Typography className={classes.userType}>
                            Student
                        </Typography>
                    </div>
                </div>
                <LongMenu
                    options={["Delete Comment"]}
                    icons={[<DeleteOutlineIcon />]}
                    functions={[function (e) {
                        e.stopPropagation()
                        deleteComment(commentId).then((data)=>{
                            let announcementObj = course.announcements[announcementIndex]
                            announcementObj.comments = announcementObj.comments.filter(({id})=>{
                                return id !== commentId
                            })
                            course.announcements[announcementIndex] = announcementObj
                            dispatch({
                                type: SET_COURSE_ANNOUNCEMENTS,
                                payload: { announcements: course.announcements },
                            });
                            // dispatch(setCourseAnnouncements(course.announcements))
                        }).catch(console.log)
                    }]}
                />
            </div>

            {file != null ? (
                <Grid item xs={12}>
                    <img className={classes.uploadPreview} src={file} alt={"img"} />
                </Grid>
            ) : null}
            <Grid item xs={12}>
                <Typography
                    style={{ color: "black" }}
                    sx={{ ml: 1,mb:1, flex: 1 }}
                    variant="body1"
                >
                    {text}
                </Typography>
            </Grid>
        </Paper>
    );
}

export default Comment;