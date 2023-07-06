import { routeNames } from "./routeNames";
import React, { lazy } from "react";
import CoursePage from "../pages/course/CoursePage";
import {
  ALL_ROLES,
  INSTRUCTOR_ROLE,
  STUDENT_ROLES,
} from "./global/GlobalConstants";
import CoursePageLayout from "../Layout/CoursePageLayout";
const ExamsPageForStudent = lazy(() =>
  import("../pages/course/examsStudent/ExamsPageForStudent")
);
const StudentExamResult = lazy(() =>
  import("../pages/StudentExamResult/StudentExamResult")
);
const StatisticsPage = lazy(() =>
  import("../pages/course/statistics/StatisticsPage")
);
const Login = lazy(() => import("../pages/Login"));
const Logout = lazy(() => import("../pages/Logout"));
const Signup = lazy(() => import("../pages/Signup"));
const EditExam = lazy(() => import("../pages/EditExam"));
const ExamStudent = lazy(() => import("../pages/examStudent/ExamStudent"));
const Invitation = lazy(() => import("../pages/Invitation"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const ActivateEmail = lazy(() => import("../pages/ActivateEmail"));
const Courses = lazy(() => import("../pages/classes/Courses"));
const Protected = lazy(() => import("../utils/Protected"));
const ExamPage = lazy(() => import("../pages/course/exam/ExamPage"));
const PeoplePage = lazy(() => import("../pages/course/people/PeoplePage"));
const GradesPage = lazy(() => import("../pages/GradesPage"));
const CreateExamPage = lazy(() =>
  import("../pages/createExamPage/CreateExamPage")
);
const NotFound = lazy(() => import("../pages/NotFound"));

export const routes = [
  {
    path: routeNames().login,
    exact: true,
    protectRoute: false,
    component: <Login />,
  },
  {
    path: routeNames().signup,
    exact: true,
    protectRoute: false,
    component: <Signup />,
  },
  {
    path: routeNames().logout,
    exact: true,
    protectRoute: false,
    component: <Logout />,
  },
  {
    path: routeNames().forgetPassword,
    exact: true,
    protectRoute: false,
    component: <ForgotPassword />,
  },
  {
    path: routeNames().resetPassword,
    exact: true,
    protectRoute: false,
    component: <ResetPassword />,
  },
  {
    path: routeNames().activateEmail,
    exact: true,
    protectRoute: false,
    component: <ActivateEmail />,
  },
  {
    path: routeNames().invitationPage,
    exact: true,
    protectRoute: true,
    component: <Invitation />,
  },
  {
    path: routeNames().dashBoard,
    exact: true,
    protectRoute: true,
    component: (
      <Protected onlyAccessTo={ALL_ROLES}>
        <Courses />
      </Protected>
    ),
  },
  {
    path: routeNames().examPage,
    exact: true,
    protectRoute: true,
    component: (
      <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
        <ExamPage />
      </Protected>
    ),
  },
  { path: "*", exact: false, component: <NotFound /> },
];

export const nestedRoutes = [
  {
    path: "/course-page",
    element: (
      <Protected onlyAccessTo={ALL_ROLES}>
        <CoursePageLayout />
      </Protected>
    ),
    coursePage: {
      path: ":course_id",
      element: (
        <Protected onlyAccessTo={ALL_ROLES}>
          <CoursePage />
        </Protected>
      ),
    },
    children: [
      {
        path: "exams",
        element: (
          <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
            <ExamPage />
          </Protected>
        ),
      },
      {
        path: "exams-student",
        element: (
          <Protected onlyAccessTo={STUDENT_ROLES}>
            <ExamsPageForStudent />
          </Protected>
        ),
      },
      {
        path: "people",
        element: (
          <Protected onlyAccessTo={ALL_ROLES}>
            <PeoplePage />
          </Protected>
        ),
      },
      {
        path: "grades/:examId",
        element: (
          <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
            <GradesPage />
          </Protected>
        ),
      },
      {
        path: "grades/:examId/:username",
        element: (
          <Protected onlyAccessTo={ALL_ROLES}>
            <StudentExamResult />
          </Protected>
        ),
      },
      {
        path: "statistics/:examId",
        element: (
          <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
            <StatisticsPage />
          </Protected>
        ),
      },
      {
        path: "grades/:examId/:studentId",
        element: (
          <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
            <GradesPage />
          </Protected>
        ),
      },
      {
        path: "create-exam",
        element: (
          <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
            <CreateExamPage />
          </Protected>
        ),
      },
      {
        path: "edit-exam/:examId",
        element: (
          <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
            <EditExam />
          </Protected>
        ),
      },
    ],
  },
];
