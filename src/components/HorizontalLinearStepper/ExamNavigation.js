import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_NAVIGATION} from "../../store/actions";

export default function ExamNavigation() {
    const exam = useSelector((state) => state.ExamReducer);
    const [option,setOption] = useState('')
    const dispatch = useDispatch();

    return <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Exam/Quiz navigation</FormLabel>
            <RadioGroup defaultValue={exam?.navigation} name="radio-buttons-group"
            onChange={(e)=>(
                dispatch({
                    type: SET_NAVIGATION,
                    payload: { navigation: (e.target.value === 'true') },
                })
            )}>
                <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
                <FormControlLabel value={false} control={<Radio/>} label="No"/>
            </RadioGroup>
        </FormControl>
    </Grid>;
}