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
    const [instructorId,setInstructorId] = React.useState(0)
    const [instructorEmailId,setInstructorEmailId] = React.useState("");
    const [instructorusername,setInstructorusername] = React.useState("");
    const handleClickOpen = () => {
        addUserToClassroom().then((data)=>{
            console.log(data)
            navigate("/course1");
            toast.success("you've been added to the class successfully")
        })
    };

    const handleClose = () => {
        navigate("/course1");
    };
    const getInstructorInfo = async (userId) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-user-by-id', {
                userId
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
            axios.post('http://localhost:8080/set-classroom-to-students', {
                instructorId,
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
        if (props.user.user_id != 1) {
            setIsLoading(true)
            const decrypt = Buffer.from(invitationHash, 'base64').toString();
            const userId = decrypt.split(":")[0];
            setInstructorId(parseInt(userId));
            const username = decrypt.split(":")[1];
            setInstructorusername(username)
            getInstructorInfo(userId).then((data) => {
                setInstructorEmailId(data['emailId'])
                setIsLoading(false)
            })
        }else {
            toast.warn("invitation link works only for students!")
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
                    Is (s)/he your instructor?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        email id : {instructorEmailId}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        username : {instructorusername}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleClickOpen} autoFocus>
                        Yes
                    </Button>
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