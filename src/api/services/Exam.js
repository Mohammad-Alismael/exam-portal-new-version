import {axiosPrivate} from "../axios";
import {CREATE_EXAM} from "./RouteNames";
import {toast} from "react-toastify";
import User from "./User";

async function createExam(examObject) {
   User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(CREATE_EXAM,examObject)
        return await res['data']
    }catch (e) {
        console.log(e.message.status)
    }
}

export {createExam};