import * as PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseClassmates,
  setFilteredClassmates,
} from "../../../../actions/CourseAction";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const useStyles = makeStyles((theme) => ({
  searchbarContainer: {
    borderRadius: 25,
    padding: "5px 12px",
    maxHeight: "31px",
    backgroundColor: "#fff",
    display: "inline-flex",
    alignItems: "center",
    minWidth: "180px",
  },
  searchbar: {
    border: "none",
    "& :focus": {
      outline: "none",
    },
  },
  searchbarIcon: {
    padding: 10,
    transform: "scale(1.2)",
  },
}));

export default function Searchbar(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState();
  const { classmates } = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredClassMates = classmates.filter(({ username }, i) => {
      return username.includes(e.target.value);
    });
    dispatch(setFilteredClassmates(filteredClassMates));
  };
  return (
    <div className={classes.searchbarContainer}>
      <SearchOutlinedIcon className={classes.searchbarIcon} />
      <input
        type="text"
        onChange={handleChange}
        className={classes.searchbar}
        placeholder="Search for a friend"
      />
    </div>
  );
}

Searchbar.propTypes = { classes: PropTypes.any };
