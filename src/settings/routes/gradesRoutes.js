import ProtectedRoute from "./ProtectedRoute"
import { user_roles } from "../constants/roles";
import { lazy } from "react"

// import GradesPage from "../../pages/grades/GradesPage"
// import UnitsPage from "../../pages/grades/UnitsPage"
// import CoursePage from "../../pages/courses/CoursePage"
// import LecturePage from "../../pages/lectures/LecturePage"

const GradesPage = lazy(() => import("../../pages/grades/GradesPage"))
const CoursePage = lazy(() => import("../../pages/courses/CoursePage"))
const UnitsPage = lazy(() => import("../../pages/grades/UnitsPage"))
const LecturePage = lazy(() => import("../../pages/lectures/LecturePage"))


const gradesRoutes = [
    {
        path: '/grades', element: <GradesPage />
    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />
    }, {
        path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
            <LecturePage />
        </ProtectedRoute>
    }
]

export default gradesRoutes