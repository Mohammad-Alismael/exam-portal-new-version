import React, {useEffect} from 'react';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Participants from "../people/Participants";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import ResponsiveAppBar from "../../../layouts/ResponsiveAppBar";
import {fetchExamStudents} from "../../../api/services/Exam";
import {SET_STUDENTS} from "../../../store/actions";
import * as PropTypes from "prop-types";
import Searchbar from "./Searchbar/Searchbar";
import {setFilteredClassmates} from "../../../actions/CourseAction";
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3%',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        gap: 20,
        flexDirection: 'column',
    },
    container: {
        padding: 10,
        width: '63%',
    },
    upperContainer: {
        width: 'calc(63% + 20px)',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

}));



function PeoplePage(props) {
    const classes = useStyles();
    const {user} = useSelector((state) => state.UserReducerV2);
    const course = useSelector(state => state.CourseReducer);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setFilteredClassmates(course.classmates.filter((student) => {
                return student.username !== user?.username
            }
        )))
    },[])
    return (
        <>
            <ResponsiveAppBar/>
            <div className={classes.root}>
                <Searchbar />
                <div className={classes.upperContainer}>
                    <Typography color={'#fff'} variant="h4">
                        Classmates
                    </Typography>
                    <Typography color={'#fff'} variant="subtitle2">
                        {course.filteredClassmates.length} students
                    </Typography>
                </div>
                <Paper elevation={5} className={classes.container}>
                    <Grid xs={12}>
                        {/*{parseInt(user.role_id) === 3 ? <Participants username={user?.username}/> : null}*/}
                        <Divider/>
                        {
                            course.filteredClassmates
                                .map(({username, email}, i) => {
                                return (
                                    <>
                                        <Participants key={i} username={username}/>
                                        <Divider/>
                                    </>
                                )
                            })
                        }

                    </Grid>
                </Paper>
            </div>
        </>
    );
}

export default PeoplePage;