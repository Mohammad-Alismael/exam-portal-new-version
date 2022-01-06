import React from 'react';
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import logo from "../img/logo.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useNavigate} from "react-router-dom";
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import course from "../img/course.png"

function CourseCard(props) {
    const navigate = useNavigate();
    const handleCLick = () => {
        props.setClassroomId(props.classroom_id);
        navigate("/course1")
    }
    return (
        <Grid item onClick={handleCLick}>
            <Card sx={{ width: 300,minHeight:100 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={course}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="h6">
                        course{props.index+1}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        setUserId: (user_id) => dispatch({type:Actions.SET_USER_ID,
            payload : {user_id}}),
        setUsername: (username) => dispatch({type:Actions.SET_USERNAME,
            payload : {username}}),
        setClassroomId: (classroom_id) => dispatch({type:Actions.SET_CLASSROOM_ID,
            payload : {classroom_id}})
    }
}
export default connect(null,mapDispatchToProps)(CourseCard);