import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import {InputBase} from "@material-ui/core";

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import classes from "../../../img/classes.jpg";
import Divider from "@material-ui/core/Divider";
import {createAnnouncement, uploadFileAnnouncement} from "../../../api/services/Annoucments";
import {toast} from "react-toastify";
import {SET_COURSE_ANNOUNCEMENTS, SET_COURSE_ID} from "../../../store/actions";
import {setCourseAnnouncements} from "../../../actions/CourseAction";
import {BASE_URL} from "../../../api/axios";
const useStyles = makeStyles((theme) => ({
    btnContainer:{
        padding: '0 0.8rem',
        // backgroundColor: 'red'
    },
    btnContainer2:{
        padding: '0.8rem',
        // backgroundColor: 'blue'
    },
    uploadPreview: {
        padding: '0.8rem',
        maxWidth: 'calc(100% - 1.6rem)',
        // height: '75%'
    }
}));
const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor"
})((p) => ({
    // input label when focused
    "& label.Mui-focused": {
        color: p.focusColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: p.focusColor
        }
    }
}));
function Announcement(props) {
    const user = useSelector(state => state.UserReducerV2).user;
    const course = useSelector(state => state.CourseReducer);
    const classes = useStyles();
    const dispatch = useDispatch()
    const [announcementText,setAnnouncementText] = React.useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState(null);
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
        const tmp = [...course.announcements,data]
        dispatch(setCourseAnnouncements(tmp))
    }
    const appendText = async () => {
        const data = await createAnnouncement(announcementText, course.courseId)
        updateList(data)
    }
    const uploadFile = async (data) => {
        const res = await uploadFileAnnouncement(data)
        let new_res  = {...res, file_path: `${BASE_URL}/${res.file_path}`}
        const tmp = [...course.announcements,new_res]
        dispatch(setCourseAnnouncements(tmp))
    }
    const post = async (e) => {
        e.preventDefault()
        if (announcementText != "" || formData != null) {
            let data = formData;
            formData != null && data.append('announcementText', announcementText)
            formData != null && data.append('courseId', course.courseId)
            formData != null && await uploadFile(data)
            formData == null && await appendText()
            setAnnouncementText('')
            setFormData(null)
            setSelectedFile(null)
        }else {
            toast.info("you can't post an empty text or empty file")
        }
    }
    return (
        <Paper elevation={5}>
            <Grid container>
                {selectedFile != null ?
                <Grid item xs={12}>
                    <img className={classes.uploadPreview} src={selectedFile.preview} alt={'img'}/>
                </Grid>
                    : null }
                <Grid item xs={12} className={classes.btnContainer}>
                    <CssTextField
                        fullWidth
                        focusColor={'rgb(255,208,94)'}
                        id="filled-basic"
                        variant="filled"
                        onChange={(e)=>(setAnnouncementText(e.target.value))}
                        value={announcementText}
                        label="Announce something to your class"
                        // startAdornment={
                        //     <InputAdornment position="start">
                        //         <Avatar alt={user['username']} src="/static/images/avatar/2.jpg" />
                        //     </InputAdornment>
                        // }
                    />

                    <Divider style={{marginBottom: '0.8rem'}}/>
                </Grid>
                <Grid container direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.btnContainer2}>
                    <IconButton aria-label="upload picture" component="label">
                        <input onChange={handleFileInput} hidden accept="image/*" type="file" />
                        <PublishIcon />
                    </IconButton>
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
        </Paper>
    );
}

export default Announcement;