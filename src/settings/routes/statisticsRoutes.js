import { lazy } from "react";
const GetAttemptsPage = lazy(() => import("../../pages/admin/GetAttemptsPage"))
const GetSubscriptions = lazy(() => import("../../pages/admin/GetSubscriptions"))

export const statisticsRoutes = [
    { path: '/statistics/courses', element: <>hello kitty</> },
    { path: '/statistics/courses/:courseId', element: <GetSubscriptions /> },
    { path: '/statistics/exams/:lectureId', element: <GetAttemptsPage /> },
]