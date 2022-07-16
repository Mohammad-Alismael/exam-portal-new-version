import axios from "axios";
import {toast} from "react-toastify";

class Course {
    static config;
    constructor(token) {
        this.config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
    }
    fetchCourses() {
        return axios.get('http://localhost:8081/classroom/classes',
            this.config).then((res)=> {
            console.log('data from backend',res)
            if (res['data']['result'] == null)  return res['data']
            return res['data']['result']
        }).catch((error)=>{
            console.log(error)
            if (error.response.status == 403){
                toast('user timed out!')
            }
        })
    }
     createCourse(course_name, user_id) {

        return axios.post('http://localhost:8081/classroom/create',{
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

}

export default Course;