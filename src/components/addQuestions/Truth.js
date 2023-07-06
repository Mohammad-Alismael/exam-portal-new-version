import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector } from "react-redux";

import { selectExamQuestions } from "../../utils/selectors/ExamSelectors";

const Truth = ({ questionIndex, updateQuestionArray }) => {
  const { questions } = useSelector(selectExamQuestions);

  const handleChange = (e) => {
    updateQuestionArray({ answerKey: [e.target.value === "true"] });
  };

  return (
    <RadioGroup
      onChange={handleChange}
      value={questions[questionIndex].answerKey[0] == 1 ? true : false}
      style={{ marginLeft: 12 }}
    >
      <FormControlLabel value={false} control={<Radio />} label="False" />
      <FormControlLabel value={true} control={<Radio />} label="True" />
    </RadioGroup>
  );
};

export default Truth;
