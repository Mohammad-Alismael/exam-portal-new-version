import { fetchCourseInfo, getCourses } from "../api/services/Course";
import { parse, stringify, toJSON, fromJSON } from "flatted";
import * as Actions from "../store/actions";
import {
  SET_ANNOUNCEMENTS_COMMENTS,
  SET_ASSIGNED_FOR,
  SET_BACKGROUND_OBJECT_FILE,
  SET_COURSE_ANNOUNCEMENTS,
  SET_COURSE_CLASSMATES,
  SET_COURSE_EXAMS,
  SET_COURSE_ID,
  SET_COURSE_INFO,
  SET_COURSE_LIST,
  SET_ENDING_AT,
  SET_EXAM_ANSWER_KEY,
  SET_EXAM_ANSWER_KEY_AT,
  SET_EXAM_RANDOMNESS,
  SET_EXAM_TIMER,
  SET_EXAM_TITLE,
  SET_LET_STUDENTS_ASK_QUESTIONS,
  SET_NAVIGATION,
  SET_NEW_COURSE_NAME,
  SET_NEW_COURSE_SECTION,
  SET_QUESTIONS,
  SET_SPECIFIC_STUDENTS,
  SET_STARTING_AT,
  SET_STUDENTS,
} from "../store/actions";
import {setNewCourseProperties} from "./CreateNewCourseAction";

export const fetchCourseInfoAction = (course_id, controller) => {
  return (dispatch) => {
    dispatch(setCourseId(course_id));
    dispatch(fetchCourseInfoRequest());
    fetchCourseInfo(course_id, controller)
      .then((data) => {
        console.log("course info data => ", data);
        dispatch(CourseAction(data));
        dispatch(setNewCourseProperties(data));
        dispatch(fetchCourseInfoSuccess());
      })
      .catch((error) => {
        dispatch(fetchCourseInfoFailure(error.message));
      });
  };
};
export function CourseAction(data) {
  return (dispatch) => {
    dispatch(setCourseInfo(data["course_info"]));
    dispatch({
      type: SET_COURSE_ANNOUNCEMENTS,
      payload: { announcements: data["announcements"] },
    });
    dispatch(setCourseClassmates(data["classmates"]));
    dispatch({ type: SET_COURSE_EXAMS, payload: { exams: data["exams"] } });
  };
}
export function resetCourseReducer() {
  return (dispatch) => {
    dispatch({
      type: SET_BACKGROUND_OBJECT_FILE,
      payload: { backgroundFileObject: null },
    });
    dispatch({
      type: SET_NEW_COURSE_NAME,
      payload: { courseName: "" },
    });
    dispatch({
      type: SET_NEW_COURSE_SECTION,
      payload: { section: "" },
    });
    dispatch({
      type: SET_LET_STUDENTS_ASK_QUESTIONS,
      payload: { letStudentsAskQuestions: false },
    });
    dispatch({
      type: SET_ANNOUNCEMENTS_COMMENTS,
      payload: { announcementsComments: false },
    });
  };
}

export function getCoursesAction(controller) {
  return (dispatch) => {
    dispatch(fetchCourseListRequest());
    getCourses(controller).then((data) => {
      console.log("courses => ", data);
      dispatch(setCourseList(data));
      dispatch(fetchCourseListSuccess());
    });
  };
}
export function setCourseList(courseList) {
  return {
    type: SET_COURSE_LIST,
    payload: { courseList },
  };
}

export function fetchCourseListRequest() {
    return {
        type: Actions.FETCH_COURSE_LIST_REQUEST
    }
}

export function fetchCourseListSuccess() {
    return{
        type: Actions.FETCH_COURSE_LIST_SUCCESS
    }
}
export const fetchCourseInfoRequest =  () => ({
  type: Actions.FETCH_COURSE_INFO_REQUEST
});

export const fetchCourseInfoSuccess = () => {
  return {
    type: Actions.FETCH_COURSE_INFO_SUCCESS,
  };
};
export const fetchCourseInfoFailure = (error) => {
  return {
    type: Actions.FETCH_COURSE_INFO_FAILURE,
    payload: error,
  };
};
export function setCourseInfo(course_info) {
  return {
    type: Actions.SET_COURSE_INFO,
    payload: { course_info },
  };
}
export function setCourseAnnouncements(data) {
  return {
    type: Actions.SET_COURSE_ANNOUNCEMENTS,
    announcements: data,
  };
}
export function setCourseClassmates(data) {
  return {
    type: Actions.SET_COURSE_CLASSMATES,
    classmates: data,
  };
}

export function setFilteredClassmates(data) {
  return {
    type: Actions.SET_FILTERED_CLASSMATES,
    filteredClassmates: data,
  };
}
export function setCourseExams(data) {
  return {
    type: Actions.SET_COURSE_EXAMS,
    exams: data,
  };
}

export function setCourseId(courseId) {
  return {
    type: SET_COURSE_ID,
    payload: { courseId },
  };
}

