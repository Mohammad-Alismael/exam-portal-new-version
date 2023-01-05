import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClassCard from "./ClassCard";
import { Button } from "@material-ui/core";
import {Fab, FormGroup, Typography} from "@mui/material";
import { connect, useSelector } from "react-redux";
import { Course, getCourses } from "../../api/services/Course";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";
import jwt from "jwt-decode";
import {token} from "../../api/axios";
import CryptoJS from "crypto-js";
import Switch from '@mui/material/Switch';
import useClipboard from "react-hook-clipboard";
import FormControlLabel from "@mui/material/FormControlLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "1rem",
        backgroundColor: "#1a1a1a",
        overflow: "hidden",
    },
    createClass: {
        height: 190,
        "& button": {
            marginLeft: "50%",
            transform: "translate(-50%,200%)",
        },
    },
    noClass: {
        transform: "translate(0%,100%)",
    },
    addClassBtn: {
        position: "absolute",
        bottom: "3%",
        right: "2%",
    },
}));
function Classes(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.UserReducerV2).user;
    const [open, setOpen] = React.useState(false);
    const [openDefault, setOpenDefault] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    const [newClassName, setNewClassName] = useState("");
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };
    const [section, setSection] = useState("");
    const [loading, setLoading] = React.useState(true);
    const [clipboard, copyToClipboard] = useClipboard();

    const course = new Course();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const openDefaultBanner = () =>{
        setOpenDefault(true)
    }
    const createClass = () => {
        setLoading(true);
        course
            .createCourse(newClassName, section, user["user_id"])
            .then((res) => {
                toast(res["message"]);
                setCourses([...courses, res["newClassroom"]]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        getCourses(controller).then((data) => {
            isMounted && setCourses(data);
            isMounted && setLoading(false);
        });

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);
    return (
        <>
            <ResponsiveAppBar />
            {!loading ? (
                <>
                    <Grid container spacing={2} className={classes.root}>
                        {courses.map(
                            (
                                { class_name, classroom_id, section, instructor_info },
                                index
                            ) => {
                                return (
                                    <ClassCard
                                        username={parseInt(user?.role_id) === 3 ? user.username : instructor_info["username"]}
                                        key={index}
                                        courseId={classroom_id}
                                        id={classroom_id}
                                        classname={class_name}
                                        section={section}
                                        options={user.role_id == 3 ? ["invitation link"] : ['withdraw course']}
                                        functions={user.role_id == 3 ? [
                                            function (e) {
                                                const user_data = jwt(token);
                                                const textBeforeHash = `${classroom_id}:${user_data.username}`;
                                                let encrypted = encodeURIComponent(
                                                    CryptoJS.AES.encrypt(textBeforeHash, process.env.REACT_APP_INVITATION_KEY)
                                                ).toString();
                                                copyToClipboard(window.location.origin + "/invitation/" + encrypted);
                                                toast.info("copied to clipboard");
                                            }
                                        ] : [
                                            function (e) {
                                                toast.info('withdraw course')
                                            }
                                        ]}
                                    />
                                );
                            }
                        )}
                        {courses?.length === 0 ? (
                            <Grid item xs={12} sm={6} md={3}>
                                <Card className={classes.createClass}>
                                    <Typography
                                        variant={"h5"}
                                        align={"center"}
                                        className={classes.noClass}
                                    >
                                        you haven't join any courses yet.
                                    </Typography>
                                </Card>
                            </Grid>
                        ) : null}
                    </Grid>
                    {parseInt(user?.role_id) === 3 ? (
                        <div className={classes.addClassBtn}>
                            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                                <AddIcon />
                            </Fab>
                        </div>
                    ) : null}
                </>
            ) : (
                <LinearProgress />
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><b>Create New Classroom</b></DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                onChange={(e) => setNewClassName(e.target.value)}
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
                                onChange={(e) => setSection(e.target.value)}
                                autoFocus
                                margin="dense"
                                id="section"
                                color="primary"
                                label="section"
                                type="text"
                                fullWidth
                                variant="filled"
                            />
                            <FormGroup>
                                <FormControlLabel
                                   control={<Switch {...label} color="primary" />}
                                   label="Let students ask questions"
                                   labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={<Switch {...label} color="primary" />}
                                    label="Comments under my comment"
                                    labelPlacement="start"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={openDefaultBanner}>select</Button>
                    <Button onClick={createClass}>Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDefault} onClose={()=> (setOpenDefault(false))}>
                <DialogTitle>default imgs</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Classes;
