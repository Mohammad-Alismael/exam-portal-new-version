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



function Course1(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
    const [isLoading, setIsLoading] = React.useState(false);
    const [announcements,setAnnouncements] = React.useState([]);
    const [exams,setExams] = React.useState([]);
    const [announcementText,setAnnouncementText] = React.useState('');
    const [classroom,setClassroom] = React.useState([]);
    const [clipboard, copyToClipboard] = useClipboard()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
            studentId: props.user.user_id
        })
        console.log(Announcements)
        Announcements.data.map((val,index)=>{
            console.log(val[0],val[1],val[2])
            setAnnouncements([...announcements,{instructorId:val[0],announcementText:val[1],createdAt:val[2]}])
        })
    }
    const getClassroom = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-class-students', {
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
            studentId: props.user.user_id
        })

        const instructorId = classroom1.data['instructorId']
        console.log(instructorId)
        const classroomStudents = await axios.post('http://localhost:8080/get-class-students', {
            instructorId
        })
        console.log(classroomStudents.data)
        classroomStudents.data.map((val,index)=>{
            if (val != null){
                setClassroom([...classroom,val])
            }
        })
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
            studentId: props.user.user_id
        })
        examss.data.map((val,index)=>{
            // console.log(val)
            setExams([...exams,{
                title: val[1],
                examId:val[0],
                points: val[2],
                startingAt: val[3],
                endingAt: val[4]
            }])
        })
    }
    useEffect(()=>{
        if (props.user.role_id == 1){
            loadAnnouncements()
            getExamsList().then((data)=>{
                console.log('Exams =>',data)
                setExams(data)
                setIsLoading(false)
            })
            getClassroom().then((data)=>{
                console.log('classroom =>',data)
                setClassroom(data)
            })
        }
        else{
            loadAnnouncementsForStudents()
            getExamListForStudents()
            getClassRoomForStudents()
        }






    },[])

    const copyInvitationLink = () =>{
        const textBeforeHash = `${props.user.user_id}:${props.user.username}`;
        const b64 = Buffer.from(textBeforeHash).toString('base64');
        copyToClipboard("http://localhost:3000/invitation/"+b64)
        toast.info("copied to clipboard");
    }
    return (
        <div>
            <ThemeProvider theme={theme2}>
                <Box sx={{ width: '100%', typography: 'body1' }}>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs onChange={handleChange} centered>
                                <TabList>
                                    <Tab label="Stream" value="1" />
                                    <Tab label="Classwork" value="2" />
                                    <Tab label="People" value="3" />
                                    <Tab label="Grades" value="4" />
                                </TabList>
                            </Tabs>
                        </Box>
                        { isLoading ? <LinearProgress /> : null}
                        { !isLoading ? <TabPanel value="1">
                            <Paper elevation={5} className={classes.paperStyle}>
                                <Typography variant="h4" color="primary" style={{ marginTop: '15%' }}>
                                    <b>CS 434</b>
                                </Typography>
                                <Typography variant="h4" color="primary" style={{ fontSize: '25px' }}>
                                    OzU
                                </Typography>
                            </Paper>

                            {props.user.role_id == 1 ? <Paper elevation={5} className={classes.textPaper} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                                <IconButton sx={{ p: '10px' }}>
                                    <AccountCircle color="primary" size="large" />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    onChange={(e)=>(setAnnouncementText(e.target.value))}
                                    placeholder="Announce something to your class"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />

                                <IconButton type="submit" sx={{ p: '10px' }}onClick={postAnnouncement}>
                                    <PublishIcon />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <MoreVertIcon onClick={copyInvitationLink} style={{courser: 'pointer'}}/>
                            </Paper>:null}
                            <Grid>
                                {
                                    announcements.sort(function(a, b) {
                                        return b.createdAt - a.createdAt;
                                    }).map((val,index)=>{

                                        return <AnnouncementComponent
                                            key={index}
                                            user_id={val.instructorId}
                                            text={val.announcementText}
                                            createdAt={val.createdAt}/>
                                    })
                                }

                            </Grid>
                        </TabPanel> : null}

                        { !isLoading ? <TabPanel value="2">
                            <Paper elevation={0} className={classes.classworkPaper}>
                                {
                                    exams.map((val,index)=>{
                                        console.log(val)
                                        return <Exam
                                            key={index}
                                            examTitle={val.title}
                                            examId={val.examId}
                                            startingAt={val.startingAt}
                                            endingAt={val.endingAt}
                                                    />
                                    })
                                }
                                {props.user.role_id == 1 ? <Button
                                    variant="contained"
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <AddIcon />
                                    Dashboard
                                </Button> : null }
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Link href="/quiz"><MenuItem ><AssignmentIcon/>Exam/Quiz Assignment</MenuItem></Link>
                                </Menu>
                            </Paper>
                        </TabPanel> : null}

                        { !isLoading ? <TabPanel value="3">
                            <Paper fullwidth elevation={0} >
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12}>
                                    <Typography variant="h2">
                                        Teachers
                                    </Typography>
                                    </Grid>
                                <Participants username={props.user.username} />

                                </Grid>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography variant="h2">
                                        Classmates
                                    </Typography>
                                    {
                                        classroom.map((val,index)=>{
                                            return <Participants username={val.username}/>
                                        })
                                    }

                                </Grid>
                            </Paper>
                        </TabPanel> : null}

                        { !isLoading ? <TabPanel value="4">Grades</TabPanel> : null}
                    </TabContext>

                </Box>
            </ThemeProvider>

        </div>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
    }
}
export default connect(mapStateToProps,null)(Course1)