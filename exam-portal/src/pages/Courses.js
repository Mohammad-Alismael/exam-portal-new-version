import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {createTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../img/logo.png";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {connect} from "react-redux";
import axios from "axios";
import CourseCard from "../components/CourseCard";
const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        maxWidth: '20%',
    },

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
            main: 'rgb(22,27,34)',
        },
        secondary: {
            main: 'rgb(255,208,94)',
        }
    }
})
function Courses(props) {
    const classes = useStyles();
    const [classrooms, setClassrooms] = React.useState([]);
    const getClassrooms = async () => {
        const classrooms = await axios.post('http://localhost:8080/get-classroom-ids-from-student-id', {
            studentId: props.user.user_id,
            classroomId: props.user.classroom_id
        })
        console.log("classrooms => ", classrooms.data)
        setClassrooms(classrooms.data)
    }
    useEffect(()=>{
        getClassrooms();
    },[])

    return (
        <div>
            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ marginLeft: '12%', marginRight: '12%', }}>
                    <img src={logo} className={classes.logo} alt="Exam Portal" />
                </Toolbar>
            </AppBar>

            {classrooms.length != 0 ? <Grid container spacing={2} style={{ backgroundColor: '#161b22', padding: '7%',height:'100vh' }}>
                {
                    classrooms.map((val,index)=>{
                        return <CourseCard key={index} index={index} classroom_id={val['classroomId']}/>
                    })
                }
            </Grid> : null }
            {classrooms.length == 0 ? <Grid container spacing={2} style={{ backgroundColor: '#161b22', padding: '7%',height:'100vh' }}>
                <Grid item style={{backgroundColor:'white'}}>
                    <Typography color={"default"}  variant="h6">
                        you don't have any courses
                    </Typography>
                </Grid>
                </Grid> : null}

        </div>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
    }
}
export default connect(mapStateToProps,null)(Courses);