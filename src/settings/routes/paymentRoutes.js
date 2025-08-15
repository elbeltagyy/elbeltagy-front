import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"

const PaymentsPage = lazy(() => import("../../pages/admin/PaymentsPage"))

export const paymentsRoutes = [
    {
        path: '/management/payments', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <PaymentsPage />
        </ProtectedRoute>
    }
]
