import React from 'react';
import Paper from "@mui/material/Paper";
import {useSelector} from "react-redux";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import {InputBase} from "@material-ui/core";

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import classes from "../../../img/classes.jpg";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
    btnContainer:{
        padding: '0 0.8rem'
    }
}));
const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor"
})((p) => ({
    // input label when focused
    "& label.Mui-focused": {
        color: p.focusColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: p.focusColor
        }
    }
}));
function Announcement(props) {
    const user = useSelector(state => state.UserReducerV2).user;
    const classes = useStyles();

    return (
        <Paper elevation={5}>
            <Grid container>
                <Grid item xs={12} className={classes.btnContainer}>
                    <CssTextField
                        fullWidth
                        focusColor={'rgb(255,208,94)'}
                        id="filled-basic"
                        variant="filled"
                        // style={{height: '100px'}}
                        // onChange={(e)=>(setAnnouncementText(e.target.value))}
                        label="Announce something to your class"
                        // startAdornment={
                        //     <InputAdornment position="start">
                        //         <Avatar alt={user['username']} src="/static/images/avatar/2.jpg" />
                        //     </InputAdornment>
                        // }
                    />

                    <Divider style={{marginBottom: '0.8rem'}}/>
                </Grid>
                <Grid container  direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.btnContainer}>
                    <IconButton type="submit" title={'upload file'}>
                        <input hidden accept="image/*" type="file" />
                        <PublishIcon />
                    </IconButton>
                    <Button
                        // onClick={submit}
                        variant="contained"
                        color="warning"
                        type="submit"
                        // className={classes.signInBtn}
                        size="large"
                        style={{marginBottom: '0.8rem'}}
                    >
                        post
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Announcement;