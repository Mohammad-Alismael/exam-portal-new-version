import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React, {useState,memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_EXAM_RANDOMNESS} from "../../store/actions";

 function ExamRandomness() {
    const exam = useSelector((state) => state.ExamReducer);
    const [option,setOption] = useState('')
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch({
            type: SET_EXAM_RANDOMNESS,
            payload: { questionRandomness: (e.target.value === 'true') },
        })
    }
    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Show questions randomly</FormLabel>
            <RadioGroup onChange={handleChange} defaultValue={exam?.questionRandomness} name="radio-buttons-group">
                <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={false} control={<Radio/>} label="No"/>
            </RadioGroup>
        </FormControl>
    </Grid>;
}

export default ExamRandomness