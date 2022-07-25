import axios from "axios";
import {toast} from "react-toastify";
import {axiosPrivate} from "../axios";
import User from './User';
import {isExpired} from "react-jwt";
import jwt from "jwt-decode";

class Course {
    constructor() {
        this.config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('key'),
                'Content-Type': 'application/json'
            }
        }
    }
    fetchCourses() {
        return axiosPrivate.get('/classroom/classes').then((res)=> {
            console.log('data from backend',res)
            return res['data']['result']
        }).catch((error)=>{
            console.log(error.response.data)
            if (error.response.status == 403){
                // window.location.href = "/refresh"
            }
        })
    }
     createCourse(course_name, user_id) {

        return axiosPrivate.post('/classroom/create',{
            class_name: course_name,
            instructor_id: user_id,
        },this.config).then((res)=> {
            return res.data
        }).catch((error)=>{
            console.log(error)
            if (error.response.status == 403){
                toast('user timed out!')
            }
        })
    }
    enrollToCourse(course_id) {
        return axiosPrivate.post('/classroom/enroll',{
            classroom_id : course_id
        },this.config).then((res)=> {
            return res.data
        }).catch((error)=>{
            console.log(error)
            if (error.response.status == 403){
                toast('user timed out!')
            }
        })

    }
}

export default Course;