import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
    itemElement:{
        backgroundColor: '#FFF',
        width: '100%',
        marginBottom: '0.8rem',
        borderRadius: '15px',
        position: 'relative',
        cursor: "pointers"
    },
    headerContainer: {
        display: 'inline-block',
        height: '60px'
    },
    miniHeader: {
        margin: 0,
        padding: 0,
        color: '#000000',
    },
    examTitle: {
        // marginBottom: '10px',
        fontWeight: 'bold'
    },
    submittedAt: {
        marginTop: '5px',
        fontSize: '12px',
    },
    circle: {
        display: 'inline-block',
        border: `3px solid #FFCD38`,
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        margin: '0.5rem',
        '& span:nth-child(1)': {
            marginTop: '18%',
            marginLeft: '35%',
            color: '#000',
            display: 'block',
            fontWeight: 'bold'
        },
        '& span:nth-child(2)': {
            marginLeft: '15%',
            display: 'block',
            fontSize: 12,
            color: 'rgba(87, 87, 87, 1)'
        }
    }
}));

export default function UpComingExam(props) {
    const classes = useStyles();
    return <div className={classes.itemElement}>
        <div className={classes.circle}>
            <span>75</span>
            <span>Percent</span>
        </div>
        <div className={classes.headerContainer}>
            <p className={classNames(classes.miniHeader, classes.examTitle)}>CS202 final</p>
            <p className={classNames(classes.miniHeader, classes.submittedAt)}>Submitted at Spt 14th
                2022, 3:30:45 pm</p>
        </div>
    </div>;
}

UpComingExam.propTypes = {classes: PropTypes.any};