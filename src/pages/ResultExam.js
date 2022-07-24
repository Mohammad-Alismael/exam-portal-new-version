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
import Mcq from "../Components/ResultQuestions/Mcq";
import QuizHeaderStudent from "../Components/QuizHeaderStudent";
import Matching from "../Components/ResultQuestions/Matching";
import Text from "../Components/ResultQuestions/Text";
import CheckboxComp from "../Components/ResultQuestions/CheckboxComp";
import Truth from "../Components/ResultQuestions/Truth";
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
    const chooseBody = (val,index) => {
        if (val['question'].questionType == 1){
            return  <Mcq
                key={index+1}
                questionId={val['question'].questionId}
                userAnswer={val['userAnswer'][0]['userAnswer']}
                options={val['questionOptions']}
            />
        }else if(val['question'].questionType == 2){
            return <Text key={index+1} questionId={val['question'].questionId}/>;
        }else if(val['question'].questionType == 3){
            return <CheckboxComp
                key={index+1}
                questionId={val['question'].questionId}
                userAnswer={val['userAnswer']}
                options={val['questionOptions']}
            />
        }else {
            return <Truth
                questionId={val['question'].questionId}
                userAnswer={val['userAnswer'][0]['userAnswer']}
                answerKey={val['answerKeys'][0]['correctAnswer']}
            />
        }
    }
    useEffect(()=>{
        fetchingMetaQuestions().then((data)=>{
            console.log("meta questions=>", data)
            setQuestions(data)
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
                {
                    questions.map((val,index)=>{
                        if (val['question'].questionType != 4 ) {
                            return <QuizHeaderStudent
                                key={index + 1}
                                questionText={val['question'].questionText}
                                points={val['question'].points}
                                body={chooseBody(val, index)}/>
                        }else {
                            return <Matching
                                key={index+1}
                                options={val['questionOptions']}
                                userAnswer={val['userAnswer']}
                                questionText={val['question'].questionText}
                                questionId={val['question'].questionId}
                                points={val['question'].points}
                            />;
                        }
                    })
                }
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