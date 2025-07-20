import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"
import GetUserAnswers from "../../components/exam/GetUserAnswers";


export const answerRoutes = [
    {
        path: '/answers', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
            <GetUserAnswers />
        </ProtectedRoute>
    }
]
