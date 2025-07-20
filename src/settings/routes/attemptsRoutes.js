import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { user_roles } from "../constants/roles";
import AttemptPage from "../../pages/user/AttemptPage";


const AttemptsPage = lazy(() => import("../../pages/admin/AttemptsPage"))

export const attemptsRoutes = [
    {
        path: '/management/attempts', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <AttemptsPage />
        </ProtectedRoute>
    },
    {
        path: '/attempts/:attemptId', element: <ProtectedRoute>
            <AttemptPage />
        </ProtectedRoute>
    }
]