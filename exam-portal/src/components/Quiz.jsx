import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Quiz() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
    }));


    return (
        <div>
            <Button onClick={handleClickOpen} style={{ textTransform: 'none' }}>
                Quiz Assignment
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Quiz
                        </Typography>
                        <Button style={{ textTransform: 'none' }} autoFocus color="inherit" onClick={handleClose}>
                            Assign
                        </Button>
                    </Toolbar>
                </AppBar>

                <Stack spacing={5}>
                    <Item>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-multiline-static"
                            label="Instructions"
                            multiline
                            rows={4}
                        />
                    </Item>

                    <Item>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 2, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField label="Points" variant="standard" />
                            <TextField label="Due Date" variant="standard" />
                            <TextField label="Topic" variant="standard" />
                        </Box>

                    </Item>
                    <Item>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-multiline-static"
                            label="Question 1"
                            multiline
                            rows={2}
                        />
                    </Item>
                    <Item>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-multiline-static"
                            label="Question 2"
                            multiline
                            rows={2}
                        />
                    </Item>
                    <Item>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-multiline-static"
                            label="Question 3"
                            multiline
                            rows={2}
                        />
                    </Item>
                </Stack>

            </Dialog>
        </div>
    );
}

export default Quiz
