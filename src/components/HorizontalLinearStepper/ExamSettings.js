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
    SET_EXAM_TITLE, SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT, SET_STUDENTS, SET_WHO_CAN_SEE_OBJECT,
} from "../../store/actions";
import {
    Dialog,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { v4 as uuidv4 } from "uuid";
import {useLocation, useParams} from "react-router-dom";
import {fetchExamStudents} from "../../api/services/Exam";
import {fetchClassmates} from "../../api/services/Course";

function ExamSettings(props) {
    const [open, setOpen] = React.useState(false);
    const [examVisibility, setExamVisibility] = React.useState(3);
    const [checked, setChecked] = React.useState([]);
    const [studentInfo, setStudentInfo] = React.useState("");
    const [students, setStudents] = React.useState([]);
    const { examId,course_id } = useParams();
    const exam = useSelector((state) => state.ExamReducer);
    const {courseList} = useSelector((state)=> state.CourseListReducer);

    const course = useSelector(state => state.CourseReducer);
    const dispatch = useDispatch();
    const location = useLocation();
    const handleToggle = (username) => () => {
        // get username index
        const studentIndex = students.findIndex((student, i) => {
            return student["username"] === username;
        });

        const newChecked = [...checked];
        // check if it is already selected
        const includes = newChecked.some((val, i) => {
            return val["username"] === username;
        });

        if (!includes && studentIndex !== -1) {
            newChecked.push(students[studentIndex]);
        } else {
            // get selected index
            const currentIndex = checked.findIndex((student, i) => {
                return student["username"] === username;
            });
            // remove selected index
            newChecked.splice(currentIndex, 1);
        }
        dispatch({type: SET_SPECIFIC_STUDENTS, payload: { specificStudents: newChecked }});
        setChecked(newChecked);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        dispatch({
            type: SET_SPECIFIC_STUDENTS,
            payload: { specificStudents: checked },
        });
        setOpen(false);
    }

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
    const handleAssignedFor = (e) => {
        e.preventDefault();
        setExamVisibility(e.target.value)
        if (e.target.value === 4) {
            setOpen(true);
        } else {
            dispatch({
                type: SET_WHO_CAN_SEE_OBJECT,
                payload: { whoCanSee: e.target.value },
            });
            setOpen(false);
        }
        dispatch({
            type: SET_ASSIGNED_FOR,
            payload: { assignedFor: e.target.value },
        });

    };
    const handleCheckedList = (username) => {
        const checkedIndex = checked.findIndex((val, i) => {
            return val["username"] === username;
        });
        return checkedIndex !== -1;
    };
    useEffect(()=>{
        const controller = new AbortController();
        fetchClassmates(course_id,controller).then((data)=>{
            dispatch({
                type: SET_STUDENTS,
                payload: { students: data },
            });
            setStudents(data)
        })
        if (examId == null){//then we are in create exam route
            console.log(course.classmates)
        }else{//then we are in edit mode
            // alert(examId)
            // fetch specific students
        }

        // fetch exam/students
        // fetchExamStudents(examId,controller).then((data)=>{
        //     dispatch({
        //         type: SET_STUDENTS,
        //         payload: { students: data['students'] },
        //     });
        //     setStudents(data['students'])
            // dispatch({
            //     type: SET_SPECIFIC_STUDENTS,
            //     payload: { specificStudents: data["specificStudents"] },
            // });
            // setChecked(data["specificStudents"])

        // })
        console.log(exam);
        return ()=>{
            controller.abort()
        }
    },[location.pathname])
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
                    <InputLabel id="demo-simple-select-label">exam visibility</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={exam?.assignedFor}
                        label="exam visibility"
                        onChange={handleAssignedFor}
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
                    defaultValue={exam?.startingAt !== 0 ? new Date(exam?.startingAt).toISOString().slice(0, 16): new Date().toISOString().slice(0, 16)}
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
                    defaultValue={exam?.endingAt !== 0 ? new Date(exam?.endingAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)}
                    onChange={updateEndingAt}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{course?.course_info?.class_name} course students</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Student Username or Email Address"
                        type="email"
                        onChange={(e) => {
                            setStudentInfo(e.target.value);
                        }}
                        fullWidth
                        variant="standard"
                    />
                    <List
                        dense
                        sx={{
                            width: 560,
                            height: 250,
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                        }}
                    >
                        {students
                            .filter((student, i) => {
                                return (
                                    student["username"].includes(studentInfo) ||
                                    student["email"].includes(studentInfo)
                                );
                            })
                            .map(({ username }, i) => {
                                const labelId = uuidv4();
                                return (
                                    <ListItem
                                        key={labelId}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(username)}
                                                checked={handleCheckedList(username)}
                                                inputProps={{ "aria-labelledby": labelId }}
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
                    <Button onClick={handleOk}>ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ExamSettings;
