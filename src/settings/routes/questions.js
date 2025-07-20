import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { user_roles } from "../constants/roles";
import QuestionsBankPage from "../../pages/user/QuestionsBankPage";

const GetQuestionsPage = lazy(() => import("../../pages/admin/GetQuestionsPage"))


export const questionsRoutes = [
    {
        path: '/questions_bank', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
            <QuestionsBankPage />
        </ProtectedRoute>
    },
    {
        path: '/management/questions', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetQuestionsPage />
        </ProtectedRoute>
    },
]