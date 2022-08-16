import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_EXAM_TIMER, SET_NAVIGATION} from "../../store/actions";

export default function ExamTimer(props) {
    const exam = useSelector((state) => state.ExamReducer);
    const [option,setOption] = useState('')
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.value == 0){
            dispatch({
                type: SET_EXAM_TIMER,
                payload: { questionTimer: null },
            })
        }
        setOption(e.target.value)
    }
    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">setting a timer for each
                question</FormLabel>
            <RadioGroup onChange={handleChange} defaultValue="0" name="radio-buttons-group">
                <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={0} control={<Radio/>} label="No"/>
            </RadioGroup>
            { option == '1' ? <TextField
                label="mins per question"
                type="number"
                fullWidth
                // value={props.value}
                inputProps={{min: 1}}
                onChange={(e)=>{ dispatch({
                    type: SET_EXAM_TIMER,
                    payload: { questionTimer: e.target.value },
                })}}
                required
                variant="outlined"/> : null }
        </FormControl>
    </Grid>;
}

ExamTimer.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
};