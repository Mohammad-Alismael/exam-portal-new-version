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


function Quiz() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedType, setSelectedType] = React.useState('');
    const [options,setOptions] = React.useState([]);
    const [checkbox,setCheckbox] = React.useState([])
    const [addOptionText, setAddOptionText] = React.useState('');
    const [checkboxText, setCheckboxText] = React.useState('');
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
                        <TextField
                            className={classes.textField}
                            label="Instructions (optional)"
                            multiline
                            rows={4}
                            variant="standard"
                        />
                    </Paper>

                    <Paper elevation={3} className={classes.paperStyle}>

                        <Grid container >
                            <Grid xs={7}>
                                <TextField id="filled-basic"
                                           label="question text"
                                           size="small"
                                           fullWidth
                                           variant="filled" />

                            </Grid>
                            <ImageIcon style={{ height: '40px', width: '40px',margin:'5px',cursor: "pointer" }}/>
                            <Grid xs={4}>
                                <FormControl fullWidth variant="standard" >
                                    <InputLabel id="type">Question Type</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        value={selectedType}
                                        label="Question type"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>MCQs</MenuItem>
                                        <MenuItem value={2}>Text</MenuItem>
                                        <MenuItem value={3}>Checkbox</MenuItem>
                                        <MenuItem value={4}>Matching</MenuItem>
                                        <MenuItem value={5}>True/False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                {selectedType == 1 ?
                                    <Grid>
                                        <RadioGroup >
                                            {
                                                options.map((val,index)=>{
                                                    return <FormControlLabel value={index} control={<Radio />} label={val} />
                                                })
                                            }
                                            <TextField id="filled-basic"
                                                       label="Add Option"
                                                       size="small"
                                                       variant="standard"
                                                       onChange={setOptionText}/>
                                        <br/>
                                            <Button
                                                variant={"outlined"}
                                                variant="contained"
                                                size={"medium"} onClick={addOption}>submit option</Button>
                                        </RadioGroup>
                                    </Grid> : null}
                                {selectedType == 2 ?
                                    <div>
                                        <TextField id="filled-basic"
                                                   label="long answer text"
                                                   fullWidth
                                                   disabled
                                                   variant="standard" />
                                    </div> : null}
                                {selectedType == 3 ?
                                    <Grid container>

                                        {
                                            checkbox.map((val,index)=>{
                                                return  <Grid item xs={6}>
                                                    <FormControlLabel control={<Checkbox />} label={val} />
                                                </Grid>
                                            })
                                        }

                                        <TextField id="filled-basic"
                                                   label="Add Option"
                                                   size="small"
                                                   variant="standard"
                                                   onChange={(e)=>
                                                       (setCheckboxText(e.target.value))}/>
                                        <br/>
                                        <Button
                                            variant={"outlined"}
                                            variant="contained"
                                            size={"medium"} onClick={(e)=>
                                            (setCheckbox([...checkbox,checkboxText]))}>submit option</Button>

                                    </Grid> : null}
                                {selectedType == 4 ?
                                    <div>
                                        <TextField id="filled-basic"
                                                   label="long answer text"
                                                   fullWidth
                                                   variant="standard" />
                                    </div> : null}
                                {selectedType == 5 ?
                                    <RadioGroup>
                                        <FormControlLabel value={1} control={<Radio />} label={"True"} />
                                        <FormControlLabel value={0} control={<Radio />} label={"False"} />
                                    </RadioGroup> : null}
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            size="small"
                            left={"50px"}
                            id={"add-question"}
                            onClick={addQuestionContainer}
                        >add question
                        </Button>
                    </Paper>

                </Box>

        </div>
    );
}

export default Quiz
