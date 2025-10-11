// import { FaHome } from "react-icons/fa";
import { LoginIcon, SignupIcon } from "../components/header/Icons";
import { user_roles } from "./constants/roles";
import { store } from "../toolkit/store";

import { IoLogInSharp } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { FaSchool } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";
import { CiBarcode } from "react-icons/ci";
import { MdOutlineCurrencyPound, MdOutlineSubscriptions } from "react-icons/md";
import { GiSecretBook } from "react-icons/gi";
import { SiHashicorp } from "react-icons/si";
import { FcPrivacy } from "react-icons/fc";
import { RiEditCircleFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { MdQuestionAnswer } from "react-icons/md";
import { PiQuestionFill } from "react-icons/pi";
import { TbWorldQuestion } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { VscFeedback } from "react-icons/vsc";
import { lazy } from "react";
import UserProfilePage from '../pages/user/UserProfilePage'

const HomePage = lazy(() => import("../pages/HomePage"))

const ExamStartPage = lazy(() => import("../pages/user/ExamStartPage"))

const LectureCenterPage = lazy(() => import("../pages/user/LectureCenterPage"))

const ManagePrivacyPage = lazy(() => import("../pages/admin/ManagePrivacyPage"))
const PrivacyPage = lazy(() => import("../pages/user/PrivacyPage"))

const PaymentsPage = lazy(() => import("../pages/user/PaymentsPage"))
const FeedBacks = lazy(() => import("../pages/user/FeedBacks"))
const RechargeCodePage = lazy(() => import("../pages/user/RechargeCodePage"))
const SignupPage = lazy(() => import("../pages/user/SignupPage"))
const LoginPage = lazy(() => import("../pages/user/LoginPage"))

const GradesPage = lazy(() => import("../pages/user/GradesPage"))

import GetUserAnswers from "../components/exam/GetUserAnswers";

const GetSessionsPage = lazy(() => import("../pages/admin/GetSessionsPage.jsx"))
const GetUsersPage = lazy(() => import("../pages/admin/GetUsersPage"))

const FindUserPage = lazy(() => import("../pages/admin/FindUserPage"))

const ManageCoursesPage = lazy(() => import("../pages/admin/ManageCoursesPage"))
const ExamCreatePage = lazy(() => import("../pages/admin/ExamCreatePage"))
const ExamUpdatePage = lazy(() => import("../pages/admin/ExamUpdatePage"))

const GetSubscriptionsAll = lazy(() => import("../pages/admin/GetSubscriptionsAll"))
const GetSubscriptionsCourse = lazy(() => import("../pages/admin/GetSubscriptionsCourse"))

import QuestionsBankPage from "../pages/user/QuestionsBankPage";
import LecturesPage from "../pages/admin/LecturesPage.jsx";
import GetViewsPage from "../pages/admin/GetViewsPage.jsx";
import GetGroupsPage from "../pages/admin/GetGroupsPage.jsx";
import ReportsPage from "../pages/admin/ReportsPage.jsx";
import InvoicesPage from "../pages/admin/InvoicesPage.jsx";
import GetCouponsPage from "../pages/admin/GetCouponsPage.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import TestPage from "../pages/test/TestPage.js";
import { isDevelop } from "../tools/isDevelop.js";
import ManagePaymentsPage from "../pages/admin/PaymentsPage.jsx";
import CoursesPage from "../pages/user/CoursesPage.jsx";

const GetQuestionsPage = lazy(() => import("../pages/admin/GetQuestionsPage"))

const AttemptPage = lazy(() => import("../pages/user/AttemptPage"))
const AttemptsPage = lazy(() => import("../pages/admin/AttemptsPage"))

const GetCodesPage = lazy(() => import("../pages/admin/GetCodesPage"))
const CreateCodePage = lazy(() => import("../pages/admin/CreateCodePage"))

const UnitsPage = lazy(() => import("../pages/user/UnitsPage"))
const CoursePage = lazy(() => import("../pages/user/CoursePage"))
const LecturePage = lazy(() => import("../pages/user/LecturePage"))

const LectureIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c.35.61.54 1.3.54 2h10v11h-9v2m4-10v2H9v13H7v-6H5v6H3v-8H1.5V9a2 2 0 0 1 2-2zM8 4a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2" /></svg>
}

