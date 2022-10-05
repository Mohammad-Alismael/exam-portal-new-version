import User from './User';
import {axiosPrivate, MyError, token} from "../axios";
const {UPLOAD_ANNOUNCEMENT_FILE, CREATE_ANNOUNCEMENT} = require("./RouteNames");
const {toast} = require("react-toastify");

async function uploadFileAnnouncement(formData) {
    try {
        const response = await axiosPrivate
            .post(UPLOAD_ANNOUNCEMENT_FILE, formData)
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.response.data)
        toast.info(e.response?.data?.message)
    }
}
async function createAnnouncement(announcementText,courseId) {
    try {
        const response = await axiosPrivate
            .post(CREATE_ANNOUNCEMENT, {
                announcement_text: announcementText,
                courseId
            })
        return response.data
    } catch (e) {
        throw new MyError({message: e.response.data, status : e.response.status});
    }
}

async function deleteAnnouncement(id, courseId) {
    try {
        const response = await axiosPrivate
            .delete(`${CREATE_ANNOUNCEMENT}/${id}`,{data: {
                    courseId
                }})
        return response.data
    } catch (e) {
        throw new MyError({message: e.response.data, status: e.response.status});
    }
}
export {uploadFileAnnouncement,createAnnouncement,deleteAnnouncement}