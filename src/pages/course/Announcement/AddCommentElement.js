import PropTypes from "prop-types";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {toast} from "react-toastify";
import {createComment} from "../../../api/services/Comment";
import {useDispatch, useSelector} from "react-redux";
import {setCourseAnnouncements} from "../../../actions/CourseAction";
import {SET_COURSE_ANNOUNCEMENTS} from "../../../store/actions";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
const useStyles = makeStyles((theme) => ({
    addComment: {
        position: 'relative',
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        height: 41,
        "& input":{
            border: 'none',
            width: '80%',
            fontSize: 18
        }
    },
    icon: {
        width: 35,
        cursor: 'pointer',
        color : '#b9b9b9',
        "& :hover":{
            color : 'rgba(0,0,0,0.8)',
            transition: 'color 0.6s'
        }
    }
}));
export default function AddCommentElement({announcementId,announcementIndex}) {
    const [commentText,setCommentText] = useState()
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();

    const postComment = (e) => {
        e.preventDefault()
        createComment(commentText,announcementId).then((res)=>{
            if (res.status !== 204) {
                let announcementObj = course.announcements[announcementIndex]
                let currentCommentArray = announcementObj.comments
                currentCommentArray.push(res.data)
                announcementObj.comments = currentCommentArray
                course.announcements[announcementIndex] = announcementObj
                dispatch({
                    type: SET_COURSE_ANNOUNCEMENTS,
                    payload: { announcements: course.announcements },
                });
                // dispatch(setCourseAnnouncements(course.announcements))
            }else {
                toast.error('comment already existed!')
            }
        }).catch(console.log)
    }

    const classes = useStyles();
    return <div className={classes.addComment}>
        <AttachFileIcon className={classes.icon}/>
        <input
            type={"text"}
            placeholder={"add class comment"}
            onChange={(e)=>(setCommentText(e.target.value))}
        />
        <SendIcon className={classes.icon} onClick={postComment} />
    </div>;
}
