import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@material-ui/core/Typography';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classes from '../../img/classes.jpg'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AccountCircle from "@mui/icons-material/AccountCircle";
import PublishIcon from '@mui/icons-material/Publish';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Link from '@mui/material/Link';
import Grid from "@material-ui/core/Grid";
import index from "@mui/material/darkScrollbar";
import {useEffect} from "react";
import axios from 'axios'
import {connect, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Title} from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/material/LinearProgress';
import useClipboard from 'react-hook-clipboard'
import {getTableSortLabelUtilityClass} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {useNavigate, useParams} from "react-router-dom";
import { styled } from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import * as Actions from "../../store/actions";
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import Container from "@mui/material/Container";
import AnnouncementComponent from "./Announcement/AnnouncementComponent";
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from "@mui/material/Avatar";
import TextField from '@mui/material/TextField';
import Announcement from "./Announcement/Announcement";
import { withStyles } from "@material-ui/core/styles";
import {fetchCourseInfo} from "../../api/services/Course";
import { useDispatch } from 'react-redux'
import {SET_COURSE_ID} from "../../store/actions";
import {CourseAction} from "../../actions/CourseAction";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    paperStyle: {
        padding: 30,
        height: '28vh',
        width: '63%',
        margin: "30px auto",
        backgroundImage: `url(${classes})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    mainGrid: {
        width: '68%',
        margin: "30px auto",
    },
    textPaper: {
        padding: 20,
        height: '8vh',
        width: '50.5%',
        margin: "30px auto",

    },
    button: {
        width: '112px',
        fontSize: 15,
        padding: '12px',
        margin: theme.spacing(1),
        borderRadius: "5em",
        color: '#156bc1',
        marginBottom: '20px',
    },
    classworkPaper: {
        padding: 30,
        height: '100%',
        width: '63%',
        margin: "30px auto",
    }
}));
const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);
function Course(props) {
    const classes = useStyles();
    const { course_id } = useParams();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = React.useState(true);
    const [announcements,setAnnouncements] = React.useState([
        {instructorId: 10,announcementText: "tmrw we have a quiz!",createdAt: 1658749897526},
        {instructorId: 10,announcementText: "tmrw we have a final!tmrw we have a final!tmrw we have a final!tmrw we have a final!",createdAt: 1658749899526}
    ]);
    const user = useSelector(state => state.UserReducerV2).user;
    const course = useSelector(state => state.CourseReducer);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
    }));
    useEffect(()=>{
        const controller = new AbortController();
        dispatch({ type: SET_COURSE_ID, payload : {courseId: course_id} })
        fetchCourseInfo(course_id,controller).then((data)=>{
            dispatch(CourseAction(data))
            setIsLoading(false)
        })
        return () => {
            controller.abort();
        };
    },[])

    return (
        <div>
            <ResponsiveAppBar />
            { isLoading ? <LinearProgress /> :
            <Box>
                <Paper elevation={5} className={classes.paperStyle}>
                  <WhiteTextTypography variant="h4" style={{ marginTop: '15%' }}>
                     <b>{course?.course_info?.class_name}</b>
                  </WhiteTextTypography>
                  <WhiteTextTypography variant="h4" style={{ fontSize: '25px' }}>
                      section {course?.course_info?.section.toUpperCase()}
                  </WhiteTextTypography>
                </Paper>
                <Grid container spacing={2} className={classes.mainGrid}>
                    <Grid item xs={3}>
                        <Item>
                            <Typography variant="h6">Upcoming</Typography>
                            <Typography variant="caption">Woohoo, no work due soon!</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={9}>
                        {parseInt(user.role_id) === 3 ? <Announcement /> : null}
                        <Grid item>
                            {
                                course.announcements.sort(function(a, b) {
                                    return b.created_at - a.created_at;
                                }).map(({instructorId,announcement_text,file_path,created_at},index)=>{

                                    return <AnnouncementComponent
                                        key={index}
                                        file={file_path}
                                        text={announcement_text}
                                        createdAt={created_at}/>
                                })
                            }

                        </Grid>
                    </Grid>
                </Grid>
            </Box> }
        </div>
    );
}
export default Course;