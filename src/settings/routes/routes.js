import TestPage from "../../pages/test/TestPage";
import Layout from "../../pages/Layout";
import { lazy } from 'react'
import LoginPage from "../../pages/user/LoginPage";
import SignupPage from "../../pages/user/SignupPage";
import { userRoutes } from "./userRoutes";
import { manageUserRoutes } from "./manageUserRoutes";
import { manageSessionRoutes } from "./manageSessionRoutes";
import gradesRoutes from "./gradesRoutes";
import { manageCoursesRoutes } from "./manageCoursesRoutes";
import { codesRoutes } from "./codesRoutes";
import { statisticsRoutes } from "./statisticsRoutes";

const ErrorPage = lazy(() => import("../../pages/errors/ErrorPage"))
const NotFoundPage = lazy(() => import("../../pages/errors/NotFoundPage"))
const HomePage = lazy(() => import("../../pages/HomePage"))

const ExamStartPage = lazy(() => import("../../pages/user/ExamStartPage"))
const AttemptPage = lazy(() => import("../../pages/user/AttemptPage"))
const LectureCenterPage = lazy(() => import("../../pages/user/LectureCenterPage"))

export const routes = [
    {
        path: "/", element: <Layout />, errorElement: <ErrorPage />,
        children: [
            {
                index: true, element: <HomePage />
            },
            {
                path: '/user', children: userRoutes
            }, {
                path: '/grades', children: gradesRoutes
            }, {
                path: '/lectures/:lectureId', element: <LectureCenterPage />
            }, {
                path: '/exams/:examId', element: <ExamStartPage />
            }, {
                path: '/attempts/:attemptId', element: <AttemptPage />
            }, {
                path: '/statistics', children: statisticsRoutes
            }, {
                path: '/management/codes', children: codesRoutes,
            }, {
                path: '/management/users', children: manageUserRoutes
            }, {
                path: '/management/sessions', children: manageSessionRoutes
            }, {
                path: '/management/courses', children: manageCoursesRoutes
            }, {
                path: '/login', element: <LoginPage />
            }, {
                path: '/signup', element: <SignupPage />
            }, {
                path: '/test', element: <TestPage />
            }, {
                path: '/assets/*', element: <NotFoundPage />
            }, {
                path: '*', element: <NotFoundPage />
            }
        ]
    },
]