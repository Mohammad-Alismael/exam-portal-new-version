import React from 'react';
import Grid from "@mui/material/Grid";
import QuestionHeader from "../QuestionHeader";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@mui/material/TextField";
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
const CheckBoxComp = (props) => {
    const classes = useStyles();
    const [options,setOptions] = React.useState([...props.options])

    const loadCheckboxOptions = (index) =>{
        return (
            <Grid>
                <Grid item xs={1}>
                    <FormControlLabel key={index} control={<Checkbox />} label="" />
                </Grid>
                <Grid item xs={11}>
                    <Grid item xs={11}>
                        <TextField
                            id={"option " + (index+1)}
                            label={"option " + (index+1)}
                            size="small"
                            variant="filled"
                            value={options[index]}
                            // onChange={setOptionText}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    points={props.points}
                    whoCanSee={props.whoCanSee}
                    questionText={props.questionText}
                    isActive={props.isActive}
                    options={props.isActive}
                    selectedType={3}
                />
                <Grid xs={12} container>
                    <Grid item
                          style={{marginLeft:12}}
                          justifyContent="center"
                          alignItems="center"
                          xs={12}>
                        <RadioGroup >
                            <Grid container style={{padding:'10px 0'}}>
                                {
                                    options.map((val,index)=>{
                                        return loadCheckboxOptions(index)
                                    })
                                }
                            </Grid>
                            <br/>
                            <Button
                                variant={"outlined"}
                                variant="contained"
                                size={"medium"}
                                // onClick={updateQuestion}
                            >update question4352</Button>
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CheckBoxComp;