//Routes - sidebar - permissions
export const sidebarLinks = [
    {
        name: "تسجيل الدخول", icon: <LoginIcon size="22px" />, to: "/login", allowedTo: [user_roles.NOT_USER],
        element: <LoginPage />, skipVerifyRoute: true
    }, {
        name: "انشاء حساب", icon: <SignupIcon size="22px" />, to: "/signup", allowedTo: [user_roles.NOT_USER],
        element: <SignupPage />, skipVerifyRoute: true
    }, {
        name: "سياسات الموقع", icon: <FcPrivacy size="22px" />, to: "/privacy",
        element: <PrivacyPage />
    }, {
        name: "الكورسات", icon: <LiaSchoolSolid size="22px" />,
        to: "/grades", allowedTo: [user_roles.STUDENT, user_roles.ONLINE], element: <GradesPage />
    }, {
        name: "محاضراتى", icon: <FaSchool size="22px" />, to: "/grades/" + store?.getState()?.global?.user?.grade,
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE],
        // element: <UnitsPage /> Down
    }, {
        name: "بنك الاسئله", icon: <CiBank size="22px" />, to: "/questions_bank",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: false, info: { title: 'جديد', i: 2 },
        element: <QuestionsBankPage />
    }, {
        name: "ايجاباتك", icon: <MdQuestionAnswer size="22px" />, to: "/answers",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: false, info: { title: 'جديد', i: 1 },
        element: <GetUserAnswers />
    }, {
        name: "مجتمع الطلاب", icon: <TbWorldQuestion size="22px" />,
        to: "/community5050", allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: true, info: { title: 'قريبا', i: 2 },
    }, {
        name: "اداره الحساب", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "حسابى", icon: <SignupIcon size="22px" />, to: "/user/profile",
        allowedTo: [user_roles.STUDENT, user_roles.ONLINE], anyUser: true, //sidebar => user, routes => all
        element: <UserProfilePage />
    }, {
        name: "شحن كود", icon: <CiBarcode size="22px" />, to: "/user/recharge_code", allowedTo: [user_roles.STUDENT, user_roles.ONLINE],
        element: <RechargeCodePage />
    }, {
        name: "إدارة المستخدمين", icon: <FaUsersCog size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "تسجيلات الدخول", icon: <IoLogInSharp size="22px" />,
        to: "/management/sessions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetSessionsPage />, id: 'sessions'
    }, {
        name: "عرض الطلاب", icon: <FaUsers size="22px" />, to: "/management/users", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetUsersPage />, id: 'users'
    }, {
        name: "البحث عن طالب", icon: <RiUserSettingsFill size="22px" />, to: "/management/users/view", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <FindUserPage />, id: 'findUser'
    }, {
        name: "إدارة المحتوى", icon: <SiGooglecampaignmanager360 size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة الكورسات", icon: <FaSchool size="22px" />, to: "/management/courses", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <ManageCoursesPage />, id: 'coursesManage'
    }, {
        name: "عرض الاشتراكات", icon: <MdOutlineSubscriptions size="22px" />, to: '/statistics/courses', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetSubscriptionsAll />, id: 'subscriptions' //'/management/subscriptions'
    }, {
        name: "إدارة الاسئله", icon: <PiQuestionFill size="22px" />, to: "/management/questions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: 'جديد', i: 1 },
        element: <GetQuestionsPage />, id: 'questions'
    }, {
        name: "الاختبارات", icon: <MdQuestionAnswer size="22px" />, to: "/management/attempts", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: 'جديد', i: 1 },
        element: <AttemptsPage />, id: 'attempts'
    }, {
        name: "المحاضرات", icon: <LectureIcon size="22px" />, to: '/management/lectures', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <LecturesPage />, id: 'lectures'
    }, {
        name: "عرض المشاهدات", icon: <MdWatchLater size="22px" />, to: '/statistics/views', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetViewsPage />, id: 'views'
    }, {
        name: "اخري", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاكواد", icon: <GiSecretBook size="22px" />, to: "/management/codes", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetCodesPage />, id: 'codes'
    }, {
        name: "عرض الكوبونات", icon: <MdOutlineCurrencyPound size="22px" />, to: "/management/coupons", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetCouponsPage />, id: 'coupons'
    }, {
        name: "انشاء كود", icon: <SiHashicorp size="22px" />, to: "/management/codes/create", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <CreateCodePage />, id: 'createCode'
    }, {
        name: "إدارة المجموعات", icon: <MdGroups size="22px" />, to: "/management/groups", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <GetGroupsPage />, id: 'groups'
    }, {
        name: "إدارة سياسات الموقع", icon: <RiEditCircleFill size="22px" />, to: "/management/privacy", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <ManagePrivacyPage />, id: 'managePrivacy'
    }, {
        name: "تقارير الطلاب", icon: <TbReportSearch size="22px" />, to: "/management/reports", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN],
        element: <ReportsPage />, id: 'stdReports'
    }, {
        name: "المدفوعات", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], // info: { title: 'تحت الانشاء', i: 2 }
    }, {
        name: "وسائل الدفع", icon: <RiSecurePaymentFill size="22px" />, to: "/management/payments", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: "جديد", i: 1 },
        element: <ManagePaymentsPage />, id: 'payments'
    }, {
        name: "الفواتير", icon: <PiInvoiceBold size="22px" />, to: "/management/invoices", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: false, info: { title: "جديد", i: 1 },
        element: <InvoicesPage />, id: 'invoices'
    }, {
        name: 'المحفظه و المدفوعات', icon: <PiInvoiceBold size="22px" />, to: "/payments", allowedTo: [user_roles.ONLINE, user_roles.STUDENT],
        element: <PaymentsPage />
    }, {
        name: "اقتراح/شكوي", icon: <VscFeedback size="22px" />, to: "/feedBacks", allowedTo: [user_roles.ONLINE, user_roles.STUDENT], info: { title: "جديد", i: 1 },
        element: <FeedBacks />
    }, {
        name: "اقتراحات/شكاوي", icon: <VscFeedback size="22px" />, to: "/management/feedBacks", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], info: { title: "جديد", i: 1 },
        element: <FeedBacks isAdmin={true} />, id: 'feedBacks'
    },
]

