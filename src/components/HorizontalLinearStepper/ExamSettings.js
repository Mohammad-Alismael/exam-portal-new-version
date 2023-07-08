import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_WHO_CAN_SEE_OBJECT } from "../../store/actions";
import { TextField } from "@mui/material";

import {
  setAssignedFor,
  setEndingAt,
  setExamTitle,
  setStartingAt,
} from "../../actions/ExamActions";
import SpecificStudentContainer from "./SpecificStudentContainer";
import { selectExamSettings } from "../../store/selectors/ExamSelectors";

function ExamSettings(props) {
  const { examTitle, startingAt, endingAt, assignedFor } =
    useSelector(selectExamSettings);
  console.log({ examTitle, startingAt, endingAt, assignedFor })
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  console.log({ examTitle, startingAt, endingAt, assignedFor });

  const updateStartingAt = (e) => {
    dispatch(setStartingAt(Date.parse(e.target.value)));
  };
  const updateEndingAt = (e) => {
    dispatch(setEndingAt(Date.parse(e.target.value)));
  };
  const handleAssignedFor = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val === 4) {
      setOpen(true);
    } else {
      dispatch({
        type: SET_WHO_CAN_SEE_OBJECT,
        payload: { whoCanSee: e.target.value },
      });
      setOpen(false);
    }
    dispatch(setAssignedFor(val));
  };

  return (
    <>
      <Grid item xs={6}>
        <TextField
          id="filled-basic"
          label="exam title"
          fullWidth
          required
          value={examTitle}
          onChange={(e) => dispatch(setExamTitle(e.target.value))}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">exam visibility</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={assignedFor}
            label="exam visibility"
            onChange={handleAssignedFor}
          >
            <MenuItem value={1}>undergraduate</MenuItem>
            <MenuItem value={2}>graduate</MenuItem>
            <MenuItem value={3}>undergraduate & graduate</MenuItem>
            <MenuItem value={4}>specific student(s)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="datetime-local"
          label="Starting At"
          type="datetime-local"
          fullWidth
          defaultValue={new Date(parseInt(startingAt)).toISOString().slice(0, 16)}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={updateStartingAt}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="datetime-local"
          label="Ending At"
          type="datetime-local"
          fullWidth
          defaultValue={new Date(endingAt).toISOString().slice(0, 16)}
          onChange={updateEndingAt}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <SpecificStudentContainer open={open} setOpen={setOpen} />
    </>
  );
}

export default ExamSettings;
