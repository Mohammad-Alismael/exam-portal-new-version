import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { connect, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {axiosPrivate} from "../api/axios";
import CryptoJS from 'crypto-js'
import {Button, CircularProgress} from "@material-ui/core";
import {Course} from "../api/services/Course";

function Invitation(props) {
    const { invitationHash } = useParams();
    const user = useSelector((state) => state.UserReducerV2).user;
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const [classroomId, setClassroomId] = React.useState("");
    const [instructorEmailId, setInstructorEmailId] = React.useState("");
    const [instructorusername, setInstructorusername] = React.useState("");
    const course = new Course()
    const handleClickOpen = () => {
        course.enrollToCourse(classroomId).then((res)=>{
            toast(res['message'])
            navigate("/courses");
        })
    };

    const handleClose = () => {
        navigate("/courses");
    };
    const handleClickOk = () => {
        navigate("/courses");
    };

    useEffect(() => {
        if (user.role_id != 3) {
            setIsLoading(true);
        let decrypted = CryptoJS.AES.decrypt(invitationHash, process.env.REACT_APP_INVITATION_KEY);
        const decrypt = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(decrypt)
            const classroomId = decrypt.split(":")[0];
            setClassroomId(classroomId);
            const username = decrypt.split(":")[1];
            setInstructorusername(username);
            (async () => {
                let response = await axiosPrivate(`/user/${username}`);
                let user = await response.data;
                setInstructorEmailId(user['email_id'])
                setIsLoading(false)
            })();
        } else {
            toast.info("you are an instructor, can't join other courses!");
            navigate('/')
        }

    }, [invitationHash, navigate, user.role_id]);

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