const otherLinks = [
    {
        index: true, element: <HomePage />,

    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {// Edit Path here 
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />, children: [
            {
                path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
                    <LecturePage />
                </ProtectedRoute>
            }
        ]
    }, {
        path: '/courses', element: <CoursesPage />
    }, {
        path: '/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
            <LectureCenterPage />
        </ProtectedRoute>
    }, {
        path: '/exams/:examId', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
            <ExamStartPage />
        </ProtectedRoute>
    }, {
        path: '/attempts/:attemptId', element: <ProtectedRoute>
            <AttemptPage />
        </ProtectedRoute>
    }, {
        path: '/statistics/courses/:courseId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscriptionsCourse />
        </ProtectedRoute>
    }, {
        path: '/statistics/courses/:courseId/views/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetViewsPage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ExamCreatePage />
        </ProtectedRoute>
    }, {
        path: '/management/courses/:courseId/exams/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ExamUpdatePage />
        </ProtectedRoute>
    }, {
        path: '/test', element: <ProtectedRoute>
            {isDevelop && <TestPage />}
        </ProtectedRoute>
    }, {
        path: '/assets/*', element: <NotFoundPage />
    }, {
        path: '*', element: <NotFoundPage />
    }
]

export const routesLinks = [...sidebarLinks.map(link => {
    if (link.Component) {
        link.element = <link.Component />
    }
    if (!link.element) return null

    const element = (link.allowedTo && !link.skipVerifyRoute) ? <ProtectedRoute allowedTo={link.anyUser ? [] : link.allowedTo} >
        {link.element}
    </ProtectedRoute> : link.element
    if (!link.to && !link.index && !link.element) return null

    return { path: link.to, element, index: link.index ?? false }
}), ...otherLinks].filter(Boolean)


//##Unused Components =>
// <GetAttemptsPage />, '/statistics/courses/:courseId/exams/:lectureId'
// <GetCourseCoupons />, '/management/courses/:courseId/coupons'
