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
import * as Actions from "../store/actions";
import {connect, useSelector} from "react-redux";
import useClipboard from "react-hook-clipboard";
import SimpleCrypto from "simple-crypto-js";
import CryptoJS from 'crypto-js'
import {token} from "../api/axios";
const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 300,
    },
    media: {
        height: 120,
    },
}));

const ITEM_HEIGHT = 48;
function ClassCard(props) {
    const user = useSelector((state) => state.UserReducerV2).user;
    const options = user.role_id == 3 ? ["invitation link"] : [];
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
        generateInvitationLink();
        setAnchorEl(null);
    };
    const generateInvitationLink = () => {
        const simpleCrypto = new SimpleCrypto(process.env.REACT_APP_INVITATION_KEY);
        const user_data = jwt(token);
        const textBeforeHash = `${props.id}:${user_data.username}`;
        let encrypted = encodeURIComponent(CryptoJS.AES.encrypt(textBeforeHash, process.env.REACT_APP_INVITATION_KEY)).toString();
        const chiperText = simpleCrypto.encrypt(textBeforeHash);
        copyToClipboard(window.location.origin + "/invitation/" + encrypted);
        toast.info("copied to clipboard");
    };
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
                <CardActionArea href={`/courses/${props.id}`}>
                    <CardHeader
                        action={
                            <div>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? "long-menu" : undefined}
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onMouseDown={(event) => event.stopPropagation()}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
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
                                    {options.map((option) => (
                                        <MenuItem key={option} onClick={handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        }
                        title={
                            <Typography align="left" style={{ fontSize: 22 }}>
                                <b>{props.classname}</b>
                            </Typography>
                        }
                    />

                    <CardMedia
                        className={classes.media}
                        image="https://www.gstatic.com/classroom/themes/img_code.jpg"
                    />
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
const mapDispatchToProps = (dispatch) => {
    return {
        isTokenExpired: () => dispatch({ type: Actions.isExpired }),
    };
};
export default connect(mapStateToProps, null)(ClassCard);
