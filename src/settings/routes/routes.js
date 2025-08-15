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
import ProtectedRoute from "./ProtectedRoute";
import { user_roles } from "../constants/roles";
import { couponsRoutes } from "./couponsRoutes";
import ReportsPage from "../../pages/admin/ReportsPage";
import { groupsRoutes } from "./groupsRoutes";
import { questionsRoutes } from "./questions";
import { answerRoutes } from "./answersRoutes";
import { attemptsRoutes } from "./attemptsRoutes";
import { paymentsRoutes } from "./paymentRoutes";
import { invoicesRoutes } from "./invoicesRoutes";
import LecturesPage from "../../pages/admin/LecturesPage";


const ErrorPage = lazy(() => import("../../pages/errors/ErrorPage"))
const NotFoundPage = lazy(() => import("../../pages/errors/NotFoundPage"))
const HomePage = lazy(() => import("../../pages/HomePage"))

const ExamStartPage = lazy(() => import("../../pages/user/ExamStartPage"))
const AttemptPage = lazy(() => import("../../pages/user/AttemptPage"))
const LectureCenterPage = lazy(() => import("../../pages/user/LectureCenterPage"))

const ManagePrivacyPage = lazy(() => import("../../pages/admin/ManagePrivacyPage"))
const PrivacyPage = lazy(() => import("../../pages/user/PrivacyPage"))

const PaymentsPage = lazy(() => import("../../pages/user/PaymentsPage"))
const FeedBacks = lazy(() => import("../../pages/user/FeedBacks"))


export const routes = [
    {
        path: "/", element: <Layout />, errorElement: <ErrorPage />,
        children: [
            {
                index: true, element: <HomePage />
            }, {
                path: '/privacy', element: <PrivacyPage />
            }, {
                path: '/management/privacy', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
                    <ManagePrivacyPage />
                </ProtectedRoute>
            }, {
                path: '/user', children: userRoutes
            }, {
                path: '/grades', children: gradesRoutes
            }, {
                path: '/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
                    <LectureCenterPage />
                </ProtectedRoute>
            }, {
                path: '/exams/:examId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
                    <ExamStartPage />
                </ProtectedRoute>
            }, {
                path: '/', children: attemptsRoutes
            }, {
                path: '/statistics', children: statisticsRoutes
            }, {
                path: '/', children: questionsRoutes
            }, {
                path: '/', children: answerRoutes
            }, {
                path: '/management/codes', children: codesRoutes,
            }, {
                path: '/management/coupons', children: couponsRoutes,
            }, {
                path: '/management/users', children: manageUserRoutes
            }, {
                path: '/management/sessions', children: manageSessionRoutes
            }, {
                path: '/management/courses', children: manageCoursesRoutes
            }, {
                path: '/management/payments', children: paymentsRoutes
            }, {
                path: '/management/invoices', children: invoicesRoutes
            }, {
                path: '/management/feedBacks', element: <FeedBacks isAdmin={true} />
            }, {
                path: '/feedBacks', element: <ProtectedRoute>
                    <FeedBacks />
                </ProtectedRoute>
            }, {
                path: '/payments', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
                    <PaymentsPage />
                </ProtectedRoute>
            }, {
                path: '/management/lectures', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
                    <LecturesPage />
                </ProtectedRoute>
            }, {
                path: '/management/reports', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
                    <ReportsPage />
                </ProtectedRoute>
            }, {
                path: '/management/groups', children: groupsRoutes,
            }, {
                path: '/login', element: <LoginPage />
            }, {
                path: '/signup', element: <SignupPage />
            }, {
                path: '/test', element: <ProtectedRoute>
                    <TestPage />
                </ProtectedRoute>
            }, {
                path: '/assets/*', element: <NotFoundPage />
            }, {
                path: '*', element: <NotFoundPage />
            }
        ]
    },
]