import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"

const GetGroupsPage = lazy(() => import("../../pages/admin/GetGroupsPage"))

export const groupsRoutes = [
    {
        path: '/management/groups', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetGroupsPage />
        </ProtectedRoute>
    }
]
