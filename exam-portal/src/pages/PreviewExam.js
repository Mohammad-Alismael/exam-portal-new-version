import React, {Component} from 'react';
import {useParams} from "react-router-dom";

function PreviewExam(props) {
    const {examId} = useParams();

    return (
        <div>
           this is exam preview for {examId}
        </div>
        );

}

export default PreviewExam;