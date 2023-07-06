import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import * as PropTypes from "prop-types";
import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_TIME_OBJECT,
  SET_EXAM_TIMER,
  SET_NAVIGATION,
} from "../../store/actions";

function ExamTimer(props) {
  const exam = useSelector((state) => state.ExamReducer);
  const [option, setOption] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: SET_EXAM_TIMER,
      payload: { questionTimer: e.target.value === "true" },
    });
    if (e.target.value == "false") {
      dispatch({ type: REMOVE_TIME_OBJECT });
    }
    setOption(e.target.value);
  };
  return (
    <Grid item xs={12}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Setting A Timer For Each Question
        </FormLabel>
        <RadioGroup
          onChange={handleChange}
          defaultValue={exam?.questionTimer}
          name="radio-buttons-group"
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
}

ExamTimer.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default ExamTimer
