import React, {useEffect} from 'react';
import {Container,SubItem} from "./SidebarMobile.styles";
import Sidebar from './Sidebar'
import {useDispatch, useSelector} from "react-redux";
import {getCourses} from "../../api/services/Course";
import {SET_COURSE_LIST} from "../../store/actions";
function SidebarMobile({openTab}) {
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
        <Container openTab={openTab}>
            {
                courseList.map(({class_name,section,classroom_id},index)=> (
                    <Sidebar.Item title={class_name} section={section} classroomId={classroom_id}/>
                ))
            }
        </Container>
    );
}

export default SidebarMobile;