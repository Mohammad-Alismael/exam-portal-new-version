import styled from "styled-components";

export const Container = styled.div`
  border-radius: 15px;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
;
`

export const QuestionDetails = styled.div`
  //background-color: greenyellow;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  > span{
    color: #818181;
  }
  
  > p{
    font-weight: bolder;
    font-size: 3vmin;
  }
`

export const OptionBarContainer = styled.div`
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  row-gap: 2rem;
`