import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

// import CreateUser from "../../components/users/CreateUser";
// import GetUsersPage from "../../pages/users/GetUsersPage";
// const CreateUser = lazy(() => import("../../components/users/CreateUser"))
const GetUsersPage = lazy(() => import("../../pages/admin/GetUsersPage"))


export const manageUserRoutes = [
    {
        path: '/management/users', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetUsersPage />
        </ProtectedRoute>
    },
    // {
    //     path: '/management/users/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
    //         <CreateUser />
    //     </ProtectedRoute>
    // },
]  