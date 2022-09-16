import * as PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import UpComingExam from "./UpComingExam";
const useStyles = makeStyles((theme) => ({
    itemContainer: {
        // backgroundColor: 'blue',
        width: '50%',
        height: '80%',
        margin: ' 2rem'
    },
    elementsContainer: {
        overflowY: 'auto',
        height: '75%',
        '&::-webkit-scrollbar':{
            width: '0 !important'
        }
    },
    itemContainerHeader: {
        color: '#fff',
        textTransform: 'capitalize',
        fontWeight: 700,
        fontSize: 22,
        margin: '1rem 0',
        padding: 0
    },

}));
export default function ExamContainer({title}) {
    const classes = useStyles();
    return(
        <div className={classes.itemContainer}>
            <h4 className={classes.itemContainerHeader}>{title}</h4>
            <div className={classes.elementsContainer}>
                <UpComingExam />
                <UpComingExam />
                <UpComingExam />
                <UpComingExam />
                <UpComingExam />
            </div>
        </div>
    );
}

ExamContainer.propTypes = {classes: PropTypes.any};