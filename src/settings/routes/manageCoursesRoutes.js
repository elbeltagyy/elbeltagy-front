
import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";
// import CreateExamPage from "../../pages/admin/CreateExamPage";

// import ManageCoursesPage from "../../pages/management/ManageCoursesPage";
const ManageCoursesPage = lazy(() => import("../../pages/admin/ManageCoursesPage"))
const CreateExamPage = lazy(() => import("../../pages/admin/CreateExamPage"))

export const manageCoursesRoutes = [
    {
        path: '/management/courses', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ManageCoursesPage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <CreateExamPage />
        </ProtectedRoute>
    },
]  