import React, {useEffect, useState} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useSelector} from "react-redux";
import {convertToHTML} from "draft-convert";
import {calcState} from "../utils/global/GlobalConstants";

function LoadCheckBoxOptions({checkedAr,questionIndex,index}) {
    const exam = useSelector((state) => state.ExamStudentReducer);
    const options = exam.questions[questionIndex].options;
    const shouldDisableCheckbox = value => {
        const maxAllowed = exam.questions[questionIndex].maxAnswerCount
        return checkedAr.length >= maxAllowed && checkedAr.indexOf(value) === -1
    }
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(calcState(options[index]["optionValue"]).getCurrentContent());
        setConvertedContent(html);
        console.log("preview =>",exam.questions[questionIndex]['previewFile'])
    }, [exam.questions, questionIndex]);
    return (
        <>
            <FormControlLabel
                key={index}
                value={index}
                control={<Checkbox id={options[index]["id"]} disabled={shouldDisableCheckbox(index)}/>}
                label={<p dangerouslySetInnerHTML={{__html: convertToHTML(calcState(options[index]["optionValue"]).getCurrentContent())}} />}
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