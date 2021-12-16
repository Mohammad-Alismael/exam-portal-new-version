import React, {Component, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import index from "@mui/material/darkScrollbar";
import CircularProgress from '@mui/material/CircularProgress';

function PreviewExam(props) {
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
    const wrapper = async (questionId) => {
        const options = await getQuestionOptions(questionId);
        console.log(options)
        return options;

    }
    const get = async (data) => {
        for (let i = 0; i < data.length; i++) {
            const options = await getQuestionOptions(data[i].questionId);
            data[i]['options'] = options
        }
        return data
    }

    useEffect( ()=>{
        getExamQuestions().then((data)=>{
            console.log(data)
            get(data).then((data)=>{
                setQuestions(data)
                setIsLoading(false)
            })
        })
    },[])

    if (isLoading){
        return <CircularProgress />

    }else {
        return (
            <div>
                this is exam preview for {examId}
                {
                    questions.map((val,index)=>{
                        return <p>{val.questionText}</p>
                    })
                }
            </div>
        );
    }
}

export default PreviewExam;