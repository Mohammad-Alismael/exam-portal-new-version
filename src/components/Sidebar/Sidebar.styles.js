import styled, { css } from 'styled-components'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';

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
const Icons = css`
  transform: scale(1.25);
  margin-left: 1.8rem;
  color: #66676B;
`
export const StyledChevronRightIcon = styled(ChevronRightIcon)`
  font-size: 35px;
  position: absolute;
  right: 1.2rem;
  top: 10px;
  opacity: 0;
  transform: rotate(${props => props.opened ? 90 : 0}deg);
  transition: transform 0.4s ease-in-out 0.4s;
`

export const StyledExamIcon = styled(NoteAltOutlinedIcon)`
  ${Icons}
`
export const StyledPeopleIcon = styled(Groups2OutlinedIcon)`
  ${Icons}
`
export const StyledCampaignIcon = styled(CampaignOutlinedIcon)`
  ${Icons}
`

export const StyledBookIcon = styled(CastForEducationOutlinedIcon)`
  transform: scale(1.55);
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
  color: #66676B;
  @media (max-width: 768px) {
    width: 1.5rem;
    margin-left: 0.50rem;
  }
`
export const CourseContainer = styled.div`
  display: block;
  margin: 0 2.5% 0 7.5%;
  width: 92.75%;
  height: 95vh;
  float: right;
  transition: width 0.5s ease-in-out;
  overflow-y: scroll;
  @media (max-width: 425px) {
    width: 100%;
  }
`
export const CourseCode = styled.p`
  ${Info};
  top: 0;
  font-size: 1rem;
  font-weight: 600;
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
export const TitleH3 = styled.h3`
  display: inline-block;
  opacity: 0;
  visibility: hidden;
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
export const Logo = styled.img`
  display: inline-block;
  max-width: 3.5rem;
  margin-left: 4px;
  margin-top: 0;
`
export const Container = styled.div`
  position: absolute;
  top: 0;
  display: inline-block;
  background-color: #fff;
  width: 4.5%;
  min-width: 45px;
  height: 100vh;
  transition: width 0.2s ease-in-out;
  z-index: 999;
  //border-radius: 0 7px 7px 0;
  @media (max-width: 425px) {
    display: none;
  }
  &:hover{
    cursor: pointer;
    width: 15%;
    ${CourseCode},${CourseSection},${StyledChevronRightIcon} {
      opacity: 1;
      display: block;
    }
    ${TitleH3} {
      opacity: 1;
      visibility: visible;
      display: inline-block;
    }
    ${LogoContainer}{
      margin-bottom: 0.8rem;
    }
  }
  
  &:not(:hover){
   ${SubItem}{
     display: none;
   }
  }
`

export const Item = styled.div`
  margin-bottom: 0.6rem;
  transition: border-left 0.2s ease-in-out;
  width: 100%;
  position: relative;
  &:hover{
    border-left: 5px solid #FFCD38;
  }
`




