import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../img/logo.png";
import AppBar from "@material-ui/core/AppBar";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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


function ResultExam(props) {
    const {examId} = useParams();
    const classes = useStyles();
    const [questions,setQuestions] = React.useState([])
    const fetchingMetaQuestions = async () => {
        const metaQuestions = await axios.post('http://localhost:8080/list-exam-result', {
            examId,
            creatorId: props.user.user_id
        })
        return metaQuestions.data
    }
    const fetchQuestion = async (questionId) => {
        const question = await axios.post('http://localhost:8080/list-question-by-id', {
            questionId
        })
        return question.data;
    }
    useEffect(()=>{
        fetchingMetaQuestions().then((data)=>{
            console.log("meta questions=>", data)
            data.map((val,index)=>{
                fetchQuestion(val['questionId']).then((data)=>{
                    val['questionData'] = data
                })
            })
            console.log("meta questions after=>", data)
        })
    },[])
    return (
        <div>
            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ marginLeft: '12%', marginRight: '12%', }}>
                    <img src={logo} className={classes.logo} alt="Exam Portal" />
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} style={{ backgroundColor: '#161b22', padding: '7%',height:'100vh' }}>

            </Grid>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
    }
}
export default connect(mapStateToProps,null)(ResultExam);