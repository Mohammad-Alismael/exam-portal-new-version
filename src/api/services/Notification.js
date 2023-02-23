import {axiosPrivate, token} from "../axios";
import {CREATE_QUESTION, FETCH_NOTIFICATIONS, UPDATE_ALL_NOTIFICATIONS, UPDATE_SINGLE_NOTIFICATION} from "./RouteNames";

const fetchNotifications = async (controller) => {
    try {
        const res = await axiosPrivate.get(`${FETCH_NOTIFICATIONS}`, {signal: controller.signal})
        return res['data'];
    }catch (e) {
        console.log(e)
        throw {message: e.message}
    }
}

const updateAllNotifications = async () => {
    try {
        const res = await axiosPrivate.post(`${UPDATE_ALL_NOTIFICATIONS}`)
        return res;
    } catch (e) {
        console.log(e)
        throw {message: e.message}
    }
}

const updateSingleNotification = async (NotificationId) =>{
    try {
        const res = await axiosPrivate.put(`${UPDATE_SINGLE_NOTIFICATION}/${NotificationId}`)
        return res;
    }catch (e) {
        console.log(e)
    }
}
export {fetchNotifications,updateAllNotifications,updateSingleNotification};