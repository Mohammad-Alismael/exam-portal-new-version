import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {makeStyles} from "@material-ui/core/styles";
import {theme,authStyles} from '../utils/global/useStyles'
import {connect, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import jwt from "jwt-decode";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosPrivate, token, updateToken} from "../api/axios";
import {toast} from "react-toastify";
import User from "../api/services/User";
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = [{title: 'Logout', url: '/logout'}];

const useStyles = makeStyles((theme) => ({
    logo: {
        marginTop: '-5px',
        maxWidth: '13%',
    },
}));
const ResponsiveAppBar = (props) => {
    const classes = useStyles();
    const [pages,setPages] = useState([])
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [username,setUsername] = useState('');
    const user = useSelector(state => state.UserReducerV2).user;
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (link) => {
        setAnchorElNav(null);
        const str = location.pathname
        const words = str.split('/')
        let navigateTo;
        if (link == "/courses"){
            navigateTo = link
        }else {
            navigateTo = `/${words[1]}/${words[2]}${link}`
        }
        navigate(navigateTo)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenuItem = (link) => {
        setAnchorElUser(null);
        navigate(link)
    };
    useEffect(()=>{

        // hiding other routes
        if (location.pathname === "/courses"){
            setPages([{title: 'courses', url: '/courses'}])
        }else {
            setPages([{title: 'courses', url: '/courses'},
                {title: 'exams', url: '/exams'},
                {title: 'people', url: '/people'},
                {title: 'grades', url: '/grades'}])
        }
    },[navigate])

    useEffect(()=>{
        setUsername(user?.username)
    },[])


    return (
        <AppBar position="static" color="white">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={process.env.PUBLIC_URL +'/images/logo.png'} className={classes.logo} alt="Exam Portal" />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={() => handleCloseNavMenu(page.url)}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => handleCloseNavMenu(page.url)}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((val) => (
                                <MenuItem key={val.title}
                                          onClick={() => {handleCloseUserMenuItem(val.url)}}>
                                    <Typography textAlign="center">{val.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;
