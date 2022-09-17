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
    header: {
        textTransform: 'capitalize',
        textAlign: 'center',
        height: '60px',
        lineHeight: '60px',
        color: '#000000',
    },


}));

export default function NoExam({title}) {
    const classes = useStyles();
    return <div className={classes.itemElement}>
        <p className={classNames(classes.header)}>{title}</p>
    </div>;
}

NoExam.propTypes = {classes: PropTypes.any};