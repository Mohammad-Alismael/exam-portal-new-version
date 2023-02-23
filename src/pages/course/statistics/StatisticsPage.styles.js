import styled from "styled-components";

export const Container = styled.div`
  height: 90vh;
  //background-color: #61dafb;
  padding: 2rem;
  display: grid;
  grid-template-rows: repeat(2, 1fr) 2fr;
  grid-template-columns: repeat(2, 1fr);
;
`
export const Graph1 = styled.div`
  //background-color: goldenrod;
  width: 50%;
  aspect-ratio: 1/1;
  grid-row: 1 / 3;
`

export const Graph2 = styled.div`
  //background-color: blue;
  grid-row: 1 / 3;
;
`

export const QuestionsContainer = styled.div`
  //background-color: yellowgreen;
  grid-row: 3 / 4;
  grid-column: 1 / 3;
;
`