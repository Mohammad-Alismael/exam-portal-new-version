import React from "react";
import { useDropzone } from "react-dropzone";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
const useStyles = makeStyles((theme) => ({
    dropzone: {
        border:"3px #FFCD38 dashed",
        textAlign: 'center',
        margin: '5% 0',
        padding: 15
    },
    icon: {
        width: '25%',
        margin: 0,
        padding: 0
    }
}));
function Dropzone({ onDrop, accept, setDefaultImgOpen }) {
    const classes = useStyles();
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
            accept,
            onDrop,
        });
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    return (
        <div>
            <div {...getRootProps({ className: "dropzone" })} className={classes.dropzone}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                        <p className="dropzone-content">
                            Release to drop the files here
                        </p>
                    ) : (
                        <>
                            <img className={classes.icon} src='/images/icons/cloud-upload.png' alt='gg'/>
                            <p>Drag your image for cover photo</p>
                        </>
                    )}
                </div>

            </div>
            <Button size="small" variant="contained" onClick={()=>(setDefaultImgOpen(true))}>or choose form here</Button>
            <aside>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}
export default Dropzone;