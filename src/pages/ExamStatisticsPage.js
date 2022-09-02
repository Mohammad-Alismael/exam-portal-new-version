import React from 'react';
import {useParams} from "react-router-dom";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";

function ExamStatisticsPage(props) {
    const { examId } = useParams();

    return (
        <div>
            <ResponsiveAppBar />
            <p style={{color: 'white'}}>this is exam statistic page page for exam id {examId}</p>
        </div>
    );
}

export default ExamStatisticsPage;