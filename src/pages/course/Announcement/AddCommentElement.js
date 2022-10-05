import PropTypes from "prop-types";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {toast} from "react-toastify";
import {createComment} from "../../../api/services/Comment";
import {useDispatch, useSelector} from "react-redux";
import {setCourseAnnouncements} from "../../../actions/CourseAction";
import {SET_COURSE_ANNOUNCEMENTS} from "../../../store/actions";
const useStyles = makeStyles((theme) => ({
    addComment: {
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        height: 41,
        "& input":{
            border: 'none',
            width: '80%',
            fontSize: 18
        },
        "& img":{
            width: 25,
            cursor: 'pointer'
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
        <img src={"/images/icons/paper_clip_icon.svg"} alt={"paper_clip_icon"}/>
        <input
            type={"text"}
            placeholder={"add class comment"}
            onChange={(e)=>(setCommentText(e.target.value))}
        />
        <img src={"/images/icons/send_icon.svg"} alt={"send_icon"} onClick={postComment}/>
    </div>;
}
