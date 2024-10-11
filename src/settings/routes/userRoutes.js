import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

// import RechargeCodePage from "../../pages/codes/RechargeCodePage";
// import UserPayments from "../../pages/users/UserPayments";
// import UserProfilePage from '../../pages/users/UserProfilePage'
// const UserPayments = lazy(() => import("../../pages/users/UserPayments"))
const UserProfilePage = lazy(() => import('../../pages/user/UserProfilePage'))
const RechargeCodePage = lazy(() => import("../../pages/user/RechargeCodePage"))


export const userRoutes = [
    {
        path: '/user/profile', element: <ProtectedRoute>
            <UserProfilePage />
        </ProtectedRoute>
    },
    {
        path: '/user/recharge_code', element: <RechargeCodePage />
    },
    // {
    //     path: '/user/payments', element: <>profile is here</>
    // },
    // {
    //     path: '/user/statistics', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
    //         statistics
    //     </ProtectedRoute>
    // }, {
    //     path: '/user/recharge_code', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
    //         <RechargeCodePage />
    //     </ProtectedRoute>
    // }, {
    //     path: '/user/payments', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
    //         <UserPayments />
    //     </ProtectedRoute>
    // }
]
