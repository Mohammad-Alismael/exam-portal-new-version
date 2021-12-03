import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../img/logo.png'
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: '13%',
        marginLeft: '10px',
        marginRight: '77%'
    },
    root: {
        maxWidth: 330,
    },
    media: {
        height: 120,
    },
}));

const theme2 = createTheme({
    typography: {
        h3: {
            fontSize: 32,
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: '#161b22',
        },
        secondary: {
            main: '#ffd05e',
        }
    }
})


function Login() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar>
                    <ThemeProvider theme={theme2}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="primary"
                            aria-label="menu"
                            sx={{ mr: 1, ml: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={logo} className={classes.logo} alt="Exam Portal" />
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="primary"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>

            <Grid align="left" style={{ marginTop: '8%', marginLeft: '3%' }}>
                <Grid item sm={3}>
                    <Card className={classes.root}>
                        <CardActionArea href='/course1'>
                            <CardMedia
                                className={classes.media}
                                image="https://www.gstatic.com/classroom/themes/img_code.jpg"
                            />
                            <CardContent style={{ paddingBottom: '40%' }}>
                                <Typography align="left" style={{ fontSize: 22, marginBottom: 20 }}>
                                    <b>CS 434</b>
                                </Typography>
                                <Divider />
                                <Typography align="left" style={{ fontSize: 15, marginTop: 20 }}>
                                    Özyeğin University
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;