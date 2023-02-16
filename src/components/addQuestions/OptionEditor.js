// @flow
import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import {FormGroup, TextField} from "@mui/material";
import Dropzone from "../../pages/classes/Dropzone";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DefaultImages from "../../pages/classes/DefaultImages";
import QuestionEditor from "./QuestionEditor";
import {makeStyles} from "@material-ui/core/styles";
import {convertToRaw, EditorState} from "draft-js";
const useStyles = makeStyles((theme) => ({
    textEditorContainer: {
        // minHeight: '150px',
        // padding: "15% 7%",
        // background: 'blue',
        // borderTop: '1px solid #D9D9D9'
    },
    container:{
        padding: "10%"
    }
}));
export const OptionEditor = ({open,editorStateOption,setEditOpen,addOption,updateQuestionOption}) => {
    const classes = useStyles();
    // const [editorStateOption, setEditorStateOption] = React.useState(EditorState.createEmpty());

    return (
    <Dialog open={open} onClose={(e)=>(setEditOpen(false))} className={classes.container}>
        <DialogTitle><b>Add options</b></DialogTitle>
        <DialogContent>
            <Grid container justifyContent={'flex-end'}>
                <Grid item xs={12} className={classes.textEditorContainer}>
                    <QuestionEditor editorState={editorStateOption} onEditorStateChange={updateQuestionOption}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            {/*<Button color="primary" onClick={(e)=>(setEditOpen(false))}>Cancel</Button>*/}
            <Button variant="contained" color="primary" onClick={addOption}>add option</Button>
        </DialogActions>
    </Dialog>
    );
};