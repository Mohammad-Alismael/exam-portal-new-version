import styled, { css } from 'styled-components'

const Info = css`
  position: absolute;
  opacity: 0;
  display: none;
  left: 60px;
  margin: 0;
  transition: opacity 0.2s ease-in-out;
`

export const CourseContainer = styled.div`
  padding: 1rem;
  overflow: hidden;
  width: 92.75%;
  float: right;
  transition: width 0.5s ease-in-out;
`
export const CourseCode = styled.p`
  ${Info};
  top: 0;
  font-size: 1rem;
  font-weight: 700;
`
export const LeftArrow = styled.img`
  width: 12px;
  display: none;
  position: absolute;
  right: 15px;
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
  background-color: rgba(255, 205, 56, 0.15);
  display: ${props => props.opened ? 'block' : 'none'};
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
`
export const Container = styled.div`
  padding-top: 1.3rem;
  display: inline-block;
  background-color: #fff;
  width: 5%;
  height: 100vh;
  transition: width 0.5s ease-in-out;
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
  width: 30px;
  margin-left: 1.2rem;
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
      width: 30px;
      margin-left: calc(1.2rem - 5px);
    }
  }
`




