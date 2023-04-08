import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    CourseCode,
    CourseSection,
    Item,
    Logo, LogoContainer, StyledBookIcon, StyledCampaignIcon,
    StyledChevronRightIcon, StyledExamIcon, StyledPeopleIcon,
    SubItem, TitleH3
} from "./Sidebar.styles";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCourses} from "../../api/services/Course";
import {SET_COURSE_LIST, SET_SIDE_BAR_REF} from "../../store/actions";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import {useMediaQuery} from "@mui/material";

function Sidebar(props) {
    const {courseList} = useSelector((state)=> state.CourseListReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);
    const redirectToDashboard = () => {
        navigate("/courses");
    };
    useEffect(() => {
        dispatch({type:SET_SIDE_BAR_REF, payload: {sidebarRef} })
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
    const handleCloseSidebar = () => {
        sidebarRef.current.dataset.open = 'false'
    }
    const isLargeScreen = useMediaQuery("(max-width:1024px)");
    const refs = useRef([]);

    return (
        <Container data-open='true' ref={sidebarRef}>
            <LogoContainer>
                <Logo src="/logo.png" alt='logo icon' onClick={redirectToDashboard}/>
                <TitleH3>Exam portal</TitleH3>
                {isLargeScreen ? <CloseIcon onClick={handleCloseSidebar}/> : null}
            </LogoContainer>
            {
                courseList.map(({class_name,section,classroom_id},i)=> (
                    <Sidebar.Item key={i} ref={refs.current[i]} title={class_name} section={section} classroomId={classroom_id}/>
                ))
            }
        </Container>
    );
}

const ItemComp = ({title,section,classroomId}) => {
    const [opened,setOpen] = useState(false);
    const {user} = useSelector((state) => state.UserReducerV2);
    const divRef = useRef(null);
    const handleChange = (e)=>{
        setOpen(!opened);
        if (divRef.current.dataset.selected === 'false')
            divRef.current.dataset.selected = 'true'
        else
            divRef.current.dataset.selected = 'false'

    }
    return (
        <Item onClick={handleChange}>
            <StyledBookIcon ref={divRef} data-selected='false'/>
            <CourseCode>{title}</CourseCode>
            <CourseSection>section {section}</CourseSection>
            <StyledChevronRightIcon opened={opened}/>
            <div>
                <Sidebar.SubSubItem opened={opened} title='announcements' path={`/courses/${classroomId}`}/>
                <Sidebar.SubSubItem opened={opened} title='exams' path={`/courses/${classroomId}/${parseInt(user?.role_id) === 3 ? 'exams' : 'exams-student'}`}/>
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
    const divRef = useRef(null);
    const handleClick = () => {
        navigate(path)
    }
    return (
        <SubItem ref={divRef} opened={opened} onClick={handleClick}>
            {title.includes('exams') ? <StyledExamIcon /> : null}
            {title.includes('people') ? <StyledPeopleIcon /> : null}
            {title.includes('announcements') ? <StyledCampaignIcon /> : null}
            <span>{title}</span>
        </SubItem>
    )
}

Sidebar.SubSubItem = SubSubItem;
export default Sidebar;