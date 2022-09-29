import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(({ palette }) => ({
    itemElement: {
        backgroundColor: "#fff",
        // width: '100%',
        minWidth: "100%",
        marginBottom: "0.8rem",
        borderRadius: "15px",
        position: "relative",
        cursor: "pointers",
    },
    headerContainer: {
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
    submittedAt: {
        marginTop: "5px",
        fontSize: "12px",
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
    const { user } = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const redirect = (e) => {
        // alert('wrf')
        e.preventDefault();
        navigate(`/courses/${course.courseId}/grades/${examId}/${user?.username}`);
    };
    return (
        <div className={classes.itemElement} onClick={redirect}>
            <div className={classes.circle}>
                <span>{percent}</span>
                <span>Percent</span>
            </div>
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader, classes.examTitle)}>
                    {title}
                </p>
                <p className={classNames(classes.miniHeader, classes.submittedAt)}>
                    Submitted at {moment(submittedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
            </div>
        </div>
    );
}

GradedExam.propTypes = { classes: PropTypes.any };
