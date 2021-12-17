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
            <div>
                this is exam preview for {examId}
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
                        }else {
                            return <Text
                                questionText={val.questionText}
                                points={val.points}
                                options={val.options}
                                isActive={val.isActive}
                                whoCanSee={val.whoCanSee}
                            />
                        }
                    })
                }
                <Text
                    questionText={"lololol"}
                    points={15}
                    options={[]}
                    isActive={true}
                    whoCanSee={2}
                />
                <Truth
                    questionText={"lololol"}
                    points={15}
                    options={['True','False']}
                    isActive={true}
                    whoCanSee={2}
                />
                {/*<CheckBoxComp*/}
                {/*    questionText={"lololol checkbox"}*/}
                {/*    points={15}*/}
                {/*    options={['options','ahmed','mamadd','ffff']}*/}
                {/*    isActive={true}*/}
                {/*    whoCanSee={2}*/}
                {/*/>*/}
                <Matching
                    questionText={"this is matching question"}
                    points={15}
                    options={['True','False','fff']}
                    isActive={true}
                    whoCanSee={2}
                />
            </div>
        );
    }
}

export default PreviewExam;