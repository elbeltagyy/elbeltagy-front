import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

// import ManageCoursesPage from "../../pages/management/ManageCoursesPage";
const GetSessionsPage = lazy(() => import("../../pages/admin/GetSessionsPage.jsx"))

export const manageSessionRoutes = [
    {
        path: '/management/sessions', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSessionsPage />
        </ProtectedRoute>
    }
]  