import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment/moment";
import {useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {useStyleExamStudentCard} from "../../utils/global/useStyles";

const useStyles = makeStyles(({ palette }) => ({
    itemElement: {
        backgroundColor: "#FFF",
        minWidth: "100%",
        marginBottom: "0.8rem",
        borderRadius: "15px",
        position: "relative",
        cursor: "pointers",
    },
    headerContainer: {
        position: "absolute",
        top: "0.9rem",
        display: "inline-block",
        height: "60px",
    },
    miniHeader: {
        margin: 0,
        padding: 0,
        color: "#000000",
    },
    examTitle: {
        // marginBottom: '10px',
        fontWeight: "bold",
    },
    circle: {
        display: "inline-block",
        border: `3px solid #FFCD38`,
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        margin: "0.5rem",
        "& span:nth-child(1)": {
            marginTop: "18%",
            marginLeft: "35%",
            color: "#000",
            display: "block",
            fontWeight: "bold",
        },
        "& span:nth-child(2)": {
            marginLeft: "15%",
            display: "block",
            fontSize: 12,
            color: "rgba(87, 87, 87, 1)",
        },
    },
}));

export default function GradedExam({ percent, examId, title, submittedAt }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const {course_id} = useParams();
    const styleExamStudentCard = useStyleExamStudentCard({
        color: '#FFCD38'
    })
    const { user } = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const redirect = (e) => {
        e.preventDefault();
        navigate(`/courses/${course_id}/grades/${examId}/${user?.username}`);
    };
    return (
        <div className={classes.itemElement} onClick={redirect}>
            <div className={classes.circle}>
                <span>{percent}</span>
                <span>Percent</span>
            </div>
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader,styleExamStudentCard.examTitle)}>
                    {title}
                </p>
                <p className={classNames(styleExamStudentCard.submittedAt)}>
                    Submitted at {moment(submittedAt).format("MMMM Do,h:mm:ss a")}
                </p>
            </div>
        </div>
    );
}

GradedExam.propTypes = { classes: PropTypes.any };
