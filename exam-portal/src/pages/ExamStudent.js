import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import moment from "moment";
import Box from "@mui/material/Box";
import QuizHeaderStudent from "../Components/QuizHeaderStudent";
import Mcq from "../Components/QuestionBodyStudents/Mcq";
import CircularProgress from "@mui/material/CircularProgress";
import {connect} from "react-redux";
import Text from "../Components/QuestionBodyStudents/Text";
import Truth from "../Components/QuestionBodyStudents/Truth";
import Matching from "../Components/QuestionBodyStudents/Matching";
import CheckboxComp from "../Components/QuestionBodyStudents/CheckboxComp";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
        position: 'relative'
    },
    textField: {
        width: '100%',
    }

}));

const theme2 = createTheme({
    typography: {
        h6: {
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
            main: '#ffd05e',
        }
    }
})

function ExamStudent(props) {
    const classes = useStyles();
    const {examId} = useParams();
    const [examTitle,setExamTitle] = React.useState('');
    const [endingAt,setEndingAt] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [questions,setQuestions] = React.useState([]);
    const getExamInfo = async () => {
        setIsLoading(true)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-exam-id-info', {
                examId
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no exam id found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }
    const getExamQuestions = async () => {
        setIsLoading(true)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/list-questions-randomly', {
                examId,
                whoCanSee: props.user.role_id
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject([])
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
        // const examQuestions = await axios.post('http://localhost:8080/list-questions-randomly', {
        //             examId,
        //             whoCanSee: props.user.role_id
        //         })
        // examQuestions.data.map((val,index))
    }

    const getQuestionOptions = async (questionId) => {

        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-question-options', {
                questionId
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no question found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const get = async (data) => {
        for (let i = 0; i < data.length; i++) {
            const options = await getQuestionOptions(data[i].questionId);
            const optionValue = []
            for (let j = 0; j < options.length; j++) {
                optionValue.push(options[j]['optionValue'])
            }
            data[i]['options'] = optionValue
        }
        return data
    }
    const getExamQuestionsv2 = async () => {
        const questions = await axios.post('http://localhost:8080/list-questions-randomly', {
            examId,
            whoCanSee: props.user.role_id
        })
        setQuestions(questions.data)
        console.log(questions.data)
    }
    useEffect( ()=>{
        // getExamInfo().then((data)=>{
        //     console.log(data)
        //     setExamTitle(data['title'])
        //     setEndingAt(moment(data['endingAt']).format('h:mm a'));
        //     getExamQuestions().then((data)=>{
        //         console.log(data)
        //         get(data).then((data)=>{
        //             console.log(data)
        //             setQuestions([...data])
        //             setIsLoading(false)
        //         })
        //     })
        getExamQuestionsv2();
        // })
    },[])

    const chooseBody = (val,index) => {
        if (val['question'].questionType == 1){
            return  <Mcq key={index+1} questionId={val['question'].questionId} options={val['questionOptions']}/>
        }else if(val['question'].questionType == 2){
            return <Text key={index+1} questionId={val['question'].questionId}/>;
        }else if(val['question'].questionType == 3){
            return <CheckboxComp key={index+1} questionId={val['question'].questionId} options={val['questionOptions']}/>
        }else {
            return <Truth questionId={val['question'].questionId}/>
        }
    }
    if (isLoading){
        return <CircularProgress />
    }else {
        return (
            <>
                <AppBar
                    sx={{position: 'fixed', bgcolor: "#ffd05e"}}>
                    <Toolbar>
                        <Typography style={{color: "black"}} sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {examTitle}
                        </Typography>
                        <Typography style={{color: "black"}} sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            ends at {endingAt}
                        </Typography>
                        <Button style={{ textTransform: 'none' }}
                                // onClick={handleClose}
                        >
                            Submit
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{mt: 10}}>
                    {
                        questions.map((val,index)=>{
                            console.log(val)
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
                                    questionText={val['question'].questionText}
                                    questionId={val['question'].questionId}
                                    points={val['question'].points}
                                />;
                            }
                        })
                    }

                </Box>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.UserReducer,
        examStudent: state.ExamStudentReducer
    }
}

export default connect(mapStateToProps,null)(ExamStudent);