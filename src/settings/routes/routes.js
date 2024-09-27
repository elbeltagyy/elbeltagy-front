import TestPage from "../../pages/test/TestPage";
import Layout from "../../pages/Layout";
import { lazy } from 'react'
import LoginPage from "../../pages/user/LoginPage";
import SignupPage from "../../pages/user/SignupPage";
import { userRoutes } from "./userRoutes";
import { manageUserRoutes } from "./manageUserRoutes";
import { manageSessionRoutes } from "./manageSessionRoutes";

const ErrorPage = lazy(() => import("../../pages/errors/ErrorPage"))
const NotFoundPage = lazy(() => import("../../pages/errors/NotFoundPage"))
const HomePage = lazy(() => import("../../pages/HomePage"))

export const routes = [
    {
        path: "/", element: <Layout />, errorElement: <ErrorPage />,
        children: [
            {
                index: true, element: <HomePage />
            },
            {
                path: '/user', children: userRoutes
            }, {
                path: '/management/users', children: manageUserRoutes
            }, {
                path: '/management/sessions', children: manageSessionRoutes
            }, {
                path: '/login', element: <LoginPage />
            }, {
                path: '/signup', element: <SignupPage />
            }, {
                path: '/test', element: <TestPage />
            }, {
                path: '/assets/*', element: <NotFoundPage />
            }, {
                path: '*', element: <NotFoundPage />
            }
        ]
    },
]