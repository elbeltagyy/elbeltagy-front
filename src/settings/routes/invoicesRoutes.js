import { lazy } from "react";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"

const InvoicesPage = lazy(() => import("../../pages/admin/InvoicesPage"))

export const invoicesRoutes = [
    {
        path: '/management/invoices', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <InvoicesPage />
        </ProtectedRoute>
    }
]
