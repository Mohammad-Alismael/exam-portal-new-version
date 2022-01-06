import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import axios from "axios";
import {connect} from "react-redux";
import {toast} from "react-toastify";
function Invitation(props) {
    const {invitationHash} = useParams();
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const [classroomId,setClassroomId] = React.useState(0);
    const [instructorEmailId,setInstructorEmailId] = React.useState("");
    const [instructorusername,setInstructorusername] = React.useState("");
    const handleClickOpen = () => {
        addUserToClassroom().then((data)=>{
            console.log(data);
            if (data['id'] != null)
                toast.success("you've been added to the class successfully")
            else
                toast.error('you already signed in to this class!')
            navigate("/course1");
        })
    };

    const handleClose = () => {
        navigate("/course1");
    };
    const handleClickOk = () => {
        navigate("/course1");
    }
    const getInstructorInfo = async (username) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-user-info-by-username', {
                username
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no user id found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const addUserToClassroom = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/set-classroom-to-students-v2', {
                classroomId,
                studentId: props.user.user_id
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no user id found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }
    useEffect(()=>{
        if (props.user.role_id != 1) {
            setIsLoading(true)
            const decrypt = Buffer.from(invitationHash, 'base64').toString();
            const classroomId = decrypt.split(":")[0];
            setClassroomId(parseInt(classroomId));
            const username = decrypt.split(":")[1];
            setInstructorusername(username)
            getInstructorInfo(username).then((data) => {
                setInstructorEmailId(data['emailId'])
                setIsLoading(false)
            })
        }
    },[])

    return (
        <div>
            {isLoading ? <CircularProgress /> : null}
            {!isLoading ? <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.user.role_id != 1 ? "Is (s)/he your instructor?": "invitation link works only for students!"}
                </DialogTitle>
                {props.user.role_id != 1 ? <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        email id : {instructorEmailId}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        username : {instructorusername}
                    </DialogContentText>
                </DialogContent> : null }
                <DialogActions>
                    {props.user.role_id != 1 ? <Button onClick={handleClose}>No</Button> : null}
                        {props.user.role_id != 1 ? <Button onClick={handleClickOpen} autoFocus>
                        Yes
                    </Button> : null }
                    {props.user.role_id == 1 ?<Button onClick={handleClickOk} autoFocus>
                            ok
                        </Button> : null }
                </DialogActions>
            </Dialog> : null }
        </div>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
    }
}
export default connect(mapStateToProps)(Invitation);