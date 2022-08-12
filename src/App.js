import {
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
import {axiosPrivate, token, updateToken} from "./api/axios";
import { theme } from "./utils/global/useStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CircularProgress } from "@material-ui/core";
import ExamPage from "./pages/course/exam/ExamPage";
import PeoplePage from "./pages/course/people/PeoplePage";
import GradesPage from "./pages/GradesPage";
import ResponsiveAppBar from "./layouts/ResponsiveAppBar";
import User from "./api/services/User";
import CreateExamPage from "./pages/createExamPage/CreateExamPage";
import {ALL_ROLES, INSTRUCTOR_ROLE} from "./utils/global/GlobalConstants";

function App(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.UserReducerV2).user;

    // using async useEffect can cause memory leak but i'm using 'isMounted'
    // to prevent that
    useEffect(   async () => {
        let isMounted = true;
        // this part to get new token while the user refreshes any page
        if (token == null && user != null) {
            await User.refreshTokenWithCallBack(() => {
                isMounted && setLoading(false);
            })
        }
        isMounted && setLoading(false);
        return () => isMounted = false

    }, []);

    if (loading) {
        return <CircularProgress size={200}/>;
    }
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
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
                        <Protected onlyAccessTo={ALL_ROLES}>
                            <NewClasses />
                        </Protected>
                    }
                />
                <Route path="/courses/:course_id">
                    <Route
                        index={true}
                        element={
                            <Protected onlyAccessTo={ALL_ROLES}>
                                <Course />
                            </Protected>
                        }
                    />
                    <Route
                        path="exams"
                        element={
                            <Protected onlyAccessTo={ALL_ROLES}>
                                <ExamPage />
                            </Protected>
                        }
                    />
                    <Route
                        path="people"
                        element={
                            <Protected onlyAccessTo={ALL_ROLES}>
                                <PeoplePage />
                            </Protected>
                        }
                    />
                    <Route
                        path="grades"
                        element={
                            <Protected onlyAccessTo={ALL_ROLES}>
                                <GradesPage />
                            </Protected>
                        }
                    />
                </Route>
                <Route path="/create-exam" element={
                    // <Protected onlyAccessTo={ALL_ROLES}>
                        <CreateExamPage />
                    // </Protected>
                }/>
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
