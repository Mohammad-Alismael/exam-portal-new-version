import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import React, { Suspense } from "react";
import { ALL_ROLES } from "../utils/global/GlobalConstants";
import CoursePageLayout from "./CoursePageLayout";
import Protected from "../utils/Protected";

export default function Layout({ routes, nestedRoutes }) {
  return (
    <>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes &&
              routes.map((route, index) => {
                const { component, path } = route;
                return <Route key={index} path={path} element={component} />;
              })}
            <Route path="/course-page" element={nestedRoutes[0].element}>
              {nestedRoutes &&
                nestedRoutes[0].children.map((route, index) => {
                  console.log(route);
                  if (route.path.includes(":course_id")) {
                    return <Route key={index} index element={route.element} />;
                  } else {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  }
                })}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
