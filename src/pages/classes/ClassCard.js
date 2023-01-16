import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@mui/material/Card";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import jwt from "jwt-decode";
import { connect, useSelector } from "react-redux";
import useClipboard from "react-hook-clipboard";
import CryptoJS from "crypto-js";
import { token } from "../../api/axios";
import Avatar from "@mui/material/Avatar";
const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        margin: "0.5rem",
    },
    media: {
        height: 200,
    },
    dots: {
        // position: 'absolute',
        float: "right",
        color: "#FFF",
    },
    classInfo: {
        padding: "0 1rem",
        display: "inline-block",
        color: "#FFF",
        "& p:nth-child(1)": {
            fontWeight: 800,
            fontSize: 18,
            marginBottom: "0.7rem",
        },
        "& p:nth-child(2)": {
            margin: 0,
            fontSize: 14,
        },
    },
    instructorInfo: {
        position: "absolute",
        bottom: 0,
        padding: "0.3rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "& img": {
            display: "inline-block",
            backgroundColor: "red",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "center",
        },
        "& p": {
            paddingLeft: "0.7rem",
            color: "#FFF",
        },
    },
}));

const ITEM_HEIGHT = 48;
function ClassCard(props) {
    const {user} = useSelector((state) => state.UserReducerV2);
    const options = user.role_id == 3 ? ["invitation link"] : ['withdraw course'];
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clipboard, copyToClipboard] = useClipboard();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.root} sx={{ borderRadius: "15px" }}>
                <CardActionArea href={`/courses/${props.courseId}`}>
                    <CardMedia
                        className={classes.media}
                        image={props.img_path}
                    >
                        <div className={classes.classInfo}>
                            <p>{props.classname}</p>
                            <p>{"Section " + props.section.toUpperCase()}</p>
                        </div>

                        <div className={classes.dots}>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={handleClick}
                            >
                                <MoreVertIcon sx={{ color: "#FFF" }} />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: "20ch",
                                    },
                                }}
                            >
                                {props.options.map((option,i) => (
                                    <MenuItem key={option} onClick={props.functions[i]}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <div className={classes.instructorInfo}>
                            <img
                                alt={"img"}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo3luud5KPZknLR5zdUUwzvYBztWgTxrkbA&usqp=CAU"
                            />
                            <p>
                                {parseInt(user.role_id) === 3
                                    ? user.username
                                    : props.username}
                            </p>
                        </div>
                    </CardMedia>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
const mapStateToProps = (state) => {
    return {
        token: state.TokenReducer,
    };
};
export default connect(mapStateToProps, null)(ClassCard);
