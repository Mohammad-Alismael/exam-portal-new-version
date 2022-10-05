import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import classes from "../../../img/classes.jpg";
import Divider from "@material-ui/core/Divider";
import {createAnnouncement, uploadFileAnnouncement} from "../../../api/services/Annoucments";
import {toast} from "react-toastify";
import {setCourseAnnouncements} from "../../../actions/CourseAction";
import {BASE_URL} from "../../../api/axios";
import Tooltip from "@mui/material/Tooltip";
import { Editor } from "react-draft-wysiwyg";
import {EditorState,convertToRaw,convertFromRaw} from 'draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Avatar from "@mui/material/Avatar";
import * as PropTypes from "prop-types";
import {SET_COURSE_ANNOUNCEMENTS} from "../../../store/actions";
const useStyles = makeStyles((theme) => ({
    btnContainer:{
        padding: '0 0.8rem',
        // height: 200,
        // backgroundColor: 'red'
    },
    btnContainer2:{
        padding: '0.8rem',
        // backgroundColor: 'blue'
    },
    icon:{
        // marginTop: '0.2rem'
    },
    uploadPreview: {
        padding: '0.8rem',
        maxWidth: 'calc(100% - 1.6rem)',
        // height: '75%'
    },
    templateContainer: {
        display: 'flex',
        borderRadius: '25px',
        padding: '0.4rem 0',
        marginBottom: '1.8rem',
        justifyItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        // height: 41,
        "& input":{
            border: 'none',
            width: '80%',
            fontSize: 18
        },
    }
}));

function AnnoucementTemplate(props) {
    return <div className={props.classes.templateContainer} onClick={props.onClick}>
        <Avatar className={props.classes.icon} alt={props.user.username} src="/static/images/avatar/2.jpg"/>

        <input
            type={"text"}
            placeholder={"add class comment"}
        />
        <img src={"/images/icons/paper_clip_icon.svg"} alt={"send_icon"}/>
    </div>;
}

AnnoucementTemplate.propTypes = {
    classes: PropTypes.any,
    onClick: PropTypes.func,
    user: PropTypes.any
};

function Announcement(props) {
    const {user} = useSelector(state => state.UserReducerV2);
    const course = useSelector(state => state.CourseReducer);
    const classes = useStyles();
    const dispatch = useDispatch()
    const [announcementText,setAnnouncementText] = React.useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState(null);
    const [openAnnouncement, setOpenAnnouncement] = useState(false);

    const handleClose = (e) => {
        e.preventDefault();
        setOpenAnnouncement(false);
    };
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const handleFileInput = (e) => {
        let myFiles = e.target.files;
        Object.assign(myFiles[0],
            {
                preview: URL.createObjectURL(myFiles[0]),
            }
        )
        setSelectedFile(myFiles[0])
        const formData = new FormData()
        Object.keys(myFiles).forEach(key => {
            formData.append(myFiles.item(key).name, myFiles.item(key))
        })
        // sending only one img
        setFormData(formData)
    }
    const updateList = (data) => {
        console.log('update list',data)
        const tmp = [...course.announcements,{...data}]
        dispatch({ type: SET_COURSE_ANNOUNCEMENTS, payload: { announcements: tmp } });

    }
    const appendText = async (announcementText) => {
        try {
            const data = await createAnnouncement(announcementText, course.courseId)
            console.log('this from the server',data)
            updateList(data)
        }catch (e) {
            if (e.status === 409)
                toast.error('announcement already existed!')
        }

    }
    const uploadFile = async (data) => {
        const res = await uploadFileAnnouncement(data)
        let new_res  = {...res, file_path: `${BASE_URL}/${res.file_path}`}
        const tmp = [...course.announcements,new_res]
        dispatch(setCourseAnnouncements(tmp))
    }
    const post = async (e) => {
        e.preventDefault()
        // if (announcementText != "" || formData != null) {
        //     let data = formData;
        //     formData != null && data.append('announcementText', announcementText)
        //     formData != null && data.append('courseId', course.courseId)
        //     formData != null && await uploadFile(data)
        //     formData == null && await appendText()
        //     setAnnouncementText('')
        //     setFormData(null)
        //     setSelectedFile(null)
        // }else {
        //     toast.info("you can't post an empty text or empty file")
        // }
        const db = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        await appendText(db)

    }
    return (
        <>
            {!openAnnouncement ? (
                <AnnoucementTemplate classes={classes} onClick={(e) => {
                    e.preventDefault()
                    setOpenAnnouncement(true)
                }} user={user}/>
            ): null}
            {openAnnouncement ? <Paper elevation={5}>
             <Grid container sx={{marginBottom: '0.8rem'}}>
                {selectedFile != null ?
                <Grid item xs={12}>
                    <img className={classes.uploadPreview} src={selectedFile.preview} alt={'img'}/>
                </Grid>
                    : null }

                <Grid item xs={12} className={classes.btnContainer}>
                    <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                    />
                </Grid>
                <Grid container direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      className={classes.btnContainer2}>
                    <Button
                        variant="outlined"
                        color="warning"
                        type="submit"
                        size="large"
                        onClick={handleClose}
                        sx={{mr:3}}
                    >
                        <b>cancel</b>
                    </Button>
                    <Button
                        onClick={post}
                        variant="contained"
                        color="warning"
                        type="submit"
                        size="large"
                    >
                        <b>post</b>
                    </Button>
                </Grid>
            </Grid>
        </Paper>: null}
            </>
    );
}

export default Announcement;