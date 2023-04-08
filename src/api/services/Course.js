import axios from "axios";
import { toast } from "react-toastify";
import { axiosPrivate, token } from "../axios";
import {
  CREATE_CLASSROOM,
  ENROLL_CLASSROOM,
  FETCH_CLASSMATES,
  FETCH_CLASSROOMS,
  FETCH_COURSE_INFO,
  UPDATE_CLASSROOMS,
} from "./RouteNames";
import { dataURLtoFile, toDataURL } from "../../utils/global/GlobalConstants";

async function createCourse(object, user_id) {
  console.log("before creating - >", object);
  const formData = new FormData();
  formData.append("class_name", object.courseName);
  formData.append("section", object.section);
  formData.append("allow_students_to_comment", object.announcementsComments);
  formData.append(
    "allow_students_to_announcements",
    object.letStudentsAskQuestions
  );
  formData.append("instructor_id", user_id);
  const url = object.backgroundFileObject.url;
  console.log("url =>", url);
  const dataUrl = await toDataURL(url);
  const fileData = dataURLtoFile(dataUrl, url.split("/")[4]);
  formData.append("file", fileData);

  return axiosPrivate
    .post(CREATE_CLASSROOM, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.status === 400) {
        toast("error happened while uploading an image!");
      }
      if (error.response.status === 403) {
        toast("user timed out!");
      }
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      }
    });
}

async function enrollToCourse(course_id) {
  return axiosPrivate
    .post(ENROLL_CLASSROOM, {
      classroom_id: course_id,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status == 403) {
        toast("user timed out!");
      }
    });
}
async function fetchCourseInfo(courseId, controller) {
  try {
    const response = await axiosPrivate.get(
      `${FETCH_COURSE_INFO}/${courseId}`,
      { signal: controller.signal }
    );
    console.log("from fetchCourseInfo", response.data);
    return await response.data;
  } catch (e) {
    console.log(e);
    alert("error happened while fetching course info");
    throw { message: "error happened while fetching course info" };
  }
}
async function getCourses(controller) {
  try {
    const response = await axiosPrivate.get(FETCH_CLASSROOMS, {
      signal: controller.signal,
    });
    return response["data"];
  } catch (e) {
    console.log(e);
  }
}
async function updateCourse(object, courseId) {
  console.log("update =>", object);
  const formData = new FormData();
  formData.append("class_name", object.courseName);
  formData.append("section", object.section);
  formData.append("allow_students_to_comment", object.announcementsComments);
  formData.append(
    "allow_students_to_announcements",
    object.letStudentsAskQuestions
  );
  const url = object.backgroundFileObject.url;
  console.log("url =>", url);
  const dataUrl = await toDataURL(url);
  const fileData = dataURLtoFile(dataUrl, url.split("/")[4]);
  formData.append("file", fileData);
  try {
    const response = await axiosPrivate.put(
      `${UPDATE_CLASSROOMS}/${courseId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response["data"];
  } catch (e) {
    console.log(e);
    throw { message: e.message };
  }
}
async function fetchClassmates(courseId, controller) {
  try {
    const response = await axiosPrivate.get(`${FETCH_CLASSMATES}/${courseId}`, {
      signal: controller.signal,
    });
    return response["data"];
  } catch (e) {
    console.log(e);
  }
}
export {
  createCourse,
  enrollToCourse,
  fetchCourseInfo,
  getCourses,
  updateCourse,
  fetchClassmates,
};
