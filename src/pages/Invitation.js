import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { connect, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SimpleCrypto from "simple-crypto-js";
import {axiosPrivate} from "../api/axios";
function Invitation(props) {
    const { invitationHash } = useParams();
    const user = useSelector((state) => state.UserReducerV2).user;
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const [classroomId, setClassroomId] = React.useState(0);
    const [instructorEmailId, setInstructorEmailId] = React.useState("");
    const [instructorusername, setInstructorusername] = React.useState("");
    const handleClickOpen = () => {
        // addUserToClassroom().then((data)=>{
        //     console.log(data);
        //     if (data['id'] != null)
        //         toast.success("you've been added to the class successfully")
        //     else
        //         toast.error('you already signed in to this class!')
        //     navigate("/course1");
        // })
    };

    const handleClose = () => {
        navigate("/courses");
    };
    const handleClickOk = () => {
        navigate("/courses");
    };
    const getInstructorInfo = async (username) => {
        const promise = new Promise((resolve, reject) => {
            axios
                .post("http://localhost:8080/get-user-info-by-username", {
                    username,
                })
                .then((data) => {
                    resolve(data.data);
                })
                .catch((error) => {
                    console.log(error);
                    reject("no user id found!");
                });
        });

        try {
            return await promise;
        } catch (e) {
            return Promise.resolve(e);
        }
    };

    const addUserToClassroom = async () => {
        const promise = new Promise((resolve, reject) => {
            axios
                .post("http://localhost:8080/set-classroom-to-students-v2", {
                    classroomId,
                    studentId: props.user.user_id,
                })
                .then((data) => {
                    resolve(data.data);
                })
                .catch((error) => {
                    console.log(error);
                    reject("no user id found!");
                });
        });

        try {
            return await promise;
        } catch (e) {
            return Promise.resolve(e);
        }
    };
    useEffect(() => {
        if (user.role_id != 3) {
            setIsLoading(true);
            const simpleCrypto = new SimpleCrypto(
                process.env.REACT_APP_INVITATION_KEY
            );
            const decrypt = simpleCrypto.decrypt(invitationHash);
            const classroomId = decrypt.split(":")[0];
            setClassroomId(parseInt(classroomId));
            const username = decrypt.split(":")[1];
            setInstructorusername(username);
            (async () => {
                let response = await axiosPrivate(`/user/${username}`);
                let user = await response.data;
                setInstructorEmailId(user['email_id'])
            })();
        } else {
            toast.info("you are an instructor!");
            navigate(-1)
        }
    }, []);

    return (
        <div>
            {isLoading ? <CircularProgress /> : null}
            {!isLoading ? (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {user.role_id != 3
                            ? "Is (s)/he your instructor?"
                            : "invitation link works only for students!"}
                    </DialogTitle>
                    {user.role_id != 3 ? (
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {instructorEmailId}
                            </DialogContentText>
                            <DialogContentText id="alert-dialog-description">
                                {instructorusername}
                            </DialogContentText>
                        </DialogContent>
                    ) : null}
                    <DialogActions>
                        {user.role_id != 3 ? (
                            <>
                                <Button onClick={handleClose}>No</Button>
                                <Button onClick={handleClickOpen} autoFocus>Yes</Button>
                            </>
                            ) : null}
                        {user.role_id == 3 ? (
                            <Button onClick={handleClickOk} autoFocus>
                                ok
                            </Button>
                        ) : null}
                    </DialogActions>
                </Dialog>
            ) : null}
        </div>
    );
}

export default Invitation;
