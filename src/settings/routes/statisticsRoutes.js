import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { user_roles } from "../constants/roles";

const GetSubscriptionsAll = lazy(() => import("../../pages/admin/GetSubscriptionsAll"))
const GetSubscriptionsCourse = lazy(() => import("../../pages/admin/GetSubscriptionsCourse"))
const GetAttemptsPage = lazy(() => import("../../pages/admin/GetAttemptsPage"))

export const statisticsRoutes = [
    {
        path: '/statistics/courses', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscriptionsAll />
        </ProtectedRoute>
    },
    {
        path: '/statistics/courses/:courseId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscriptionsCourse />
        </ProtectedRoute>
    },
    {
        path: '/statistics/exams/:lectureId', element: <GetAttemptsPage />
    },
]