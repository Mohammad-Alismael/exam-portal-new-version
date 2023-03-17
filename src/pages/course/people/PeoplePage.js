import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Participants from "../people/Participants";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Searchbar from "./Searchbar/Searchbar";
import { setFilteredClassmates } from "../../../actions/CourseAction";
import withSideBarAndResAppBar from "../../../layouts/withSideBarAndResAppBar";
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "3%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        flexDirection: "column",
    },
    container: {
        padding: 10,
        width: "63%",
    },
    upperContainer: {
        width: "calc(63% + 20px)",
        // backgroundColor: 'red',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));

function PeoplePage(props) {
    const classes = useStyles();
    const { user } = useSelector((state) => state.UserReducerV2);
    const course = useSelector((state) => state.CourseReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setFilteredClassmates(
                course.classmates.filter((student) => {
                    return student.username !== user?.username;
                })
            )
        );
    }, []);
    return (
        <>
            <div className={classes.root}>

                <div className={classes.upperContainer}>
                    <Typography color={"#fff"} variant="h4">
                        Classmates
                    </Typography>
                    <Searchbar />
                </div>
                <Paper elevation={5} className={classes.container}>
                    <Grid xs={12}>
                        <Divider />
                        {course.filteredClassmates.map(({ username, email }, i) => {
                            return (
                                <>
                                    <Participants key={i} username={username} />
                                    <Divider />
                                </>
                            );
                        })}
                    </Grid>
                </Paper>
            </div>
        </>
    );
}

export default withSideBarAndResAppBar(PeoplePage);
