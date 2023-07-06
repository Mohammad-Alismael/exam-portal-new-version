import React from "react";
import withSideBarAndResAppBar from "../../../layouts/withSideBarAndResAppBar";
import {
  Container,
  Graph1,
  Graph2,
  QuestionsContainer,
} from "./StatisticsPage.styles";
import { Typography } from "@mui/material";
import QuestionsStats from "./QuestionStats/QuestionsStats";

const StatisticsPage = () => {
  const components = new Array(10)
    .fill()
    .map((_, i) => <QuestionsStats key={i} />);

  return (
    <Container>
      <Graph1>
        <Typography sx={{ mb: 4, color: "#fff" }} variant="h4" align={"left"}>
          <b>Average Grades</b>
        </Typography>
      </Graph1>
      <Graph2>
        <Typography sx={{ mb: 4, color: "#fff" }} variant="h4" align={"left"}>
          <b>Hardest Questions</b>
        </Typography>
      </Graph2>
      <QuestionsContainer>
        <Typography sx={{ mb: 4, color: "#fff" }} variant="h4" align={"left"}>
          <b>Questions Statistics</b>
        </Typography>
        {components}
      </QuestionsContainer>
    </Container>
  );
};

export default StatisticsPage;
