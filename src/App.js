import Login from "./pages/Login";
import Signup from "./pages/Signup";

import {
    BrowserRouter as Router,
    Link,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Course from "./pages/course/Course";
import Quiz from "./components/Quiz";
import Logout from "./pages/Logout";
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import PreviewExam from "./pages/PreviewExam";
import ExamStudent from "./pages/ExamStudent";
import Invitation from "./pages/Invitation";
import ResultExam from "./pages/ResultExam";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivateEmail from "./pages/ActivateEmail";
import NewClasses from "./pages/NewClasses";
import jwt from "jwt-decode";
import Protected from "./utils/Protected";
import * as Actions from "./store/actions";
import { isExpired } from "react-jwt";
import {axiosPrivate, token, updateToken} from "./api/axios";
import { theme } from "./utils/global/useStyles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CircularProgress } from "@material-ui/core";
import ExamPage from "./pages/ExamPage";
import PeoplePage from "./pages/PeoplePage";
import GradesPage from "./pages/GradesPage";
import ResponsiveAppBar from "./layouts/ResponsiveAppBar";
import Show from "./pages/Show";

function App(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     let isMounted = true;
    //     if (token != null) {
    //         axiosPrivate
    //             .post("/user/refresh")
    //             .then((res) => {
    //                 const newAccessToken = res.data["accessToken"];
    //                 updateToken(newAccessToken);
    //                 isMounted && setLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 if (err.response.status === 406) {
    //                     navigate("/");
    //                     toast("session expired, you must log in again!");
    //                     isMounted && setLoading(false);
    //                 }
    //             });
    //     }
    //     isMounted && setLoading(false);
    //     // alert("from refresh")
    //     return () => isMounted = false
    //
    // }, []);
    // if (loading) {
    //     return <CircularProgress size={200}/>;
    // }
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <ResponsiveAppBar />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:reset_token"
                    element={<ResetPassword />}
                />
                <Route path="/activation/:email_token" element={<ActivateEmail />} />
                <Route
                    path="/courses"
                    element={
                        <Protected>
                            <NewClasses />
                        </Protected>
                    }
                />
                <Route path="/courses/:course_id">
                    <Route
                        index={true}
                        element={
                            <Protected>
                                <Course />
                            </Protected>
                        }
                    />
                    <Route
                        path="exams"
                        element={
                            <Protected>
                                <ExamPage />
                            </Protected>
                        }
                    />
                    <Route
                        path="people"
                        element={
                            <Protected>
                                <PeoplePage />
                            </Protected>
                        }
                    />
                    <Route
                        path="grades"
                        element={
                            <Protected>
                                <GradesPage />
                            </Protected>
                        }
                    />
                </Route>
                {/*<Route path="/preview/:examId" element={<PreviewExam />} />*/}
                {/*<Route exact path="/result/:examId" element={<ResultExam />} />*/}
                {/*<Route exact path="/exam/:examId" element={<ExamStudent />} />*/}
                <Route
                    exact
                    path="/invitation/:invitationHash"
                    element={
                        <Protected>
                            <Invitation />
                        </Protected>
                    }
                />
                {/*<Route exact path="/show" element={<Show />} />*/}
                {/*<Route exact path="/quiz" element={<Quiz />} />*/}
            </Routes>
        </ThemeProvider>
    );
}

export default App;
