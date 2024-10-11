import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"

// import CreateCodePage from "../../pages/codes/CreateCodePage";
// import GetCodesPage from "../../pages/codes/GetCodesPage";
const GetCodesPage = lazy(() => import("../../pages/admin/GetCodesPage"))
const CreateCodePage = lazy(() => import("../../pages/admin/CreateCodePage"))


export const codesRoutes = [
    {
        path: '/management/codes', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetCodesPage />
        </ProtectedRoute>
    },
    {
        path: '/management/codes/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <CreateCodePage />
        </ProtectedRoute>
    }
]
