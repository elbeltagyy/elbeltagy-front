import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";
import GetSubscriptionsAll from "../../pages/admin/GetSubscriptionsAll";
import GetSubscriptionsCourse from "../../pages/admin/GetSubscriptionsCourse";

const GetSubscribedCourses = lazy(() => import("../../pages/subscribtions/GetSubscribedCourses"))

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