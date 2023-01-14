import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import {Button, TextField} from "@material-ui/core";
import {FormGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {createCourse} from "../../api/services/Course";
import {toast} from "react-toastify";
import DefaultImages from "./DefaultImages";
import {useSelector} from "react-redux";
import { useDropzone } from "react-dropzone";
import {makeStyles} from "@material-ui/core/styles";
import uuid from "draft-js/lib/uuid";
import Dropzone from "./Dropzone";

function CreateClassroom({open,onClose,setLoadingProp,courses,setCourses}) {
    const [newClassName, setNewClassName] = useState("");
    const [section, setSection] = useState("");
    const [DefaultImgOpen, setDefaultImgOpen] = React.useState(false);
    const user = useSelector((state) => state.UserReducerV2).user;


    const setCourseName = (e) => {
        setNewClassName(e.target.value);
    }

    const setCourseSection = (e) => {
        setSection(e.target.value);
    }
    const handleClose = () => {
        setDefaultImgOpen(false)
    }
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log( { id: uuid(), src: e.target.result })
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);
    const createClass = () => {
        setLoadingProp(true);
        createCourse(newClassName, section, user["user_id"])
            .then((res) => {
                toast(res["message"]);
                setCourses([...courses, res["newClassroom"]]);
                setLoadingProp(false);
            })
            .catch((error) => {
                console.log(error);
            });
        onClose();
    };

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle><b>Create New Classroom</b></DialogTitle>
        <DialogContent>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} xl={12}>
                    <TextField
                        onChange={setCourseName}
                        autoFocus
                        margin="dense"
                        id="class_name"
                        label="class name (required)"
                        type="text"
                        color="primary"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        onChange={setCourseSection}
                        autoFocus
                        margin="dense"
                        id="section"
                        color="primary"
                        label="section"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <Dropzone onDrop={onDrop} accept={"image/*"} />
                    <FormGroup>
                        <FormControlLabel
                            style={{justifyContent: 'space-around'}}
                            control={<Switch color="primary"/>}
                            label="Let students ask questions/announcements"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Switch color="primary"/>}
                            style={{justifyContent: 'space-around'}}
                            label="Let students comment under my announcements"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={createClass}>Create</Button>
        </DialogActions>

        <DefaultImages open={DefaultImgOpen} onClose={handleClose}/>

    </Dialog>
}

export default CreateClassroom;