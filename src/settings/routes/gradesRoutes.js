import ProtectedRoute from "./ProtectedRoute"
import { user_roles } from "../constants/roles";
import { lazy } from "react"

const GradesPage = lazy(() => import("../../pages/user/GradesPage"))
const UnitsPage = lazy(() => import("../../pages/user/UnitsPage"))
const CoursePage = lazy(() => import("../../pages/user/CoursePage"))
const LecturePage = lazy(() => import("../../pages/user/LecturePage"))


const gradesRoutes = [
    {
        path: '/grades', element: <GradesPage />
    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />, children: [
            {
                path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
                    <LecturePage />
                </ProtectedRoute>
            }
        ]
    },
]
// {
//     path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />
// }, {
//     path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
//         <LecturePage />
//     </ProtectedRoute>
// }
export default gradesRoutes