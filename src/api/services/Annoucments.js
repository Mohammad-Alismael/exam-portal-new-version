import User from './User';
import {axiosPrivate, token} from "../axios";
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
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.response.data)
        toast.info(e.response?.data?.message)
    }
}
export {uploadFileAnnouncement,createAnnouncement}