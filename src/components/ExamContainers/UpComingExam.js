import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { toast } from "react-toastify";

const useStyles = makeStyles(({ palette }) => ({
    itemElement: {
        backgroundColor: "#FFF",
        minWidth: "100%",
        marginBottom: "0.8rem",
        borderRadius: "15px",
        position: "relative",
        cursor: "pointers !important",
    },
    headerContainer: {
        position: "absolute",
        top: "0.5rem",
        display: "inline-block",
        height: "60px",
    },
    miniHeader: {
        margin: 0,
        padding: 0,
        color: "#000000",
    },
    examTitle: {
        marginBottom: "3px",
        fontWeight: "bold",
    },
    submittedAt: {
        fontSize: "12px",
        marginTop: "3px",
    },
    icon: {
        width: 40,
        height: 40,
        margin: "1rem",
    },
}));

export default function UpComingExam({ title, examId, startingAt, endingAt }) {
    const classes = useStyles();
    const navigate = useNavigate();

    const redirect = (e) => {
        e.preventDefault();
        const now = new Date().getTime();
        if (startingAt < now && endingAt > now) navigate(`/exam/${examId}`);
        else toast.info("you are too late foe taking this exam");
    };
    return (
        <div className={classes.itemElement} onClick={redirect}>
            <img
                className={classes.icon}
                src={"/images/icons/exam_logo.svg"}
                alt={"logo"}
            />
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader, classes.examTitle)}>
                    {title}
                </p>
                <p className={classNames(classes.miniHeader, classes.submittedAt)}>
                    Starting at {moment(startingAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p className={classNames(classes.miniHeader, classes.submittedAt)}>
                    Ending at {moment(endingAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
            </div>
        </div>
    );
}

UpComingExam.propTypes = { classes: PropTypes.any };
