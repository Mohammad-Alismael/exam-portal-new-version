import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classes from '../../img/classes.jpg'
import Grid from "@material-ui/core/Grid";
import {useEffect} from "react";
import {connect, useSelector} from "react-redux";
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate, useParams} from "react-router-dom";
import { styled } from '@mui/material/styles';
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import AnnounceComponent from "./Announcement/AnnounceComponent";
import Announcement from "./Announcement/Announcement";
import { withStyles } from "@material-ui/core/styles";
import {fetchCourseInfo} from "../../api/services/Course";
import { useDispatch } from 'react-redux'
import {SET_COURSE_ID} from "../../store/actions";
import {CourseAction} from "../../actions/CourseAction";
import NoAnnouncement from "./Announcement/NoAnnouncement";

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
                                course.announcements.length !== 0 && course.announcements.sort(function(a, b) {
                                    return b.created_at - a.created_at;
                                }).map(({instructorId,announcement_text,file_path,created_at},index)=>{

                                    return <AnnounceComponent
                                        key={index}
                                        file={file_path}
                                        text={announcement_text}
                                        createdAt={created_at}/>
                                })
                            }
                            {
                                course.announcements.length === 0 ? <NoAnnouncement /> : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box> }
        </div>
    );
}
export default Course;