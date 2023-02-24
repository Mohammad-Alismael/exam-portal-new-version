import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 55px;
  padding-top: 1.3rem;
  display: none;
  background-color: #fff;
  width: 80%;
  transform: translateX(${props => !props.openTab ? '-100%' : '0%'});
  height: 100vh;
  z-index: 1000;
  transition: transform 0.4s ease-in-out;
  @media (max-width: 425px) {
    display: inline-block;
  }
`

export const SubItem = styled.div`
  transition: all 0.4s ease-in-out;
  //padding: 0.3rem 0;
  img{
    width: 25px;
    margin-left: 1.8rem;
  }
  span{
    border: 1px solid red;
    text-transform: capitalize;
  }
  &:hover{
    background-color: rgba(255, 205, 56, 0.15);
  }
`

