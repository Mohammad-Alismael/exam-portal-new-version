import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {BookIcon, Container, CourseCode, CourseSection, Item, LeftArrow, SubItem} from "./Sidebar.styles";

Sidebar.propTypes = {

};

function Sidebar(props) {

    return (
        <Container>
            <Sidebar.Item title={'CS321'} section={'a'}/>
            <Sidebar.Item title={'CS333'} section={'a'}/>
            <Sidebar.Item title={'CS320'} section={'a'}/>
        </Container>
    );
}

const ItemComp = ({title,section}) => {
    const [opened,setOpen] = useState(false);
    const handleChange = (e)=>{
        setOpen(!opened);
    }
    return (
        <Item onClick={handleChange} >
            <BookIcon src={'/images/icons/book_icon.png'} alt={'book icon'}/>
            <CourseCode>{title}</CourseCode>
            <CourseSection>section {section}</CourseSection>
            <LeftArrow opened={opened} src={'/images/icons/left_arrow.png'} alt={'left arrow'}/>
            <div>
                <Sidebar.SubItem opened={opened} title={'announcement'} path={'/courses/:course_id'}/>
                <Sidebar.SubItem opened={opened} title={'exams'} path={'/courses/:course_id/exams'}/>
                <Sidebar.SubItem opened={opened}title={'people'} path={'/courses/:course_id/people'}/>
            </div>
        </Item>
    )
}

Sidebar.Item = ItemComp

Sidebar.SubItem = ({opened,title}) =>{
    return (
        <SubItem opened={opened}>
            <img src={`/images/icons/${title}_icon.png`} alt={title}/>
            <span>{title}</span>
        </SubItem>
    )
}

export default Sidebar;