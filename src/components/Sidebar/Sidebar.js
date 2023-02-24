import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    BookIcon,
    Container,
    CourseCode,
    CourseSection,
    Item,
    LeftArrow,
    StyledChevronRightIcon,
    SubItem
} from "./Sidebar.styles";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCourses} from "../../api/services/Course";
import {SET_COURSE_LIST} from "../../store/actions";
Sidebar.propTypes = {

};

function Sidebar(props) {
    const {courseList} = useSelector((state)=> state.CourseListReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        getCourses(controller).then((data) => {
            isMounted && dispatch({ type: SET_COURSE_LIST, payload: { courseList: data } });
            console.log("courses => ", data)
        });

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);
    return (
        <Container>
            {
                courseList.map(({class_name,section,classroom_id},index)=> (
                    <Sidebar.Item title={class_name} section={section} classroomId={classroom_id}/>
                ))
            }
        </Container>
    );
}

const ItemComp = ({title,section,classroomId}) => {
    const [opened,setOpen] = useState(false);
    const {user} = useSelector((state) => state.UserReducerV2);
    const handleChange = (e)=>{
        setOpen(!opened);
    }
    return (
        <Item onClick={handleChange}>
            <BookIcon src='/images/icons/book_icon.png' alt='book icon'/>
            <CourseCode>{title}</CourseCode>
            <CourseSection>section {section}</CourseSection>
            <StyledChevronRightIcon />
            <div>
                <Sidebar.SubSubItem opened={opened} title='announcements' path={`/courses/${classroomId}`}/>
                <Sidebar.SubSubItem opened={opened} title='exams' path={`/courses/${classroomId}/${user?.role_id === 3 ? 'exams' : 'exams-student'}`}/>
                <Sidebar.SubSubItem opened={opened} title='people' path={`/courses/${classroomId}/people`}/>
                {/*{user?.role_id === 3 ? <Sidebar.SubSubItem opened={opened} title={'grades'} path={`/courses/${classroomId}/grades`}/> :null}*/}
                {/*{user?.role_id === 3 ? <Sidebar.SubSubItem opened={opened} title={'statistics'} path={`/courses/${classroomId}/statistics`}/>: null}*/}
            </div>
        </Item>
    )
}

Sidebar.Item = ItemComp;
const SubSubItem = ({opened,title,path}) =>{
    const navigate = useNavigate();

    return (
        <SubItem opened={opened} onClick={()=>(navigate(path))}>
            <img src={`/images/icons/${title}_icon.png`} alt={title}/>
            <span>{title}</span>
        </SubItem>
    )
}

Sidebar.SubSubItem = SubSubItem;
export default Sidebar;