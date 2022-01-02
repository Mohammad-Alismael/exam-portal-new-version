import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../img/congrats_img.png";
const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "100%",
    height: "auto",
  },
  relative: {
    position: "relative",
  },
  card: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, 50%)",
  },
}));
export default function CongratulationsView() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth='sm'>
        <div className={classes.relative}>
          <Card
            variant='outlined'
            className={classes.card}
            sx={{ borderRadius: "34px" }}
          >
            <CardContent sx={{ padding: "0", textAlign: "center" }}>
              <img src={logo} className={classes.logo} alt='Exam Portal' />
              <Typography
                variant='h2'
                sx={{ marginTop: "2rem", marginBottom: "0.5rem" }}
              >
                <b>Congratulations</b>
              </Typography>
              <Typography variant='h5'>You did a great job</Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
