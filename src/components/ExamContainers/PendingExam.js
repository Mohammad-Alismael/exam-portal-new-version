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
    examTitle: {
        // marginBottom: '10px',
        fontWeight: "bold",
    },
    submittedAt: {
        fontSize: "12px",
        marginTop: "10px",
    }
}));

export default function PendingExam({ title, submittedAt, see_result_at }) {
    const classes = useStyles();
    const styleExamStudentCard = useStyleExamStudentCard({
        color: '#575757'
    })
    return (
        <div className={classes.itemElement}>
            <div className={styleExamStudentCard.circle}>
                <span>Pending</span>
            </div>
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader,styleExamStudentCard.examTitle)}>
                    {title}
                </p>
                <p className={classNames(styleExamStudentCard.submittedAt)}>
                    Submitted at {moment(submittedAt).format("MMMM Do YYYY,h:mm:ss a")}
                </p>
                {see_result_at != null ? (
                    <p className={classNames(styleExamStudentCard.submittedAt)}>
                        See result at at{" "}
                        {moment(see_result_at).format("MMMM Do,h:mm:ss a")}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

PendingExam.propTypes = { classes: PropTypes.any };
