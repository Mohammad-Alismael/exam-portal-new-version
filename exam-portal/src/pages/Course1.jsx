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
    const [announcements,setAnnouncements] = React.useState([])
    const [announcementText,setAnnouncementText] = React.useState('')
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
            setAnnouncements([...announcements,{announcementText,createdAt : new Date().getTime()}])

        }).catch((error)=>{
            console.log(error)
            toast.error("error happened!")
        })
    }
    const loadAnnouncements = async () => {
        const Announcements = await axios.get(`http://localhost:8080/get-announcements?id=${props.user.user_id}`)
        setAnnouncements(Announcements.data)
    }
    useEffect(()=>{
        console.log(props.user.user_id)
        loadAnnouncements()
    },[])
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

                        <TabPanel value="1">
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
                                <MoreVertIcon/>
                            </Paper>:null}
                            <Grid>
                                {
                                    announcements.map((val,index)=>{
                                        return <AnnouncementComponent
                                            key={index}
                                            text={val.announcementText}
                                            createdAt={val.createdAt}/>
                                    })
                                }

                            </Grid>
                        </TabPanel>


                        <TabPanel value="2">
                            <Paper elevation={0} className={classes.classworkPaper}>
                                <Button
                                    variant="contained"
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <AddIcon />
                                    Dashboard
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}><AssignmentIcon sx={{ p: 1 }} /> Assignment</MenuItem>
                                    <Link href="/quiz"><MenuItem ><AssignmentIcon/>Quiz Assignment</MenuItem></Link>
                                    <MenuItem onClick={handleClose}><LiveHelpIcon sx={{ p: 1 }} />Question</MenuItem>
                                </Menu>
                            </Paper>
                        </TabPanel>

                        <TabPanel value="3">
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
                                <Participants />
                                <Participants />
                                <Participants />
                                <Participants />
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
                                    <Participants />
                                    <Participants />
                                    <Participants />
                                    <Participants />
                                </Grid>
                            </Paper>
                        </TabPanel>
                        <TabPanel value="4">Grades</TabPanel>
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