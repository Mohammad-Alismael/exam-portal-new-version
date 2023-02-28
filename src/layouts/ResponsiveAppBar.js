import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Alert, AlertTitle, Badge, Popover, Stack, useMediaQuery} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import {fetchNotifications, updateAllNotifications, updateSingleNotification} from "../api/services/Notification";
import moment from "moment";
import { convertToHTML } from "draft-convert";

import { calcState } from "../utils/global/GlobalConstants";
import SidebarMobile from "../components/Sidebar/SidebarMobile";

const settings = [{ title: "Logout", url: "/logout" }];

const useStyles = makeStyles((theme) => ({
    logo: {
        marginRight: '7px',
        marginLeft: '-5px',
        maxWidth: "3.5rem",
        aspectRatio: 1
    }
}));
const ResponsiveAppBar = (props) => {
    const classes = useStyles();
    const [pages, setPages] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [username, setUsername] = useState("");
    const [notification, setNotification] = useState(false);
    const [openTab, setOpenTab] = useState(false);
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector((state) => state.CourseReducer);
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
        let navigateTo;
        if (link == "/courses") {
            navigateTo = link;
        } else {
            navigateTo = `/courses/${course?.courseId}${link}`;
        }
        navigate(navigateTo);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenuItem = (link) => {
        setAnchorElUser(null);
        navigate(link);
    };

    function hideGradesPage() {
        const urls = [
            { title: "courses", url: "/courses" },
            { title: "people", url: "/people" },
        ];

        if (parseInt(user.role_id) !== 3)
            urls.push({ title: "exams", url: "/exams-student" });
        else urls.push({ title: "exams", url: "/exams" });

        setPages(urls);
    }
    const redirectToDashboard = () => {
        navigate("/courses");
    };

    const clickNotificationIcon = () => {
        setNotification(!notification);
        Notification.requestPermission().then((perm) => {
            if (perm === "granted") {
                new Notification("example notification", {
                    body: "this is more text",
                });
            } else {
                alert("notitfy me");
            }
        });
    };

    const seeAllBtnHandler = (e) =>{
        e.preventDefault()
        updateAllNotifications().then((data)=>{
            console.log(data)
            if (data.status === 200 )
                setNotificationList([])
        })
    }
    const handleNotificationCloseIcon = (id) =>{
        updateSingleNotification(id).then((data)=>{
            const newNotificationList = notificationList.filter((val,i)=>{
                return val.id !== id;
            })
            setNotificationList(newNotificationList)
        })
    }
    useEffect(() => {
        // hiding other routes
        if (location.pathname === "/courses") {
            setPages([{ title: "courses", url: "/courses" }]);
        } else {
            hideGradesPage();
        }
    }, [navigate]);

    useEffect(() => {
        const controller = new AbortController();
        setUsername(user?.username);
        fetchNotifications(controller).then((data) => {
            setNotificationList(data);
        });
        return () => {
            controller.abort();
        };
    }, []);
    const isLargeScreen = useMediaQuery('(min-width:768px)');

    return (
        <AppBar position="static" color="white">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {!isLargeScreen ? (<IconButton
                        onClick={()=>{setOpenTab(!openTab)}}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>) : null}
                    <img
                        onClick={redirectToDashboard}
                        src="/logo.png"
                        className={classes.logo}
                        alt="ExamInstructor Portal"
                    />
                    <Typography>Exam portal</Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        ></IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        ></Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
                    <Box sx={{ flexGrow: 0, display: "flex" }}>
                        <MenuItem onClick={clickNotificationIcon}>
                            <IconButton
                                aria-describedby={notification ? "simple-popover" : ""}
                                size="medium"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={notificationList.length} color="primary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Popover
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                open={notification}
                            >
                                <Stack
                                    sx={{ width: "100%" }}
                                    spacing={2}
                                    sx={{ backgroundColor: "secondary.main" }}
                                >
                                    {notificationList.length !== 0 ? (<Box onClick={seeAllBtnHandler}>
                                        <Typography
                                            sx={{ float: "right", pt: 2, pr: 5 }}
                                            color="primary"
                                            variant="overline"
                                            display="block"
                                            gutterBottom
                                        >
                                            see all
                                        </Typography>
                                    </Box>) : null}
                                    {notificationList.length == 0 ? (
                                        <Alert color="primary">
                                            you have no new notifications
                                        </Alert>
                                        ): null }
                                    {notificationList.length !== 0 && notificationList.map(
                                        (
                                            {id,class_name, username, announcement_text, created_at },
                                            i
                                        ) => {
                                            return (
                                                <Alert key={id} onClose={() => {handleNotificationCloseIcon(id)}} color="primary">
                                                    <AlertTitle>
                                                        {class_name} - {username} -{" "}
                                                        {moment(created_at).fromNow()}
                                                    </AlertTitle>
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: convertToHTML(
                                                                calcState(announcement_text).getCurrentContent()
                                                            ),
                                                        }}
                                                    />
                                                </Alert>
                                            );
                                        }
                                    )}
                                </Stack>
                            </Popover>
                        </MenuItem>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((val) => (
                                <MenuItem
                                    key={val.title}
                                    onClick={() => {
                                        handleCloseUserMenuItem(val.url);
                                    }}
                                >
                                    <Typography textAlign="center">{val.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            {/*<SidebarMobile openTab={openTab}/>*/}
        </AppBar>
    );
};

export default ResponsiveAppBar;
