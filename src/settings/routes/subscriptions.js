import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

// import GetSubscribedCourses from "../../pages/subscribtions/GetSubscribedCourses";

const GetSubscribedCourses = lazy(() => import("../../pages/subscribtions/GetSubscribedCourses"))

export const subscriptions = [
    {
        path: '/management/subscriptions', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscribedCourses />
        </ProtectedRoute>
    }
]  