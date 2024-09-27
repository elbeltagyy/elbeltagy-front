import { FaHome } from "react-icons/fa";
import { LoginIcon, SignupIcon } from "../components/header/Icons";
import { user_roles } from "./constants/roles";
import { store } from "../toolkit/store";

export const sidebarLinks = [
    {
        name: "تسجيل الدخول", icon: <LoginIcon size="22px" />, to: "/login",
    },
    {
        name: "انشاء حساب", icon: <SignupIcon size="22px" />, to: "/signup",
    }, {
        name: "الكورسات", icon: <SignupIcon size="22px" />, to: "/grades", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "محاضراتى", icon: <SignupIcon size="22px" />, to: "/grades/" + store?.getState()?.global?.user?.grade, allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "اداره الحساب", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "حسابى", icon: <SignupIcon size="22px" />, to: "/user/profile", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "شحن كود", icon: <SignupIcon size="22px" />, to: "/user/recharge_code", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "مدفوعاتى", icon: <SignupIcon size="22px" />, to: "/user/payments", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "إدارة الطلاب", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "تسجيلات الدخول", icon: <SignupIcon size="22px" />, to: "/management/sessions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    },{
        name: "عرض الطلاب", icon: <SignupIcon size="22px" />, to: "/management/users", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة المحتوى", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الكورسات", icon: <SignupIcon size="22px" />, to: "/management/courses", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة المدفوعات", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاشتراكات", icon: <SignupIcon size="22px" />, to: "/management/subscriptions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاكواد", icon: <SignupIcon size="22px" />, to: "/management/codes", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "انشاء كود", icon: <SignupIcon size="22px" />, to: "/management/codes/create", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "وسايل الدفع", icon: <SignupIcon size="22px" />, to: "/management/payments", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "احصائيات الموقع", icon: <SignupIcon size="22px" />, to: "/not_found", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], disabled: true
    }, {
        name: "جوجل تاجس و فيس بوك", icon: <SignupIcon size="22px" />, to: "/not_found", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], disabled: true
    },
]