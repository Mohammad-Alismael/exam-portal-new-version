import React from 'react';
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import * as PropTypes from "prop-types";
import ExamContainer from "../../../components/ExamContainers/UpComingContainer";
import classnames from "classnames";
import withSideBarAndResAppBar from "../../../layouts/withSideBarAndResAppBar";
const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: 'red',
        width: '100%',
        // height: '70vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        columnGap: 0,
        rowGap: 0,
},
    subContainer: {
        // backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        height: '55vh',
    },
    subContainer2: {
        // backgroundColor: 'red',

        justifyContent: 'flex-start',
    },
    subContainer3: {
        // backgroundColor: 'brown',
        alignItems: 'flex-start'
    },
    subContainer4: {
        // backgroundColor: 'yellow',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}));

function GradesPage(props) {
    const classes = useStyles();

    return (
        <>
            <ResponsiveAppBar/>
            <div className={classes.container}>
                <div className={classes.subContainer}>
                    <ExamContainer title={'upcoming exams'}/>
                </div>
                <div className={classnames(classes.subContainer,classes.subContainer2)}>
                    <ExamContainer title={'waiting to be graded'}/>
                </div>
                <div className={classnames(classes.subContainer,classes.subContainer3)}>
                    <ExamContainer title={'graded exam'}/>
                </div>
                <div className={classnames(classes.subContainer,classes.subContainer4)}>
                    <ExamContainer title={'missed exams'}/>
                </div>
            </div>
        </>
    );
}

export default withSideBarAndResAppBar(GradesPage);