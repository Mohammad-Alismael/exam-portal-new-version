import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
    itemElement:{
        backgroundColor: '#FFF',
        minWidth: '100%',
        marginBottom: '0.8rem',
        borderRadius: '15px',
        position: 'relative',
        cursor: "pointers"
    },
    headerContainer: {
        position: "absolute",
        top: '0.5rem',
        display: 'inline-block',
        height: '60px',
    },
    miniHeader: {
        margin: 0,
        padding: 0,
        color: '#000000',
    },
    examTitle: {
        marginBottom: '3px',
        fontWeight: 'bold'
    },
    submittedAt: {
        fontSize: '12px',
        marginTop: '3px',
    },
    circle: {
        display: 'inline-block',
        border: `3px solid rgba(117, 117, 117, 1)`,
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        margin: '0.5rem',
    },

    icon: {
        width: 40,
        height: 40,
        margin: '1rem'
    }
}));

export default function UpComingExam(props) {
    const classes = useStyles();
    return (
        <div className={classes.itemElement}>
            <img className={classes.icon} src={"/images/icons/exam_logo.svg"} alt={"logo"} />
            <div className={classes.headerContainer}>
                <p className={classNames(classes.miniHeader, classes.examTitle)}>CS202 final</p>
                <p className={classNames(classes.miniHeader, classes.submittedAt)}>Starting at Spt 14th
                    2022, 3:30:45 pm</p>
                <p className={classNames(classes.miniHeader, classes.submittedAt)}>Ending at Spt 14th
                    2022, 3:30:45 pm</p>
            </div>
        </div>
    );
}

UpComingExam.propTypes = {classes: PropTypes.any};