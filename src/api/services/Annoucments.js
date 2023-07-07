import { axiosPrivate } from "../axios";
import { FETCH_5_MORE_POSTS } from "./RouteNames";
const {
  UPLOAD_ANNOUNCEMENT_FILE,
  CREATE_ANNOUNCEMENT,
} = require("./RouteNames");
const { toast } = require("react-toastify");

async function uploadFileAnnouncement(formData) {
  try {
    const response = await axiosPrivate.post(
      UPLOAD_ANNOUNCEMENT_FILE,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e.response.data);
    toast.info(e.response?.data?.message);
  }
}
async function deleteAnnouncementFile(id, file_name) {
  try {
    const response = await axiosPrivate.delete(`${CREATE_ANNOUNCEMENT}/${id}`, {
      data: {
        file_name,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error({ message: e.response.data, status: e.response.status });
  }
}
async function createAnnouncement(announcementText, courseId) {
  try {
    const response = await axiosPrivate.post(CREATE_ANNOUNCEMENT, {
      announcement_text: announcementText,
      courseId,
    });
    return response.data;
  } catch (e) {
    throw new Error({ message: e.response.data, status: e.response.status });
  }
}

async function deleteAnnouncement(id, courseId) {
  try {
    const response = await axiosPrivate.delete(`${CREATE_ANNOUNCEMENT}/${id}`, {
      data: {
        courseId,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error({ message: e.response.data, status: e.response.status });
  }
}

async function updateAnnouncement(id, announcementText, courseId) {
  try {
    const response = await axiosPrivate.put(`${CREATE_ANNOUNCEMENT}/${id}`, {
      courseId,
      announcement_text: announcementText,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error({ message: e.response.data, status: e.response.status });
  }
}
async function fetch5More(id) {
  try {
    const response = await axiosPrivate.get(`${FETCH_5_MORE_POSTS}/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error({ message: e.response.data, status: e.response.status });
  }
}
export {
  uploadFileAnnouncement,
  deleteAnnouncementFile,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  fetch5More,
};
