import axios from "axios";
import {toast} from "react-toastify";
import {axiosPrivate, token} from "../axios";
import User from './User';
import {isExpired} from "react-jwt";
import jwt from "jwt-decode";
import {FETCH_COURSE_INFO} from "./RouteNames";

class Course {

    fetchCourses() {
        User.checkTokenExpiration()
        return axiosPrivate.get('/classroom/classes').then((res)=> {
            console.log('data from backend',res)
            return res['data']['result']
        }).catch((error)=>{
            console.log(error.response.data)
            if (error.response.status == 403){
                toast("user error!")
                // window.location.href = "/refresh"
            }
        })
    }
     createCourse(course_name,section ,user_id) {
         User.checkTokenExpiration()
        return axiosPrivate.post('/classroom/create',{
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
    enrollToCourse(course_id) {
        User.checkTokenExpiration()
        return axiosPrivate.post('/classroom/enroll',{
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
}
async function fetchCourseInfo(courseId) {
    User.checkTokenExpiration()
    try {
        const response = await axiosPrivate.get(`${FETCH_COURSE_INFO}/${courseId}`)
        return response.data
    }catch (e) {
        console.log(e)
        alert("error happened while fetching course info")
    }

}
export {Course,fetchCourseInfo};