import { Paper, Typography } from "@mui/material";
import React, {memo} from "react";
import ExamSettings from "./HorizontalLinearStepper/ExamSettings";
import ExamNavigation from "./HorizontalLinearStepper/ExamNavigation";
import ExamTimer from "./HorizontalLinearStepper/ExamTimer";
import ExamRandomness from "./HorizontalLinearStepper/ExamRandomness";
import ExamAnswerKey from "./HorizontalLinearStepper/ExamAnswerKey";
import { makeStyles } from "@material-ui/core/styles";
import HorizontalLinearStepper from "./HorizontalLinearStepper/HorizontalLinearStepper";
const components = [
  <ExamSettings />,
  <ExamNavigation />,
  <ExamTimer />,
  <ExamRandomness />,
  <ExamAnswerKey />,
];
const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: "1rem",
  },
}));
function ExamLinearStepper(props) {
  const classes = useStyles();
  return (
    <>
      <Typography sx={{ mb: 4, color: "#fff" }} variant="h4" align={"left"}>
        <b>Exam Details</b>
      </Typography>
      <Paper elevation={5} className={classes.paperStyle}>
        <HorizontalLinearStepper components={components} />
      </Paper>
    </>
  );
}

export default memo(ExamLinearStepper);
