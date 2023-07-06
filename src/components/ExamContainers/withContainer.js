import React from "react";
import UpComingExam from "./UpComingExam";
import NoExam from "./NoExam";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  itemContainer: {

  },
  len: {
    fontSize: "1rem",
    color: "#868686",
    margin: "0 0.2rem",
  },
  elementsContainer: {
    height: "75vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0 !important",
    },
  },
  itemContainerHeader: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 800,
    fontSize: 22,
    margin: "1rem 0",
    padding: 0,
  },
}));
function WithContainer(WrappedComponent) {
  return function New(props) {
    const classes = useStyles();
    return (
      <div className={classes.itemContainer}>
        <h4 className={classes.itemContainerHeader}>
          {props.title}{" "}
          <span className={classes.len}>({props.exams.length})</span>
        </h4>
        <div className={classes.elementsContainer}>
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
}

export default WithContainer;
