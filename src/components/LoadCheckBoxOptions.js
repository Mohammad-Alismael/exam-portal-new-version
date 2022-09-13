import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useSelector} from "react-redux";

function LoadCheckBoxOptions({checkedAr,questionIndex,index}) {
    const exam = useSelector((state) => state.ExamStudentReducer);
    const options = exam.questions[questionIndex].options;
    const shouldDisableCheckbox = value => {
        const maxAllowed = exam.questions[questionIndex].maxAnswerCount
        return checkedAr.length >= maxAllowed && checkedAr.indexOf(value) === -1
    }
    return (
        <>
            <FormControlLabel
                key={index}
                value={index}
                control={<Checkbox id={options[index]["id"]} disabled={shouldDisableCheckbox(index)}/>}
                label={options[index]["optionValue"]}
            />
            {options[index]["img"] != null ? (
                <img
                    style={{ maxWidth: "100%", outline: "1px solid" }}
                    src={options[index]["img"]["preview"]}
                    alt={"question"}
                />
            ) : null}
        </>
    );
}

export default LoadCheckBoxOptions;