import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

const GetUsersPage = lazy(() => import("../../pages/admin/GetUsersPage"))
const FindUserPage = lazy(() => import("../../pages/admin/FindUserPage"))


export const manageUserRoutes = [
    {
        path: '/management/users', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetUsersPage />
        </ProtectedRoute>
    },
    {
        path: '/management/users/view', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <FindUserPage />
        </ProtectedRoute>
    },
]  