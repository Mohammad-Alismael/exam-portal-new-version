import axios from "axios";
import {toast} from "react-toastify";
import {axiosPrivate, token} from "../axios";
import User from './User';
import {isExpired} from "react-jwt";
import jwt from "jwt-decode";
import {CREATE_CLASSROOM, ENROLL_CLASSROOM, FETCH_CLASSROOMS, FETCH_COURSE_INFO} from "./RouteNames";

async function createCourse(course_name,section ,user_id){
    console.log({course_name,section ,user_id})
    return axiosPrivate.post(CREATE_CLASSROOM,{
        class_name: course_name,
        section,
        instructor_id: user_id,
    }).then((res)=> {
        return res.data
    }).catch((error)=>{
        console.log(error)
        if (error.response.status == 403){
            toast('user timed out!')
        }
    })
}

async function enrollToCourse(course_id) {
    return axiosPrivate.post(ENROLL_CLASSROOM,{
        classroom_id : course_id
    }).then((res)=> {
        return res.data
    }).catch((error)=>{
        console.log(error)
        if (error.response.status == 403){
            toast('user timed out!')
        }
    })

}
async function fetchCourseInfo(courseId,controller) {
    try {
        const response = await axiosPrivate.get(`${FETCH_COURSE_INFO}/${courseId}`,{ signal: controller.signal })
        console.log('from fetchCourseInfo', response.data)
        return await response.data
    }catch (e) {
        console.log(e)
        alert("error happened while fetching course info")
    }

}
async function getCourses(controller){
    try {
        const response = await axiosPrivate.get(FETCH_CLASSROOMS,{
            signal: controller.signal
        })
        return response['data']

    }catch (e) {
        console.log(e)
    }
}
export {createCourse,enrollToCourse,fetchCourseInfo,getCourses};