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


const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",

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

    const [type, setType] = React.useState('');
    const [type1, setType1] = React.useState('');
    const [type2, setType2] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleChange1 = (event) => {
        setType1(event.target.value);
    };
    const handleChange2 = (event) => {
        setType2(event.target.value);
    };

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


                        <Grid container spacing={3}>

                            <Grid xs={7} sx={{ ml: 5 }}>
                                <h3>Question 1</h3>
                                <Typography>Is this the first question?</Typography>
                                <RadioGroup >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
                                </RadioGroup>

                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth variant="standard" sx={{ mt: 5 }}>
                                    <InputLabel id="type">Question Type</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        value={type}
                                        label="Question type"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>MCQs</MenuItem>
                                        <MenuItem value={2}>Text</MenuItem>
                                        <MenuItem value={3}>Checkbox</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={3} className={classes.paperStyle}>
                        <Grid container spacing={3}>

                            <Grid xs={7} sx={{ ml: 5 }}>
                                <h3>Question 2</h3>
                                <Typography>Is this the first question?</Typography>
                                <RadioGroup >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
                                </RadioGroup>

                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth variant="standard" sx={{ mt: 5 }}>
                                    <InputLabel id="type1">Question Type</InputLabel>
                                    <Select
                                        labelId="type1"
                                        id="type1"
                                        value={type1}
                                        label="Question type"
                                        onChange={handleChange1}
                                    >
                                        <MenuItem value={1}>MCQs</MenuItem>
                                        <MenuItem value={2}>Text</MenuItem>
                                        <MenuItem value={3}>Checkbox</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={3} className={classes.paperStyle}>
                        <Grid container spacing={3}>

                            <Grid xs={7} sx={{ ml: 5 }}>
                                <h3>Question 3</h3>
                                <Typography>Is this the first question?</Typography>
                                <RadioGroup >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
                                </RadioGroup>

                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth variant="standard" sx={{ mt: 5 }}>
                                    <InputLabel id="type2">Question Type</InputLabel>
                                    <Select
                                        labelId="type2"
                                        id="type2"
                                        value={type2}
                                        label="Question type"
                                        onChange={handleChange2}
                                    >
                                        <MenuItem value={1}>MCQs</MenuItem>
                                        <MenuItem value={2}>Text</MenuItem>
                                        <MenuItem value={3}>Checkbox</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={3} className={classes.paperStyle}>
                        <TextField sx={{ ml: 5, mr: 5, mt: 4 }}
                            label="Points"
                            size="small"
                            align="center"
                        />
                        <TextField sx={{ ml: 4, mr: 4, mt: 4 }}
                            label="Due Date"
                            size="small"
                        />
                        <TextField sx={{ ml: 4, mt: 4 }}
                            label="Topic"
                            size="small"
                            align="right"
                        />
                    </Paper>
                </Box>

        </div>
    );
}

export default Quiz
