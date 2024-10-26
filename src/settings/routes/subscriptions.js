import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

const GetSubscriptionsAll = lazy(() => import("../../pages/admin/GetSubscriptionsAll"))
const GetSubscriptionsCourse = lazy(() => import("../../pages/admin/GetSubscriptionsCourse"))

export const subscriptions = [
    {
        path: '/management/subscriptions', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscriptionsAll />
        </ProtectedRoute>
    },
    {
        path: '/management/subscriptions/:courseId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscriptionsCourse />
        </ProtectedRoute>,
    }
]  