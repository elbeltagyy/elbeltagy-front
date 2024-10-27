import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"

const GetCouponsPage = lazy(() => import("../../pages/admin/GetCouponsPage"))
// const CreateCodePage = lazy(() => import("../../pages/admin/CreateCodePage"))


export const couponsRoutes = [
    {
        path: '/management/coupons', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetCouponsPage />
        </ProtectedRoute>
    },
    // {
    //     path: '/management/codes/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
    //         <CreateCodePage />
    //     </ProtectedRoute>
    // }
]
