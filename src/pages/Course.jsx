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
import classes from '../img/classes.jpg'
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
import AnnouncementComponent from "../Components/AnnouncementComponent";
import index from "@mui/material/darkScrollbar";
import {useEffect} from "react";
import axios from 'axios'
import {connect} from "react-redux";
import {toast} from "react-toastify";
import Participants from "../Components/Participants";
import {Title} from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/material/LinearProgress';
import Exam from "../Components/Exam";
import useClipboard from 'react-hook-clipboard'
import {getTableSortLabelUtilityClass} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {useNavigate} from "react-router-dom";
import { styled } from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import * as Actions from "../store/actions";
import ExamCard from "../Components/ExamCard";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
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
        backgroundImage: `url(${classes})`

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

const theme2 = createTheme({
    typography: {
        h3: {
            fontSize: 32,
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: 'rgb(255,208,94)',
        }
    }
})


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 128,
    },
}));
function Course(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [announcements,setAnnouncements] = React.useState([]);
    const [exams,setExams] = React.useState([]);
    const [submission,setSubmission] = React.useState([]);
    const [announcementText,setAnnouncementText] = React.useState('');
    const [classroom,setClassroom] = React.useState([]);
    const [clipboard, copyToClipboard] = useClipboard();
    const navigate = useNavigate();
    const [adminUsername,setAdminUsername] = React.useState(props.user.role_id === 1 ? props.user.username : "")
    const handleChange = (event, newValue) => {
        if (props.user.role_id == 1 && newValue == 2){
            props.setQuestionArray([])
        }
        if (newValue == 5) {
            navigate("/courses")
        }else {
            setValue(newValue);
        }
        props.setTab(newValue)
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);

    const openMore = Boolean(anchorEl);
    const openSettings = Boolean(anchorEl2);
    const openQuiz = Boolean(anchorEl3);

    const handleClickMore = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
        setAnchorEl(null);
    };
    const handleClickSettings = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleCloseSettings = () => {
        setAnchorEl2(null);
    };
    const handleClickQuiz = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    const handleCloseQuiz = () => {
        setAnchorEl3(null);
    };
    const postAnnouncement = (e) =>{
        axios.post('http://localhost:8080/set-announcement-to-students',{
            instructorId: props.user.user_id,
            announcementText,

        }).then((data)=>{

        }).catch((error)=>{
            console.log(error)
            // toast.error("error happened!")
        })
        setAnnouncements([...announcements,{announcementText,instructorId:props.user.user_id,createdAt : new Date().getTime()}])

    }
    const loadAnnouncements = async () => {
        setIsLoading(true)
        const Announcements = await axios.get(`http://localhost:8080/get-announcements?id=${props.user.user_id}`)
        setAnnouncements(Announcements.data)
    }
    const loadAnnouncementsForStudents = async () => {
        const Announcements = await axios.post('http://localhost:8080/get-announcement-student-id', {
            studentId: props.user.user_id,
            classroomId: props.user.classroom_id
        })

        setAnnouncements(Announcements.data)
    }
    const getClassroom = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-class-students-from-instructor', {
                instructorId: props.user.user_id
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no class room students!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const getClassRoomForStudents = async () => {
        const classroom1 = await axios.post('http://localhost:8080/get-instructor-id-from-student-id', {
            classroomId: props.user.classroom_id
        })

        const instructorId = classroom1.data['instructorId'];
        const instructorInfo = await axios.post('http://localhost:8080/get-user-by-id', {
            userId: instructorId
        })
        console.log(instructorInfo)
        setAdminUsername(instructorInfo.data['username'])
        const classroomStudents = await axios.post('http://localhost:8080/get-class-students-from-student-id', {
            classroomId: props.user.classroom_id
        })
        console.log("classmates =>",classroomStudents.data)
        setClassroom([...classroomStudents.data])
        setIsLoading(false)
    }

    const getExamsList = async () => {
        console.log(props.user.user_id)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/list-all-exams-creator-id', {
                creatorId: props.user.user_id
            }).then((data) => {

                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no exams found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }
    const getExamListForStudents = async () => {
        const examss = await axios.post('http://localhost:8080/get-exam-id-student-id', {
            studentId: props.user.user_id,
            classroomId: props.user.classroom_id
        })
        return examss.data
    }
    useEffect(()=>{
        setValue(props.user.tab)
        if (props.user.role_id == 1){
            loadAnnouncements()
            getExamsList().then((data)=>{
                console.log('Exams =>',data)
                setExams(data)

            })
            getClassroom().then((data)=>{
                console.log('classroom =>',data)
                setClassroom(data)
                setIsLoading(false)
            })
        }
        else{
            loadAnnouncementsForStudents()
            getExamListForStudents().then((data)=>{
                const tmp = []
                data.map((val,index)=>{
                    tmp.push({
                            title: val[1],
                            examId:val[0],
                            points: val[2],
                            startingAt: val[3],
                            endingAt: val[4]
                        })
                    listSubmissionForStudents(val[0]).then((data)=>{
                        if (data){
                            setSubmission([...submission, {examId:val[0],title:val[1]}])
                        }
                    })
                })
                setExams([...tmp])
            })
            getClassRoomForStudents()
        }

    },[])
    const listSubmissionForStudents = async (examId) => {
        const submission = await axios.post('http://localhost:8080/check-submission', {
            creatorId: props.user.user_id,
            examId
        })
        return submission.data
    }
    const copyInvitationLink = async () => {
        const classroom = await axios.post('http://localhost:8080/get-classroom-id-by-instructor-id', {
            instructorId: props.user.user_id
        })
        let classroomId = classroom.data['id'];
        if (classroom.data['id'] == null){
            const classroom = await axios.post('http://localhost:8080/set-classroom-to-students', {
                instructorId: props.user.user_id
            })
            classroomId = classroom.data['id'];
        }
        props.setClassroomId(classroomId)
        const textBeforeHash = `${classroomId}:${props.user.username}`;
        const b64 = Buffer.from(textBeforeHash).toString('base64');
        copyToClipboard("http://localhost:3000/invitation/" + b64);
        toast.info("copied to clipboard");
        setAnchorEl2(null);
    }
    return (
        <div>
            <ResponsiveAppBar />
            {/*<Box sx={{ width: '100%', typography: 'body1' }}>*/}
            {/*        <TabContext value={value}>*/}
            {/*            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
            {/*                <Tabs onChange={handleChange} centered>*/}
            {/*                    <TabList>*/}
            {/*                        {props.user.role_id != 1 ? <Tab label="Classrooms" value="5" /> : null}*/}
            {/*                        <Tab label="Stream" value="1" />*/}
            {/*                        <Tab label="Classwork" value="2" />*/}
            {/*                        <Tab label="People" value="3" />*/}
            {/*                        <Tab label="Grades" value="4" />*/}
            {/*                    </TabList>*/}
            {/*                    <IconButton*/}
            {/*                        aria-label="more"*/}
            {/*                        id="long-button"*/}
            {/*                        aria-controls={openSettings ? "long-menu" : undefined}*/}
            {/*                        aria-expanded={openSettings ? "true" : undefined}*/}
            {/*                        aria-haspopup="true"*/}
            {/*                        onClick={handleClickMore}*/}
            {/*                    >*/}
            {/*                        <MoreVertIcon />*/}
            {/*                    </IconButton>*/}
            {/*                    <Menu*/}
            {/*                        id="long-menu2"*/}
            {/*                        MenuListProps={{*/}
            {/*                            "aria-labelledby": "long-button"*/}
            {/*                        }}*/}
            {/*                        anchorEl={anchorEl2}*/}
            {/*                        open={openSettings}*/}
            {/*                        onClose={handleCloseSettings}*/}
            {/*                        PaperProps={{*/}
            {/*                            style: {*/}
            {/*                                Height: 2 *4.5,*/}
            {/*                                width: "20ch"*/}
            {/*                            }*/}
            {/*                        }}*/}
            {/*                    >*/}

            {/*                        <MenuItem*/}
            {/*                            onClick={()=>(navigate('/logout'))}*/}
            {/*                            key={"logout"}*/}
            {/*                        >*/}
            {/*                            logout*/}
            {/*                        </MenuItem>*/}

            {/*                    </Menu>*/}
            {/*                </Tabs>*/}
            {/*            </Box>*/}
            {/*            { isLoading ? <LinearProgress /> : null}*/}
            {/*            { !isLoading ? <TabPanel value="1">*/}
            {/*                <Paper elevation={5} className={classes.paperStyle}>*/}
            {/*                    <Typography variant="h4" color="primary" style={{ marginTop: '15%' }}>*/}
            {/*                        <b>CS 434</b>*/}
            {/*                    </Typography>*/}
            {/*                    <Typography variant="h4" color="primary" style={{ fontSize: '25px' }}>*/}
            {/*                        OzU*/}
            {/*                    </Typography>*/}
            {/*                </Paper>*/}
            {/*                {props.user.role_id == 1 ? <Paper elevation={5} className={classes.textPaper} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>*/}
            {/*                    <IconButton sx={{ p: '10px' }}>*/}
            {/*                        <AccountCircle color="primary" size="large" />*/}
            {/*                    </IconButton>*/}
            {/*                    <InputBase*/}
            {/*                        sx={{ ml: 1, flex: 1 }}*/}
            {/*                        onChange={(e)=>(setAnnouncementText(e.target.value))}*/}
            {/*                        placeholder="Announce something to your class"*/}
            {/*                        inputProps={{ 'aria-label': 'search google maps' }}*/}
            {/*                    />*/}

            {/*                    <IconButton type="submit" sx={{ p: '10px' }}onClick={postAnnouncement}>*/}
            {/*                        <PublishIcon />*/}
            {/*                    </IconButton>*/}
            {/*                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />*/}
            {/*                    <IconButton*/}
            {/*                        aria-label="more"*/}
            {/*                        id="long-button"*/}
            {/*                        aria-controls={openMore ? "long-menu" : undefined}*/}
            {/*                        aria-expanded={openMore ? "true" : undefined}*/}
            {/*                        aria-haspopup="true"*/}
            {/*                        onClick={handleClickMore}*/}
            {/*                    >*/}
            {/*                        <MoreVertIcon />*/}
            {/*                    </IconButton>*/}
            {/*                    <Menu*/}
            {/*                        id="long-menu"*/}
            {/*                        MenuListProps={{*/}
            {/*                            "aria-labelledby": "long-button"*/}
            {/*                        }}*/}
            {/*                        anchorEl={anchorEl}*/}
            {/*                        open={openMore}*/}
            {/*                        onClose={handleCloseMore}*/}
            {/*                        PaperProps={{*/}
            {/*                            style: {*/}
            {/*                                Height: 2 *4.5,*/}
            {/*                                width: "20ch"*/}
            {/*                            }*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        {["copy invitation link"].map((option) => (*/}
            {/*                            <MenuItem*/}
            {/*                                key={option}*/}
            {/*                                onClick={copyInvitationLink}*/}
            {/*                            >*/}
            {/*                                {option}*/}
            {/*                            </MenuItem>*/}
            {/*                        ))}*/}
            {/*                    </Menu>*/}
            {/*                </Paper>:null}*/}
            {/*                <Grid>*/}
            {/*                    {*/}
            {/*                        announcements.sort(function(a, b) {*/}
            {/*                            return b.createdAt - a.createdAt;*/}
            {/*                        }).map((val,index)=>{*/}

            {/*                            return <AnnouncementComponent*/}
            {/*                                key={index}*/}
            {/*                                user_id={val.instructorId}*/}
            {/*                                text={val.announcementText}*/}
            {/*                                createdAt={val.createdAt}/>*/}
            {/*                        })*/}
            {/*                    }*/}

            {/*                </Grid>*/}
            {/*            </TabPanel> : null}*/}

            {/*            { !isLoading ? <TabPanel value="2">*/}
            {/*                <Paper elevation={0} className={classes.classworkPaper}>*/}
            {/*                    {*/}
            {/*                        exams.map((val,index)=>{*/}
            {/*                            console.log(val)*/}
            {/*                            return <Exam*/}
            {/*                                key={index}*/}
            {/*                                examTitle={val.title}*/}
            {/*                                examId={val.examId}*/}
            {/*                                startingAt={val.startingAt}*/}
            {/*                                endingAt={val.endingAt}*/}
            {/*                                        />*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                    {props.user.role_id == 1 ? <Button*/}
            {/*                        variant="contained"*/}
            {/*                        aria-label="more"*/}
            {/*                        id="long-button"*/}
            {/*                        aria-controls={openQuiz ? "long-menu" : undefined}*/}
            {/*                        aria-expanded={openQuiz ? "true" : undefined}*/}
            {/*                        aria-haspopup="true"*/}

            {/*                        onClick={handleClickQuiz}*/}
            {/*                    >*/}
            {/*                        <AddIcon />*/}
            {/*                        Dashboard*/}
            {/*                    </Button> : null }*/}
            {/*                    <Menu*/}
            {/*                        id="basic-menu"*/}
            {/*                        anchorEl={anchorEl3}*/}
            {/*                        open={openQuiz}*/}
            {/*                        onClose={handleClickQuiz}*/}
            {/*                        MenuListProps={{*/}
            {/*                            'aria-labelledby': 'basic-button',*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <Link href="/quiz"><MenuItem ><AssignmentIcon/>Exam/Quiz Assignment</MenuItem></Link>*/}
            {/*                    </Menu>*/}
            {/*                </Paper>*/}
            {/*            </TabPanel> : null}*/}

            {/*            { !isLoading ? <TabPanel value="3">*/}
            {/*                <Paper fullwidth elevation={0} >*/}
            {/*                    <Grid*/}
            {/*                        container*/}
            {/*                        spacing={0}*/}
            {/*                        direction="column"*/}
            {/*                        alignItems="center"*/}
            {/*                        justifyContent="center"*/}
            {/*                    >*/}
            {/*                        <Grid item xs={12}>*/}
            {/*                        <Typography variant="h2">*/}
            {/*                            Teachers*/}
            {/*                        </Typography>*/}
            {/*                        </Grid>*/}
            {/*                    <Participants  username={adminUsername}/>*/}
            {/*                    </Grid>*/}
            {/*                    <Grid*/}
            {/*                        container*/}
            {/*                        spacing={0}*/}
            {/*                        direction="column"*/}
            {/*                        alignItems="center"*/}
            {/*                        justifyContent="center"*/}
            {/*                    >*/}
            {/*                        <Typography variant="h2">*/}
            {/*                            Classmates*/}
            {/*                        </Typography>*/}
            {/*                        {*/}
            {/*                            classroom.map((val,index)=>{*/}
            {/*                                console.log(val)*/}
            {/*                                return <Participants username={val.username}/>*/}
            {/*                            })*/}
            {/*                        }*/}

            {/*                    </Grid>*/}
            {/*                </Paper>*/}
            {/*            </TabPanel> : null}*/}

            {/*            { !isLoading ? <TabPanel value="4">*/}
            {/*                {*/}
            {/*                    submission.map(({examId,title},index)=>{*/}
            {/*                        return (<ExamCard examId={examId} examTitle={title}/>)*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </TabPanel> : null}*/}
            {/*        </TabContext>*/}
            {/*    </Box>*/}
        </div>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
        questions : state.CreateReducer.questionsC
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUserId: (user_id) => dispatch({type:Actions.SET_USER_ID,
            payload : {user_id}}),
        setUsername: (username) => dispatch({type:Actions.SET_USERNAME,
            payload : {username}}),
        setRoleId: (role_id) => dispatch({type:Actions.SET_ROLE_ID,
            payload : {role_id}}),
        setClassroomId: (classroom_id) => dispatch({type:Actions.SET_CLASSROOM_ID,
            payload : {classroom_id}}),
        setTab: (tab) => dispatch({type:Actions.SET_TAB,
            payload : {tab}}),
        setQuestionArray: (newQuestionArray) => dispatch({type:Actions.SET_CREATE_EXAM_ARRAY,
            payload : {newQuestionArray}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Course)