import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

const ManageCoursesPage = lazy(() => import("../../pages/admin/ManageCoursesPage"))
const ExamCreatePage = lazy(() => import("../../pages/admin/ExamCreatePage"))
const ExamUpdatePage = lazy(() => import("../../pages/admin/ExamUpdatePage"))

export const manageCoursesRoutes = [
    {
        path: '/management/courses', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ManageCoursesPage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ExamCreatePage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ExamUpdatePage />
        </ProtectedRoute>
    },
]  