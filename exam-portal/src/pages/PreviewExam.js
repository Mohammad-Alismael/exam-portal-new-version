import React, {Component, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function PreviewExam(props) {
    const {examId} = useParams();

    const getExamQuestions = async () => {

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
    useEffect(()=>{
        getExamQuestions().then((data)=>{
            console.log(data)
        })
    },[])
    return (
        <div>
           this is exam preview for {examId}
        </div>
        );

}

export default PreviewExam;