import {axiosPrivate, MyError} from "../axios";
import {COMMENT, FETCH_COMMENT, FETCH_COURSE_INFO} from "./RouteNames";
import {toast} from "react-toastify";

const createComment = async (text, announcement_id) => {
    try {
        const response = await axiosPrivate.post(COMMENT, { text, announcement_id });
        console.log('Response from createComment:', response);
        return response;
    } catch (error) {
        console.log(error);
        alert('Error occurred while creating a comment.');
        throw error;
    }
};

const deleteComment = async (announcement_id) => {
    try {
        const response = await axiosPrivate.delete(`${COMMENT}/${announcement_id}`)
        return await response.data
    } catch (e) {
        throw new MyError();
        console.log(e.response)
       // toast.error(e.response.message)
    }
}
const fetchComments = async (announcement_id) => {
    try {
        const response = await axiosPrivate.get(`${FETCH_COMMENT}/${announcement_id}`)
        return await response.data
    } catch (e) {
        console.log(e)
        alert("error happened while creating a comment")
    }
}

export {createComment,fetchComments,deleteComment};