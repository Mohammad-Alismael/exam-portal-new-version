import React from 'react';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import {useSelector} from "react-redux";
import Participants from "../components/Participants";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
const useStyles = makeStyles((theme) => ({
    container: {
        padding: 30,
        // height: '28vh',
        width: '63%',
        margin: "30px auto",
    }
}));
function PeoplePage(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.UserReducerV2).user;
    return (
        <>
            <ResponsiveAppBar />
            <Paper fullwidth elevation={5} className={classes.container}>
                <Grid xs={12}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align={'left'}>
                            Teachers
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 3,color: 'primary.main' }}/>
                    </Grid>
                    <Participants username={"teacher username"}/>
                </Grid>
            </Paper>
            <Paper  elevation={5} className={classes.container}>
                <Grid xs={12}>
                    <Grid container alignItems={'center'}>
                        <Grid item xs={6}>
                            <Typography variant="h4">
                                Classmates
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align={'right'}  variant="subtitle2">
                                15 students
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ borderBottomWidth: 3,color: 'primary.main' }}/>
                    {/*{*/}
                    {/*    classroom.map((val,index)=>{*/}
                    {/*        console.log(val)*/}
                    {/*        return <Participants username={val.username}/>*/}
                    {/*    })*/}
                    {/*}*/}
                    <Participants  username={"classname username"}/>
                    <Divider/>
                    <Participants  username={"classname username"}/>
                    <Divider/>
                    <Participants  username={"classname username"}/>
                    <Divider/>
                </Grid>
            </Paper>
        </>
    );
}

export default PeoplePage;