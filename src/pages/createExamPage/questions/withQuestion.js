import QuestionHeader from "./QuestionHeader";
import React from "react";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        // position: 'relative',
        // padding: '15px 20px',
        // marginTop: "2rem",
        padding: 30,
        height: '15vh auto',
        width: '60vw',
        // margin: "30px auto",
        position: 'relative'
    },
    textField: {
        width: '100%',
    },
    dropDown: {
        margin:"50px"
    },
    deleteIcon : {
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
        // paddingTop: 20
    }
}));

export default function withQuestion(Wrapped) {
    return function New(props) {
        const classes = useStyles();
        return (
            // <Paper elevation={3} className={classes.paperStyle}>
            //     <Grid container spacing={2}>
            //         <QuestionHeader
            //             {...props}
            //         />
            // <Wrapped {...props} />
            //     </Grid>
            // </Paper>
            <Paper className={classes.paperStyle}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                            {props.questionText}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography style={{color:"black"}} sx={{ float: 'right', flex: 1 }} variant="h6">
                            {props.points} points
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Wrapped {...props} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}