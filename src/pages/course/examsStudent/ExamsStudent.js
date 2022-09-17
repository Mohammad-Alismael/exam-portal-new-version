import React, {useEffect, useState} from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import * as PropTypes from "prop-types";
import ExamContainer from "../../../components/ExamContainers/Containers/UpComingContainer";
import classnames from "classnames";
import {fetchExams, fetchExamsStudent, fetchMissedExams} from "../../../api/services/Exam";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchPendingAndSubmittedExam} from "../../../api/services/UserSubmission";
import {CircularProgress} from "@material-ui/core";
import UpComingContainer from "../../../components/ExamContainers/Containers/UpComingContainer";
import PendingContainer from "../../../components/ExamContainers/Containers/PendingContainer";
import GradedContainer from "../../../components/ExamContainers/Containers/GradedContainer";
import MissedContainer from "../../../components/ExamContainers/Containers/MissedContainer";
const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: 'red',
        width: '100%',
        // height: '70vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        columnGap: 0,
        rowGap: 0,
    },
    subContainer: {
        // backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        height: '55vh',
    },
    subContainer2: {
        // backgroundColor: 'red',

        justifyContent: 'flex-start',
    },
    subContainer3: {
        // backgroundColor: 'brown',
        alignItems: 'flex-start'
    },
    subContainer4: {
        // backgroundColor: 'yellow',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}));

function ExamsStudent(props) {
    const classes = useStyles();
    const { course_id } = useParams();
    const course = useSelector(state => state.CourseReducer);
    const {user} = useSelector(state => state.UserReducerV2);
    const [upComingExams,setUpcomingExams] = useState([])
    const [waitingToeGradedExams,setWaitingToeGradedExams] = useState([])
    const [gradedExams,setGradedExams] = useState([])
    const [missedExams,setMissedExams] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const controller = new AbortController();
        setLoading(true)
        fetchExamsStudent(course?.course_info?.id, controller)
            .then((data)=>{
                setUpcomingExams(data)
                console.log('upcoming exams exams',data)
            }).catch(console.log)
        fetchPendingAndSubmittedExam(course?.course_info?.id,
            user.user_id,controller)
            .then((data)=>{
                setGradedExams(data['graded_exams'])
                setWaitingToeGradedExams(data['pending_exams'])
                console.log('pending and graded exams',data)
            })
            .catch(console.log)
        fetchMissedExams(course?.course_info?.id,controller)
            .then((data)=>{
                setMissedExams(data)
                setLoading(false)
                console.log('missed exams',data)
            })
            .catch(console.log)
        return () => {
            controller.abort();
        };
    },[])
    if (loading) {
        return <CircularProgress size={200} />;
    }
    return (
        <>
            <ResponsiveAppBar/>
            <div className={classes.container}>
                <div className={classes.subContainer}>
                    <UpComingContainer
                        exams={upComingExams}
                        title={'upcoming exams'}
                        noExamTitle={'no upcoming exams yet'}
                    />
                </div>
                <div className={classnames(classes.subContainer,classes.subContainer2)}>
                    <PendingContainer
                        exams={waitingToeGradedExams}
                        title={'waiting to be graded'}
                        noExamTitle={'no pending exams yet'}
                    />
                </div>
                <div className={classnames(classes.subContainer,classes.subContainer3)}>
                    <GradedContainer
                        exams={gradedExams}
                        title={'graded exam'}
                        noExamTitle={'no graded exams yet'}
                    />
                </div>
                <div className={classnames(classes.subContainer,classes.subContainer4)}>
                    <MissedContainer
                        exams={missedExams}
                        title={'missed exams'}
                        noExamTitle={'no missed exams yet'}
                    />
                </div>
            </div>
        </>
    );
}

export default ExamsStudent;