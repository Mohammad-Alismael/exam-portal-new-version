import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

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
    },
    circle: {
        display: "inline-block",
        border: `3px solid rgba(117, 117, 117, 1)`,
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        margin: "0.5rem",
        "& span:nth-child(1)": {
            marginLeft: "15%",
            marginTop: "36%",
            fontWeight: "semi-bold",
            display: "block",
            fontSize: 12,
            color: "#575757",
        },
    },
}));

export default function PendingExam({ title, submittedAt, see_result_at }) {
    const classes = useStyles();
    return (
        <div className={classes.itemElement}>
            <div className={classes.circle}>
                <span>Pending</span>
            </div>
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader, classes.examTitle)}>
                    {title}
                </p>
                <p className={classNames(classes.miniHeader, classes.submittedAt)}>
                    Submitted at {moment(submittedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                {see_result_at != null ? (
                    <p className={classNames(classes.miniHeader, classes.submittedAt)}>
                        See result at at{" "}
                        {moment(see_result_at).format("MMMM Do YYYY, h:mm:ss a")}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

PendingExam.propTypes = { classes: PropTypes.any };
