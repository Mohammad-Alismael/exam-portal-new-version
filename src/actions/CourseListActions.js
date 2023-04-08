import {SET_COURSE_LIST, SET_COURSE_LIST_OBJECT} from "../store/actions";

export function setNewCourseListObject(courseListObject) {
    return {
        type: SET_COURSE_LIST_OBJECT,
        payload: {courseListObject},
    }
}