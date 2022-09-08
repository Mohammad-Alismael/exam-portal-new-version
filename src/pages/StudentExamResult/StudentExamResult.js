import React from 'react';
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import {useParams} from "react-router-dom";

function StudentExamResult(props) {
    const { username } = useParams();

    return (
        <div>
            <ResponsiveAppBar />
            <p style={{color: 'white'}}> this page for {username}</p>
        </div>
    );
}

export default StudentExamResult;