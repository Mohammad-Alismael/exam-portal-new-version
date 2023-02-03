import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { connect, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import withQuestion from "./withQuestion";
const Truth = ({ id }) => {
    return (
        <RadioGroup>
            <FormControlLabel
                value={1}
                control={<Radio  />}
                label={"True"}
            />
            <FormControlLabel
                value={0}
                control={<Radio />}
                label={"False"}
            />
        </RadioGroup>
    );
};

export default Truth;
