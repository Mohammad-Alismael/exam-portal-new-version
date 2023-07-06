import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import {
  Container,
  CourseCode,
  CourseSection,
  Item,
  Logo,
  LogoContainer,
  StyledBookIcon,
  StyledBookIconDiv,
  StyledCampaignIcon,
  StyledChevronRightIcon,
  StyledExamIcon,
  StyledPeopleIcon,
  SubItem,
  TitleH3,
} from "./Sidebar.styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../api/services/Course";
import { SET_COURSE_LIST, SET_SIDE_BAR_REF } from "../../store/actions";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
function Sidebar(props) {
  const obj = useSelector((state) => state.CourseListReducer);
  console.log("course list", obj);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const redirectToDashboard = () => {
    navigate("/courses");
  };
  useEffect(() => {
    dispatch({ type: SET_SIDE_BAR_REF, payload: { sidebarRef } });
    let isMounted = true;
    const controller = new AbortController();

    getCourses(controller).then((data) => {
      isMounted &&
        dispatch({ type: SET_COURSE_LIST, payload: { courseList: data } });
      console.log("courses => ", data);
    });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const handleCloseSidebar = () => {
    sidebarRef.current.dataset.open = "false";
  };
  const isLargeScreen = useMediaQuery("(max-width:1024px)");
  const refs = useRef([]);
  const setRestToClose = (specificIndex) => {
    refs.current
      .filter((_, index) => index !== specificIndex)
      .forEach((ref) => {
        ref.dataset.selected = "false";
      });
  };
  const handleChange = (ref, index) => {
    if (ref.dataset.selected === "false") ref.dataset.selected = "true";
    else ref.dataset.selected = "false";
    setRestToClose(index);
  };

  function SidebarItemWithRef(i, class_name, section, classroom_id) {
    const ref = useRef(null);

    useEffect(() => {
      refs.current[i] = ref.current;
    }, []);

    return (
      <Sidebar.Item
        key={i}
        ref={ref}
        handleChange={() => handleChange(refs.current[i], i)}
        title={class_name}
        section={section}
        classroomId={classroom_id}
      />
    );
  }

  return (
    <Container data-open="true" ref={sidebarRef}>
      <LogoContainer>
        <Logo src="/logo.png" alt="logo icon" onClick={redirectToDashboard} />
        <TitleH3>Exam portal</TitleH3>
        {isLargeScreen ? <CloseIcon onClick={handleCloseSidebar} /> : null}
      </LogoContainer>
      {obj?.courseList.length &&
        obj?.courseList.map(({ class_name, section, classroom_id }, i) => {
          return SidebarItemWithRef(i, class_name, section, classroom_id);
        })}
    </Container>
  );
}

const ItemComp = forwardRef(
  ({ title, section, classroomId, handleChange }, ref) => {
    const [opened, setOpen] = useState(
      ref.current.dataset["selected"] === "true"
    );
    const { user } = useSelector((state) => state.UserReducerV2);
    const handleChange_ = (e) => {
      handleChange();
      setOpen(!opened);
    };
    useEffect(() => {
      const handleDatasetChange = (event) => {
        if (event.target.dataset.selected !== undefined) {
          setOpen(ref.current.dataset["selected"] === "true");
        }
      };

      if (ref.current) {
        ref.current.addEventListener("DOMAttrModified", handleDatasetChange);
      }

      return () => {
        if (ref.current) {
          ref.current.removeEventListener(
            "DOMAttrModified",
            handleDatasetChange
          );
        }
      };
    }, [ref]);

    return (
      <Item onClick={handleChange_}>
        <StyledBookIconDiv ref={ref} data-selected="false">
          <StyledBookIcon />
        </StyledBookIconDiv>
        <CourseCode>{title}</CourseCode>
        <CourseSection>section {section}</CourseSection>
        <StyledChevronRightIcon opend={opened} />
        <div>
          <Sidebar.SubSubItem
            opened={opened}
            title="announcements"
            path={`/course-page/${classroomId}`}
          />
          <Sidebar.SubSubItem
            opened={opened}
            title="exams"
            path={`/course-page/${classroomId}/${
              parseInt(user?.role_id) === 3 ? "exams" : "exams-student"
            }`}
          />
          <Sidebar.SubSubItem
            opened={opened}
            title="people"
            path={`/course-page/${classroomId}/people`}
          />
          {/*{user?.role_id === 3 ? <Sidebar.SubSubItem opened={opened} title={'grades'} path={`/courses/${classroomId}/grades`}/> :null}*/}
          {/*{user?.role_id === 3 ? <Sidebar.SubSubItem opened={opened} title={'statistics'} path={`/courses/${classroomId}/statistics`}/>: null}*/}
        </div>
      </Item>
    );
  }
);

Sidebar.Item = ItemComp;
const SubSubItem = ({ opened, title, path }) => {
  const navigate = useNavigate();
  const divRef = useRef(null);
  const handleClick = () => {
    navigate(path);
  };
  return (
    <SubItem ref={divRef} opened={opened} onClick={handleClick}>
      {title.includes("exams") ? <StyledExamIcon /> : null}
      {title.includes("people") ? <StyledPeopleIcon /> : null}
      {title.includes("announcements") ? <StyledCampaignIcon /> : null}
      <span>{title}</span>
    </SubItem>
  );
};

Sidebar.SubSubItem = SubSubItem;
export default memo(Sidebar);
