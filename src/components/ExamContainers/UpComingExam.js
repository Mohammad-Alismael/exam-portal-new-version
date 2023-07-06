import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useStyleExamStudentCard } from "../../utils/global/useStyles";

const useStyles = makeStyles(({ palette }) => ({
  itemElement: {
    backgroundColor: "#FFF",
    minWidth: "100%",
    marginBottom: "0.8rem",
    borderRadius: "15px",
    position: "relative",
    cursor: "pointers !important",
  },
  headerContainer: {
    position: "absolute",
    top: "0.5rem",
    display: "inline-block",
    height: "60px",
  },
  miniHeader: {
    margin: 0,
    padding: 0,
    color: "#000000",
  },
  examTitle: {
    textTransform: "capitalize",
    paddingTop: "0.5rem",
    marginBottom: "3px",
    fontWeight: "bold",
  },
  submittedAt: {
    fontSize: "10px",
    paddingTop: "8px",
    color: "#818181",
  },
}));

export default function UpComingExam({ title, examId, startingAt, endingAt }) {
  const classes = useStyles();
  const { course_id } = useParams();
  const navigate = useNavigate();
  const classCircle = useStyleExamStudentCard({
    color: "#42D62A",
  });
  const redirect = (e) => {
    e.preventDefault();
    const now = new Date().getTime();
    if (startingAt < now && endingAt > now) navigate(`/course-page/${course_id}/exam/${examId}`);
    else toast.info("you are too late foe taking this exam");
  };
  const isSameDay = moment(startingAt).isSame(endingAt, "day");
  const formattedStartingAt = moment(startingAt).format("dddd Do, h:mm:ss a");
  const formattedEndingAt = moment(endingAt).format("h:mm:ss a");
  return (
    <div className={classes.itemElement} onClick={redirect}>
      <div className={classCircle.circle}>
        <span>New</span>
      </div>
      <div className={classes.headerContainer}>
        <p className={classNames(classes.miniHeader, classes.examTitle)}>
          {title}
        </p>
        {isSameDay ? (
          <p className={classNames(classes.miniHeader, classes.submittedAt)}>
            {formattedStartingAt} - {formattedEndingAt}
          </p>
        ) : (
          <p className={classNames(classes.miniHeader, classes.submittedAt)}>
            {moment(startingAt).format("dddd Do, h:mm:ss a")} -{" "}
            {moment(endingAt).format("dddd Do, h:mm:ss a")}
          </p>
        )}
      </div>
    </div>
  );
}

UpComingExam.propTypes = { classes: PropTypes.any };
