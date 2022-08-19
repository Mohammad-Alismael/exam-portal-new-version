import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExamReducer from "../../store/reducers/ExamReducer";
import {
    SET_ASSIGNED_FOR,
    SET_ENDING_AT,
    SET_EXAM_TITLE,
    SET_STARTING_AT,
} from "../../store/actions";
import {Dialog, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { v4 as uuidv4 } from "uuid";

function ExamSettings(props) {
    const [open, setOpen] = React.useState(false);
    const [examVisibility, setExamVisibility] = React.useState(null);
    const [checked, setChecked] = React.useState([1]);
    const [studentInfo, setStudentInfo] = React.useState("");
    const [students,setStudents] = React.useState([
        {
            username: 'mhdd',
            email: 'mhdd260@gmail.com'
        },
        {
            username: 'mhd',
            email: 'mhdhd260@gmail.com'
        },
        {
            username: 'kaan',
            email: 'kaan60@gmail.com'
        },
        {
            username: 'ahmed',
            email: '260ahmed@gmail.com'
        },
        {
            username: 'abdullallah',
            email: 'mhdhrgd260@gmail.com'
        },
        {
            username: 'joe',
            email: 'mthfr260@gmail.com'
        },
        {
            username: 'jon jones',
            email: 'fdgv@gmail.com'
        },
        {
            username: 'ya mama',
            email: 'jlk567@gmail.com'
        },
        {
            username: 'nah fam',
            email: 'gthtry5@gmail.com'
        },
        {
            username: 'nigga',
            email: 'ggdfgr5@gmail.com'
        },
        {
            username: 'nigger',
            email: 'fdgbv4@gmail.com'
        },
        {
            username: 'justin',
            email: 'tghdg@gmail.com'
        },
        {
            username: 'dustin',
            email: '5t4df@gmail.com'
        },
        {
            username: 'kamaru usman',
            email: '54gdfv@gmail.com'
        }
    ])
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();
    const handleToggle = (value) => () => {
        // const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];
        //
        // if (currentIndex === -1) {
        //     newChecked.push(value);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }
        //
        // setChecked(newChecked);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateStartingAt = (e) => {
        dispatch({
            type: SET_STARTING_AT,
            payload: { startingAt: Date.parse(e.target.value) },
        });
    };
    const updateEndingAt = (e) => {
        dispatch({
            type: SET_ENDING_AT,
            payload: { endingAt: Date.parse(e.target.value) },
        });
    };
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    id="filled-basic"
                    label="exam title"
                    fullWidth
                    required
                    value={exam?.examTitle}
                    onChange={(e) =>
                        dispatch({
                            type: SET_EXAM_TITLE,
                            payload: { examTitle: e.target.value },
                        })
                    }
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        exam visibility
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={exam?.assignedFor}
                        label="exam visibility"
                        onChange={(e) =>{
                            if (e.target.value == 4){
                                setOpen(true)
                            }else {
                                setOpen(false)
                            }
                            // setExamVisibility(e.target.value)
                            dispatch({
                                type: SET_ASSIGNED_FOR,
                                payload: { assignedFor: e.target.value },
                            })
                        }}
                    >
                        <MenuItem value={1}>undergraduate</MenuItem>
                        <MenuItem value={2}>graduate</MenuItem>
                        <MenuItem value={3}>undergraduate & graduate</MenuItem>
                        <MenuItem value={4}>specific student(s)</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="datetime-local"
                    label="Starting At"
                    type="datetime-local"
                    fullWidth
                    // defaultValue={new Date(exam?.startingAt).toISOString().slice(0, 16)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={updateStartingAt}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="datetime-local"
                    label="Ending At"
                    type="datetime-local"
                    fullWidth
                    onChange={updateEndingAt}
                    // defaultValue={new Date(exam?.endingAt).toISOString().slice(0, 16)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>course name students</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Student Username or Email Address"
                        type="email"
                        onChange={(e)=>{setStudentInfo(e.target.value)}}
                        fullWidth
                        variant="standard"
                    />
                    <List dense sx={{ width: 560, height: 250, bgcolor: 'background.paper',  position: 'relative',
                        overflow: 'auto'}}>
                        {students.filter((student,i)=>{
                            return student['username'].includes(studentInfo) || student['email'].includes(studentInfo)
                        }).map(({username},i) => {
                            const labelId = uuidv4();
                            return (
                                <ListItem
                                    key={labelId}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            // onChange={handleToggle(value)}
                                            // checked={checked.indexOf(value) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={username}
                                                // src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={username} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ExamSettings;
