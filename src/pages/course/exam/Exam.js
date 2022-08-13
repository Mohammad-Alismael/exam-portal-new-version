import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { connect, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import {SvgIcon} from "@mui/material";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontAwesomeSvgIcon from "../../../components/FontAwesomeSvgIcon";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        "&& img": {
            marginLeft: '0.8rem'
        },
        "&& h6": {
            marginLeft: '0.8rem'
        }
    },
    time: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

function Exam(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector((state) => state.CourseReducer);
    const redirect = (e) => {
        if (user.role_id == 1) {
            navigate(`/preview/${props.examId}`);
        } else {
            // if (props.endingAt > Date.now())
            navigate(`/exam/${props.examId}`);
            // else
            //     toast.info("you are too late to take this exam!")
        }
    };
    const handleDelete = () => {
        axios
            .post("http://localhost:8080/delete-exam", {
                creatorId: props.user.user_id,
                examId: props.examId,
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        window.location.reload();
    };
    return (
        <Paper elevation={5} className={classes.container}>
            <div className={classes.subContainer}>
                <img src={'/images/icons/exam_logo.svg'} alt={'logo'}/>
                <Typography variant="h6">
                    <b>{props.examTitle}</b>
                </Typography>
            </div>
            <div className={classes.subContainer}>
                <div className={classes.time}>
                    <Typography variant="caption">
                        {moment(props.startingAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                    <Typography variant="caption">
                        {moment(props.endingAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                </div>
                <IconButton aria-label="Example">
                    <FontAwesomeSvgIcon icon={faEllipsisV} />
                </IconButton>
            </div>
        </Paper>
    );
}

export default Exam;