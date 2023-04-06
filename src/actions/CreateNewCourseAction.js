import {
  SET_ANNOUNCEMENTS_COMMENTS,
  SET_BACKGROUND_OBJECT_FILE, SET_COURSE_LIST,
  SET_LET_STUDENTS_ASK_QUESTIONS,
  SET_NEW_COURSE_NAME, SET_NEW_COURSE_OBJECT,
  SET_NEW_COURSE_SECTION,
} from "../store/actions";
import {createCourse} from "../api/services/Course";

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
export function setFileObjectAction(backgroundFileObject) {
  return {
    type: SET_BACKGROUND_OBJECT_FILE,
    payload: {backgroundFileObject}
  }
}
