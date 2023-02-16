import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import {useStyleExamStudentCard} from "../../utils/global/useStyles";

const useStyles = makeStyles(({ palette }) => ({
    itemElement: {
        backgroundColor: "#FFF",
        minWidth: "100%",
        // height: '28%',
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
    submittedAt: {
        fontSize: "12px",
        marginTop: "10px",
    }
}));

export default function MissedExam({ title, endingAt }) {
    const classes = useStyles();
    const styleExamStudentCard = useStyleExamStudentCard({
        color: '#FF6838'
    })
    return (
        <div className={classes.itemElement}>
            <div className={styleExamStudentCard.circle}>
                <span>Missed</span>
            </div>
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader,styleExamStudentCard.examTitle)}>
                    {title}
                </p>
                <p className={classNames(styleExamStudentCard.submittedAt)}>
                    Ended at {moment(endingAt).format("MMMM Do,h:mm:ss a")}
                </p>
            </div>
        </div>
    );
}

MissedExam.propTypes = { classes: PropTypes.any };
