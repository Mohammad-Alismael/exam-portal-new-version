import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {SET_EXAM_ANSWER_KEY} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";

export default function ExamAnswerKey(props) {
    const [option,setOption] = useState('')
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.preventDefault()
        dispatch({
            type: SET_EXAM_ANSWER_KEY,
            payload: { postingAnswerKey: e.target.value },
        })
        setOption(e.target.value)
    }
    const postingAnswerKeyAt = (e) => {
        dispatch({
            type: SET_EXAM_ANSWER_KEY,
            payload: { postingAnswerKey: Date.parse(e.target.value) },
        });
    };
    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Posting answer key right after the
                students finishes the exam</FormLabel>
            <RadioGroup onChange={handleChange} defaultValue={true} name="radio-buttons-group">
                <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={false} control={<Radio/>} label="No"/>
            </RadioGroup>
            { option === 'false' ? <TextField
                id="datetime-local"
                label="posting answer key At"
                type="datetime-local"
                fullWidth
                onChange={postingAnswerKeyAt}
                InputLabelProps={{
                    shrink: true,
                }}
            /> : null }
        </FormControl>
    </Grid>;
}

ExamAnswerKey.propTypes = {
    onChange: PropTypes.func,
    endingAt: PropTypes.number
};