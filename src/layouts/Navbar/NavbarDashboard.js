import React, {memo, useEffect, useState} from "react";
import { Container } from "./NavbarDashboard.styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {
  Alert,
  AlertTitle,
  Badge,
  Popover,
  Stack,
  useMediaQuery,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import moment from "moment/moment";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { convertToHTML } from "draft-convert";
import { calcState } from "../../utils/global/GlobalConstants";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchNotifications,
  updateAllNotifications,
  updateSingleNotification,
} from "../../api/services/Notification";
import LinearProgress from "@mui/material/LinearProgress";
const settings = [{ title: "Logout", url: "/logout" }];

function NavbarDashboard({ loading }) {
  const [pages, setPages] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const { sidebarRef } = useSelector((state) => state.SidebarReducer);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState(false);
  const user = useSelector((state) => state.UserReducerV2).user;
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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

  const seeAllBtnHandler = (e) => {
    e.preventDefault();
    updateAllNotifications().then((data) => {
      console.log(data);
      if (data.status === 200) setNotificationList([]);
    });
  };
  const handleNotificationCloseIcon = (id) => {
    updateSingleNotification(id).then((data) => {
      const newNotificationList = notificationList.filter((val, i) => {
        return val.id !== id;
      });
      setNotificationList(newNotificationList);
    });
  };
  const handleOPenSidebar = () => {
    sidebarRef.current.dataset.open = "true";
  };

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
  const isLargeScreen = useMediaQuery("(max-width:1024px)");
  return (
    <Container>
      <Box
        sx={{
          pr: 3,
          flexGrow: 0,
          display: "flex",
          justifyContent: isLargeScreen ? "space-between" : "flex-end",
        }}
      >
        {isLargeScreen ? (
          <IconButton>
            <MenuOutlinedIcon color="#000" onClick={handleOPenSidebar} />
          </IconButton>
        ) : null}
        <Box
          sx={{ pr: 3, flexGrow: 0, display: "flex", justifyContent: "center" }}
        >
          <MenuItem onClick={clickNotificationIcon}>
            <IconButton>
              <CalendarTodayOutlinedIcon color="#000" />
            </IconButton>
            <IconButton
              aria-describedby={notification ? "simple-popover" : ""}
              size="medium"
              aria-label="show 17 new notifications"
              // color="inherit"
            >
              <Badge badgeContent={notificationList.length} color="primary">
                <NotificationsNoneOutlinedIcon />
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
                {notificationList.length !== 0 ? (
                  <Box onClick={seeAllBtnHandler}>
                    <Typography
                      sx={{ float: "right", pt: 2, pr: 5 }}
                      color="primary"
                      variant="overline"
                      display="block"
                      gutterBottom
                    >
                      see all
                    </Typography>
                  </Box>
                ) : null}
                {notificationList.length == 0 ? (
                  <Alert color="primary">you have no new notifications</Alert>
                ) : null}
                {notificationList.length !== 0 &&
                  notificationList.map(
                    (
                      {
                        id,
                        class_name,
                        username,
                        announcement_text,
                        created_at,
                      },
                      i
                    ) => {
                      return (
                        <Alert
                          key={id}
                          onClose={() => {
                            handleNotificationCloseIcon(id);
                          }}
                          color="primary"
                        >
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
          <Box sx={{ mr: 3 }}>
            <Typography
              mb={0}
              mt={1}
              variant="subtitle2"
              display="block"
              gutterBottom
            >
              {username}
            </Typography>
            <Typography
              sx={{ float: "right" }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {user.role_id == 3 ? "Instructor" : "Student"}
            </Typography>
          </Box>
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
      </Box>
      {loading ? <LinearProgress /> : null}
    </Container>
  );
}

export default memo(NavbarDashboard);
