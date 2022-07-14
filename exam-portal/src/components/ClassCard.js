import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@mui/material/Card";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 330,
    },
    media: {
        height: 120,
    },
}));
export default function ClassCard (){
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.root}>
            <CardActionArea href='/course1'>
                <CardMedia
                    className={classes.media}
                    image="https://www.gstatic.com/classroom/themes/img_code.jpg"
                />
                <CardContent>
                    <Typography align="left" style={{ fontSize: 22, marginBottom: 20 }}>
                        <b>CS 434</b>
                    </Typography>
                    <Divider />
                    <Typography align="left" style={{ fontSize: 15, marginTop: 20 }}>
                        instructor name
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Grid>
    )
}