import axios from "axios";

class Course {
    static fetchCourses(username, password) {
        return axios.post('http://localhost:8081/user/auth',{
            username,
            password
        }).then((res)=> {
            console.log('data from backend',res)
            return res
        }).catch((error)=>{
            // console.log(error)
            throw error
        })
    }
    static createCourse({course_name, user_id}) {
        return axios.post('http://localhost:8081/classroom/create',{
            class_name: course_name,
            instructor_id: user_id,
        }).then((res)=> {
            console.log('data from backend',res)
            return res
        }).catch((error)=>{
            // console.log(error)
            throw error
        })
    }
}

export default User;