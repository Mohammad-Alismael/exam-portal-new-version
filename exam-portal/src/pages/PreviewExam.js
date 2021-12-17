import React, {Component, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import index from "@mui/material/darkScrollbar";
import CircularProgress from '@mui/material/CircularProgress';
import Mcq from "../Components/QuestionsPreview/Mcq";
import Text from "../Components/QuestionsPreview/Text";
import Truth from "../Components/QuestionsPreview/Truth";
import CheckBoxComp from "../Components/QuestionsPreview/CheckBoxComp";
import Matching from "../Components/QuestionsPreview/Matching";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {Box} from "@mui/material";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

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

function PreviewExam(props) {
    const classes = useStyles();
    const {examId} = useParams();
    const [questions,setQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const getExamQuestions = async () => {
        setIsLoading(true)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/list-questions', {
                examId
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no exam questions found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
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

    useEffect( ()=>{
        getExamQuestions().then((data)=>{
            console.log(data)
            get(data).then((data)=>{
                console.log(data)
                setQuestions([...data])
                setIsLoading(false)
            })
        })
    },[])

    if (isLoading){
        return <CircularProgress />

    }else {
        return (
            <Box sx={{ mt: 10 }}>
                <AppBar
                    sx={{ position: 'fixed',bgcolor:"#ffd05e"}}

                >
                    <Toolbar>
                        <Typography style={{color:"black"}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Exam id : {examId}
                        </Typography>
                        <Button style={{ textTransform: 'none' }}
                                color="inherit"
                                // onClick={handleClose}
                        >
                            Assign
                        </Button>
                    </Toolbar>
                </AppBar>
                <Paper elevation={3} className={classes.paperStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="filled-basic"
                                       label="exam title"
                                       size="small"
                                       fullWidth
                                       required
                                       variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="points"
                                size="small"
                                type="number"
                                fullWidth
                                inputProps={{ min: 1 }}
                                // onChange={(e)=>
//                                    (setTotalPoints(parseInt(e.target.value)))}
                                required
                                variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Starting At"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Ending At"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                {
                    questions.map((val,index)=>{
                        console.log(val.questionType)
                        if (val.questionType === 1){
                            return <Mcq
                                questionText={val.questionText}
                                points={val.points}
                                options={val.options}
                                isActive={val.isActive}
                                whoCanSee={val.whoCanSee}
                            />
                        }else if (val.questionType === 2){
                            return <Text
                                questionText={val.questionText}
                                points={val.points}
                                options={val.options}
                                isActive={val.isActive}
                                whoCanSee={val.whoCanSee}
                            />
                        }else if (val.questionType === 4){
                            return <Matching
                                questionText={val.questionText}
                                points={val.points}
                                options={val.options}
                                isActive={val.isActive}
                                whoCanSee={val.whoCanSee}
                            />
                        }else if (val.questionType === 5){
                            return <Truth
                                questionText={val.questionText}
                                points={val.points}
                                options={val.options}
                                isActive={true}
                                whoCanSee={val.whoCanSee}
                            />
                        }
                    })
                }

            </Box>
        );
    }
}

export default PreviewExam;