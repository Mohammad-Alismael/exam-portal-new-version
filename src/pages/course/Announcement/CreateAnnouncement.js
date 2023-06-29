import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {
  createAnnouncement,
  uploadFileAnnouncement,
} from "../../../api/services/Annoucments";
import { toast } from "react-toastify";
import { setCourseAnnouncements } from "../../../actions/CourseAction";
import { BASE_URL, token } from "../../../api/axios";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { imageFileResizer } from "react-image-file-resizer";
import Avatar from "@mui/material/Avatar";
import * as PropTypes from "prop-types";
import { AttachFileOutlined } from "@mui/icons-material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const useStyles = makeStyles((theme) => ({
  toolbarEditor: {
    backgroundColor: "rgb(248,249,250)",
  },
  wrapperEditor: {
    border: "1px solid rgb(236,236,236)",
  },
  editor: {
    padding: "0.5rem",
    height: "100px",
  },
  editorContainer: {
    padding: "1rem 1rem 0",
  },
  btnContainer2: {
    padding: "0.8rem",
  },
  uploadPreview: {
    padding: "0.8rem",
    maxWidth: "calc(100% - 1.6rem)",
  },
  templateContainer: {
    display: "flex",
    borderRadius: "7px",
    padding: "0.4rem 0",
    marginBottom: "1.8rem",
    justifyItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    "& input": {
      border: "none",
      width: "80%",
      fontSize: 18,
    },
  },
}));

function AnnouncementTemplate({ classes, user, onClick }) {
  return (
    <div className={classes.templateContainer} onClick={onClick}>
      <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
      <input type="text" placeholder="Post announcement to your class..." />
      <AttachFileOutlined style={{ marginTop: "7px" }} alt="send_icon" />
    </div>
  );
}

AnnouncementTemplate.propTypes = {
  classes: PropTypes.any,
  onClick: PropTypes.func,
  user: PropTypes.any,
};

function CreateAnnouncement(props) {
  const { user } = useSelector((state) => state.UserReducerV2);
  const course = useSelector((state) => state.CourseReducer);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setOpenAnnouncement(false);
  };
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const updateList = (data) => {
    console.log("update list", data);
    const tmp = [...course.announcements, { ...data }];
    dispatch(setCourseAnnouncements(tmp));
  };
  const appendText = async (announcementText) => {
    try {
      const data = await createAnnouncement(announcementText, course.courseId);
      console.log("this from the server", data);
      updateList(data);
    } catch (e) {
      if (e.status === 409) toast.error("announcement already existed!");
    }
  };
  const uploadFile = async (data) => {
    const res = await uploadFileAnnouncement(data);
    let new_res = { ...res, file_path: `${BASE_URL}/${res.file_path}` };
    const tmp = [...course.announcements, new_res];
    dispatch(setCourseAnnouncements(tmp));
  };
  const post = (e) => {
    e.preventDefault();
    if (formData == null) {
      const db = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      appendText(db)
        .then((response) => {
          console.log(response);
          setFormData(null);
          setSelectedFile(null);
          setEditorState(
            EditorState.push(editorState, ContentState.createFromText(""))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let data = formData;
      const db = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      data.append("announcementText", db);
      data.append("courseId", course.courseId);
      uploadFile(data)
        .then((response) => {
          console.log(response);
          setFormData(null);
          setSelectedFile(null);
          setEditorState(
            EditorState.push(editorState, ContentState.createFromText(""))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setOpenAnnouncement(false);
  };

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("image", file);
      setFormData(data);
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      resolve({ data: { link: file.preview } });
    });
  }

  const handleImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageFileResizer(
            file,
            300, // desired width
            300, // desired height
            "JPEG", // image format
            100, // quality
            0, // rotation
            (uri) => {
              resolve({ data: { link: uri } });
            },
            "base64" // output type
        );
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {openAnnouncement ? (
        <Paper elevation={5}>
          <Grid container sx={{ marginBottom: "0.8rem" }}>
            <Grid item xs={12} className={classes.editorContainer}>
              <Editor
                toolbarClassName={classes.toolbarEditor}
                wrapperClassName={classes.wrapperEditor}
                editorClassName={classes.editor}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "image",
                    "remove",
                    "history",
                    "fontFamily",
                  ],
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: false },
                  },
                }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              className={classes.btnContainer2}
            >
              <Button
                variant="outlined"
                color="warning"
                type="submit"
                size="small"
                onClick={handleClose}
                sx={{ mr: 3 }}
              >
                <b>cancel</b>
              </Button>
              <Button
                onClick={post}
                variant="contained"
                color="warning"
                type="submit"
                size="small"
              >
                <b>post</b>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <AnnouncementTemplate
          classes={classes}
          onClick={(e) => {
            e.preventDefault();
            setOpenAnnouncement(true);
          }}
          user={user}
        />
      )}
    </>
  );
}

export default CreateAnnouncement;
