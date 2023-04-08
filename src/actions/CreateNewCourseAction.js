import {
  SET_ANNOUNCEMENTS_COMMENTS,
  SET_BACKGROUND_OBJECT_FILE, SET_LET_STUDENTS_ASK_QUESTIONS,
  SET_NEW_COURSE_NAME,
  SET_NEW_COURSE_OBJECT,
  SET_NEW_COURSE_SECTION,
} from "../store/actions";
import { createCourse } from "../api/services/Course";
import {
  fetchCourseInfoFailure,
  fetchCourseListRequest,
  fetchCourseListSuccess,
  resetCourseReducer,
} from "./CourseAction";
import { toast } from "react-toastify";
import { setNewCourseListObject } from "./CourseListActions";

export function createNewCourseAction(newCourseProperties, userId, onClose) {
  return (dispatch) => {
    dispatch(fetchCourseListRequest());
    createCourse(newCourseProperties, userId)
      .then((res) => {
        const newClassroom = res.newClassroom;
        dispatch(setNewCourseListObject(newClassroom));
        toast(res.message);
        dispatch(fetchCourseListSuccess());
        onClose();
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchCourseInfoFailure(error.response));
      });
  };
}

export function setNewCourseProperties(data) {
  return (dispatch) => {
    dispatch({
      type: SET_NEW_COURSE_OBJECT,
      payload: { newCourseObject: data },
    });
  };
}

export function setCourseNameAction(courseName) {
  return {
    type: SET_NEW_COURSE_NAME,
    payload: { courseName },
  };
}

export function setCourseSectionAction(section) {
  return { type: SET_NEW_COURSE_SECTION, payload: { section } };
}

export function setLetStudentsAskQuestionsAction(letStudentsAskQuestions) {
    return { type: SET_LET_STUDENTS_ASK_QUESTIONS, payload: { letStudentsAskQuestions } }
}

export function setLetStudentCommentAction(announcementsComments) {
  return { type: SET_ANNOUNCEMENTS_COMMENTS, payload: { announcementsComments } }
}

export function setFileObjectAction(backgroundFileObject) {
  return {
    type: SET_BACKGROUND_OBJECT_FILE,
    payload: { backgroundFileObject },
  };
}
