import React from 'react';
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
        position: 'relative'
    }
}));
function QuestionHeader(props) {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container>
                <Grid item xs={10}>
                    <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                        {props.questionText}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                        {props.points} points
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {props.body}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default QuestionHeader;