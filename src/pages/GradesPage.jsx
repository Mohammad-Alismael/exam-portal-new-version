import React from 'react';
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import {useParams} from "react-router-dom";

function GradesPage(props) {
    const { examId } = useParams();

    return (
        <div>
            <ResponsiveAppBar />
            <p style={{color: 'white'}}>this is grades page for exam id {examId}</p>
        </div>
    );
}

export default GradesPage;