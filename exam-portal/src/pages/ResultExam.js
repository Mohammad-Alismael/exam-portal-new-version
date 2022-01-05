import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";


function ResultExam(props) {
    const {examId} = useParams();
    return (
        <div>
            {examId}
        </div>
    );
}

export default ResultExam;