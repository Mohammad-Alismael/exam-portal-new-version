import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {SET_QUESTION_INDEX} from "../../store/actions";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'green'
        // margin: "10% 15%",
        // padding: "1rem",
        // backgroundColor: '#FFF',
    },
    numberContainer: {
        borderRadius: '5px',
        backgroundColor: '#D9D9D9',
        display: "inline-block",
        padding: '0.8rem',
        margin: '0.8rem',
        cursor: "pointer",
        "& p": {
            float: 'center',
            padding: 0,
            margin: 0,
            // margin: '0 0 0 25%',
            fontWeight: 'bold'
        }
    }
}));
function QuestionNavigation(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const itemsRef = useRef([]);

    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const handleOnClick = (e,index) => {
        e.preventDefault()
        if (parseInt(examStudent?.examDetails?.navigation) === 1)
            dispatch({type: SET_QUESTION_INDEX, payload: {questionIndex: index}});
    }
    useEffect(() => {
        itemsRef.current.forEach((value, index, array) => {
            const questionIndex = parseInt(examStudent?.questionIndex);

            const styles = {
                outline: index === questionIndex ? '2px solid #FFCD38' : '2px solid transparent',
                backgroundColor: index < questionIndex ? '#FFCD38' : '#D9D9D9',
            };

            itemsRef.current[index].style = styles;
        });
    }, [examStudent?.questionIndex]);

    return (
        <>
            <Typography
                sx={{ mb: 4, color: '#fff' }}
                variant="h4"
                align="left"
            >
                <b>Navigation</b>
            </Typography>
            <Paper fullWidth elevation={5} className={classes.container}>
                <Grid xs={12}>
                    <Grid
                        container
                        justifyContent="flex-start"
                        xs={12}
                        sx={{ mt: 4 }}
                    >
                        {examStudent.questions.map((val, i) => (
                            <div
                                ref={(el) => (itemsRef.current[i] = el)}
                                onClick={(e) => handleOnClick(e, i)}
                                className={classes.numberContainer}
                            >
                                <p>{i + 1}</p>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default QuestionNavigation;