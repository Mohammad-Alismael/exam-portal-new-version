import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import classes from "../img/classes.jpg";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import {useNavigate} from "react-router-dom";
import moment from 'moment'
import {toast} from "react-toastify";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({

    container : {
        height: '8vh',
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        padding: '0 20px',
        cursor: 'pointer'
    }
}));
function Exam (props){
    const classes = useStyles();
    const navigate = useNavigate();
    const redirect = (e) => {
        if (props.user.role_id == 1) {
            navigate(`/preview/${props.examId}`);
        }else {

            if (props.endingAt > Date.now())
                navigate(`/exam/${props.examId}`);
            else
                toast.info("you are too late to take this exam!")
        }
    }
    return (
        <Paper elevation={5} className={classes.container} onClick={redirect}>
            <div style={{display:'inline-flex',gap:'5px',alignItems: 'center'}}>
                <ContentPasteIcon  />
                <Typography variant="h6" >
                    <b>{props.examTitle}</b>
                </Typography>
            </div>
            <div>
            <Typography variant="subtitle1">
                {moment(props.startingAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Typography variant="subtitle1">
                {moment(props.endingAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            </div>
        </Paper>
        );

}

Exam.propTypes = {};
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
    }
}
export default connect(mapStateToProps,null)(Exam);