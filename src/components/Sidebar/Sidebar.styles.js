import styled, { css } from 'styled-components'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Info = css`
  position: absolute;
  opacity: 0;
  display: none;
  left: 60px;
  margin: 0;
  transition: opacity 0.2s ease-in-out;
  @media (max-width: 425px){
    opacity: 1;
    display: block;
  }
`
export const StyledChevronRightIcon = styled(ChevronRightIcon)`
  font-size: 35px;
  position: absolute;
  right: 1.2rem;
  top: 10px;
  display: none;
  transition: transform 0.2s ease-in-out;
  transform: rotate(${props => props.opened ? '90deg' : '0deg'})
`
export const CourseContainer = styled.div`
  display: block;
  width: 92.7%;
  height: 95vh;
  float: right;
  transition: width 0.5s ease-in-out;
  overflow-y: scroll;
  padding: 1rem;
  @media (max-width: 425px) {
    width: 100%;
  }
`
export const CourseCode = styled.p`
  ${Info};
  top: 0;
  font-size: 1rem;
  font-weight: 700;
`
export const LeftArrow = styled.img`
  width: 12px;
  position: absolute;
  right: 1.2rem;
  top: 10px;
  transition: transform 0.2s ease-in-out;
  transform: rotate(${props => props.opened ? '90deg' : '0deg'})
`
export const CourseSection = styled.span`
  ${Info};
  top: 18px;
  font-size: 12px;
`
export const SubItem = styled.div`
 
  display: ${props => props.opened ? 'block' : 'none'};
  transition: all 0.4s ease-in-out;

  position: relative;
  padding: 0.3rem 0 ;
  img{
    width: 25px;
    margin-left: 1.8rem;
  }
  
  span{
    position: absolute;
    left: 70px;
    top: 25%;
    text-transform: capitalize;
  }
  &:hover{
    background-color: rgba(255, 205, 56, 0.15);
  }
`
export const Container = styled.div`
  padding-top: 1.3rem;
  display: inline-block;
  background-color: #fff;
  width: 5%;
  min-width: 45px;
  height: 100vh;
  transition: width 0.5s ease-in-out;
  @media (max-width: 425px) {
    display: none;
  }
  &:hover{
    cursor: pointer;
    width: 15%;
    ~ ${CourseContainer}{
      width: 82.75%;
    }
    ${CourseCode},${CourseSection},${LeftArrow}{
      opacity: 1;
      display: block;
    }
  }
  
  &:not(:hover){
   ${SubItem}{
     display: none;
   }
  }
`
export const BookIcon = styled.img`
  width: 2rem;
  margin-left: 19px;
  @media (max-width: 768px) {
    width: 1.5rem;
    margin-left: 0.50rem;
  }

`
export const Item = styled.div`
  margin-bottom: 0.4rem;
  transition: border-left 0.2s ease-in-out;
  width: 100%;
  position: relative;
  &:hover{
    border-left: 5px solid #FFCD38;
  }
  
  &:hover{
    //background-color: rgba(255, 205, 56, 0.15);
    ${BookIcon}{
      transform: scale(1);
      margin-left: calc(1.5rem - 5px);
    }
  }
`




