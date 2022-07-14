import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ClassCard from "../Components/ClassCard";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: "10%",
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        height: '91.98vh',
        width: '100vw',
        overflow: 'hidden'
    },
    createClass: {
        height: 250,
        "& button": {
            marginLeft: '50%',
            marginTop: '50%',
            transform: 'translate(-50%,-175%)'
        }
    },
    noClass: {
        marginTop: '50% !important',
        transform: 'translate(0%,-100%)'
    }
}));
export default function NewClasses() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
           <ResponsiveAppBar/>
            { true ? <Grid
                container
                  spacing={2} className={classes.root}>
                <ClassCard/>
                <ClassCard/>
                <ClassCard/>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.createClass}>
                        <Button variant="contained" onClick={handleClickOpen}>New Class</Button>
                    </Card>
                </Grid>
            </Grid> : null}
            { true ? <Grid
                container
                spacing={2} className={classes.root}>
                <ClassCard/>
                <ClassCard/>
                <ClassCard/>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.createClass}>
                        <Typography variant={'h5'} align={'center'} className={classes.noClass}>you haven't join any courses yet.</Typography>
                    </Card>
                </Grid>
            </Grid> : null}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new class, please enter class name and time period. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="new class name"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}