import {axiosPrivate} from "../axios";
import {COMMENT, FETCH_COMMENT, FETCH_COURSE_INFO} from "./RouteNames";

const createComment = async (text,announcement_id) => {
    try {
        const response = await axiosPrivate.post(`${COMMENT}`,
            {
                text,
                announcement_id
            })
        console.log('from created comment', response)
        return await response
    } catch (e) {
        console.log(e)
        alert("error happened while creating a comment")
    }
}
const deleteComment = async (announcement_id) => {
    try {
        const response = await axiosPrivate.delete(`${COMMENT}/${announcement_id}`)
        return await response.data
    } catch (e) {
        console.log(e)
        alert("error happened while creating a comment")
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