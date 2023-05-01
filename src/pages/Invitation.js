import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { connect, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosPrivate } from "../api/axios";
import CryptoJS from "crypto-js";
import { Button, CircularProgress } from "@material-ui/core";
import { enrollToCourse } from "../api/services/Course";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingSpinner from "../components/LoadingSpinner";

function Invitation(props) {
  const { invitationHash } = useParams();
  const user = useSelector((state) => state.UserReducerV2).user;
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [classroomId, setClassroomId] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [instructorEmailId, setInstructorEmailId] = React.useState("");
  const [instructorusername, setInstructorusername] = React.useState("");
  const handleClickOpen = () => {
    enrollToCourse(classroomId).then((res) => {
      toast(res["message"]);
      navigate("/courses");
    });
  };

  const handleClose = () => {
    navigate("/courses");
  };
  const handleClickOk = () => {
    navigate("/courses");
  };

  useEffect(() => {
    if (parseInt(user.role_id) === 3) {
      // Redirect instructor to dashboard
      toast.info("You are an instructor and can't join other courses!");
      navigate("/");
      return;
    }

    setIsLoading(true);

    const decryptInvitation = async () => {
      try {
        const decrypted = CryptoJS.AES.decrypt(
            invitationHash,
            process.env.REACT_APP_INVITATION_KEY
        ).toString(CryptoJS.enc.Utf8);

        const [classroomId, username, className_] = decrypted.split(":");
        setClassroomId(classroomId);
        setClassName(className_);
        setInstructorusername(username);

        const response = await axiosPrivate(`/user/${username}`);
        const instructor = response.data;
        setInstructorEmailId(instructor.email_id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    decryptInvitation();
  }, [invitationHash, navigate, user.role_id]);

if (!isLoading)
  return (
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes"
      confirmBtnBsStyle="primary"
      title={
        parseInt(user.role_id) !== 3
          ? `Is ${instructorusername} your instructor?`
          : "invitation link works only for students!"
      }
      onConfirm={handleClickOpen}
      onCancel={handleClose}
      focusCancelBtn
    >
      You will joining {className}
    </SweetAlert>
  );
else
  return <LoadingSpinner />;
}

export default Invitation;
