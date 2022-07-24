import React, {useEffect} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import * as Actions from "../../store/actions";
import {connect} from "react-redux";
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
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
function Matching(props) {
    const classes = useStyles();
    const [colors,setColors] = React.useState([])
    useEffect(()=>{
        const tmp =[]
        for (let index = 0; index < props.options.length; index++) {
            if (props.userAnswer == index && props.userAnswer != props.correctAnswer){
                tmp.push("green")
            }
            else if (props.userAnswer == index && props.userAnswer == props.correctAnswer){
                tmp.push("red")
            }
            else if (props.correctAnswer == index){
                tmp.push("green")
            }
            else {
                tmp.push("black")
            }
        }
        setColors([...tmp])
    })

    return (
        <>
          <Paper elevation={3} className={classes.paperStyle}>
              <Grid container>
                  <Grid item xs={10} fullwidth>

                  </Grid>
                  <Grid item xs={2}>
                      <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                          {props.points} points
                      </Typography>
                  </Grid>

                    <Grid item xs={4} fullwidth style={{height:'40px'}}>
                          <FormControl fullWidth variant="standard" >
                              <Select
                                  labelId="type"
                                  id="type"
                                  label="Question Options"

                              >
                                    {
                                        props.options.map((val,index)=>{
                                            return <MenuItem
                                                key={index+1}
                                                value={index}
                                                selected={props.userAnswer == index}
                                            >
                                                <Typography color={colors[index]}>{val['optionValue']}</Typography>
                                            </MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={8} fullwidth sx={{ ml: 1, flex: 1 }}
                          style={{display:'flex',justifyContent:'start',justifyItems:'center',alignItems:'center'}}>
                            <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                                {props.questionText}
                            </Typography>
                    </Grid>

              </Grid>
          </Paper>
        </>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
        examStudent: state.ExamStudentReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setAnsweredQuestionsArray: (questions) => dispatch({type:Actions.SET_NEW_ANSWER_QUESTION_ARRAY,
            payload : {questions}})

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Matching);