import React from 'react';
import {useNavigate} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import logo from "../img/logo.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@material-ui/core/Typography";

function ExamCard(props) {
    const navigate = useNavigate();
    const handleCLick = () => {
        navigate(`/result/${props.examId}`)
    }
    return (
        <Grid item onClick={handleCLick}>
            <Card sx={{ width: 300,minHeight:100 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={logo}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="h6">
                        {props.examTitle}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ExamCard;