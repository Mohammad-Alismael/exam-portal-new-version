import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import React, {lazy, Suspense, useEffect, useState} from "react";
import { refreshTokenWithCallBack } from "./api/services/User";
import LoadingSpinner from "./components/LoadingSpinner";
import { token } from "./api/axios";
import { nestedRoutes, routes } from "./utils/routes";
import CoursePageLayout from "./Layout/CoursePageLayout";
import { STUDENT_ROLES } from "./utils/global/GlobalConstants";
import Protected from "./utils/Protected";
const ExamStudent = lazy(() => import("./pages/examStudent/ExamStudent"));

function App(props) {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.UserReducerV2);
  const [location, setLocation] = useState(window.location.href);

  useEffect(() => {
    let isMounted = true;
    const refreshToken = async () => {
      try {
        console.log("This should run first!");
        console.log({ token, user });
        if (
          token === null &&
          user !== null &&
          window.location.pathname != "logout"
        ) {
          await refreshTokenWithCallBack(() => {
            isMounted && setLoading(false);
          });
        }
        isMounted && setLoading(false);
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle the error and update the UI accordingly
      }
    };
    refreshToken().then(console.log);
    return () => {
      isMounted = false;
    };
  }, [user, location]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes &&
            routes.map((route, index) => {
              const { component, path } = route;
              return <Route key={index} path={path} element={component} />;
            })}
          <Route path="/course-page" element={<CoursePageLayout />}>
            <Route
              path=":course_id"
              element={nestedRoutes[0].coursePage.element}
            ></Route>
          </Route>
          <Route path="/course-page/:course_id" element={<CoursePageLayout />}>
            {nestedRoutes &&
              nestedRoutes[0].children.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
          </Route>
          <Route
            path="/course-page/:course_id/exam/:examId"
            element={
              <Protected onlyAccessTo={STUDENT_ROLES}>
                <ExamStudent />
              </Protected>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
