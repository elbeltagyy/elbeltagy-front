
import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

// import ManageCoursesPage from "../../pages/management/ManageCoursesPage";
const ManageCoursesPage = lazy(() => import("../../pages/management/ManageCoursesPage"))

export const manageCoursesRoutes = [
    {
        path: '/management/courses', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ManageCoursesPage />
        </ProtectedRoute>
    }
]  