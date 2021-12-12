import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ImageIcon from '@mui/icons-material/Image';
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import {toast} from "react-toastify";
import QuizBody from "./QuizBody";
import index from "@mui/material/darkScrollbar";
import {connect} from "react-redux";
import * as Actions from '../store/actions';



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
    }
}));

const theme2 = createTheme({
    typography: {
        h3: {
            fontSize: 32,
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: 'rgb(22,27,34)',
        },
        secondary: {
            main: '#ffd05e',
        }
    }
})


function Quiz(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [questionContainer,setQuestionContainer] = React.useState([<QuizBody/>]);
    const [selectedType, setSelectedType] = React.useState('');
    const [options,setOptions] = React.useState([]);
    const [checkbox,setCheckbox] = React.useState([])
    const [addOptionText, setAddOptionText] = React.useState('');
    const [checkboxText, setCheckboxText] = React.useState('');
    const [howManyQuestions, setHowManyQuestions] = React.useState(1);
    const [examQuestions, setExamQuestions] = React.useState([]);
    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };
    const setOptionText = (e) =>{
        const optionText = e.target.value;
        // setOptions([...options,optionText])
        setAddOptionText(optionText)
    }
    const addOption = (e) => {
        if (options.length < 4)
            setOptions([...options, addOptionText])
        else
            toast("4 options maximum")
    }

    const addQuestionContainer = (e) => {
        if (parseInt(e.target.value) < 101 && parseInt(e.target.value) > 0) {
            setHowManyQuestions(parseInt(e.target.value))
            props.setMaxNumberQuestions(parseInt(e.target.value))
        }else
            toast("that's beyond our limit")
    }
    return (
        <div>                        
                <AppBar sx={{ position: 'fixed'}}>
                    <Toolbar>
                
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Quiz
                        </Typography>
                        <Button style={{ textTransform: 'none' }} autoFocus color="inherit" onClick={handleClose}>
                            Assign
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ mt: 10 }}>
                    <Paper elevation={3} className={classes.paperStyle}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField id="filled-basic"
                                           label="exam title"
                                           size="small"
                                           fullWidth
                                           required
                                           variant="filled" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="filled-basic"
                                           label="points"
                                           size="small"
                                           fullWidth
                                           required
                                           variant="filled" />
                            </Grid>
                            <Grid item xs={6}>
                                {/*<LocalizationProvider dateAdapter={DateAdapter}>*/}
                                {/*/!*<DateTimePicker*!/*/}
                                {/*/!*    label="Date&Time picker"*!/*/}
                                {/*/!*    renderInput={(params) => <TextField {...params} />}*!/*/}
                                {/*/!*    />*!/*/}
                                {/*</LocalizationProvider>*/}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.paperStyle}>
                        <Grid container>

                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                fullWidth
                                label={"How many questions"}
                                inputProps={{ min: 1, max: 100 }}
                                onChange={addQuestionContainer}/>
                        </Grid>
                        </Grid>
                    </Paper>

                    {
                        [...Array(howManyQuestions)].map((val,index)=>{
                            return <QuizBody key={index} id={index+1}/>
                        })
                    }
                </Box>

        </div>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        setMaxNumberQuestions: (questions) => dispatch({type:Actions.SET_MAX_QUESTIONS,
            payload : {questions}}),

    }
}
export default connect(null,mapDispatchToProps)(Quiz)
