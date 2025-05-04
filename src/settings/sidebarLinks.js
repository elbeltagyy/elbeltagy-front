import { FaHome } from "react-icons/fa";
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

export const sidebarLinks = [
    {
        name: "تسجيل الدخول", icon: <LoginIcon size="22px" />, to: "/login", allowedTo: [user_roles.NOT_USER]
    }, {
        name: "انشاء حساب", icon: <SignupIcon size="22px" />, to: "/signup", allowedTo: [user_roles.NOT_USER]
    }, {
        name: "سياسات الموقع", icon: <FcPrivacy size="22px" />, to: "/privacy"
    }, {
        name: "الكورسات", icon: <LiaSchoolSolid size="22px" />, to: "/grades", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "محاضراتى", icon: <FaSchool size="22px" />, to: "/grades/" + store?.getState()?.global?.user?.grade, allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "بنك الاسئله", icon: <CiBank size="22px" />, to: "/grades/qs" , allowedTo: [user_roles.STUDENT, user_roles.ONLINE], isDisabled: true, info: { title: 'تحت الانشاء', i: 2 }
    }, {
        name: "اداره الحساب", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "حسابى", icon: <SignupIcon size="22px" />, to: "/user/profile", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "شحن كود", icon: <CiBarcode size="22px" />, to: "/user/recharge_code", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
    }, {
        name: "إدارة الطلاب", icon: <FaUsersCog size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "تسجيلات الدخول", icon: <IoLogInSharp size="22px" />, to: "/management/sessions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الطلاب", icon: <FaUsers size="22px" />, to: "/management/users", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "البحث عن طالب", icon: <RiUserSettingsFill size="22px" />, to: "/management/users/view", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة المحتوى", icon: <SiGooglecampaignmanager360 size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة الكورسات", icon: <FaSchool size="22px" />, to: "/management/courses", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة الاسئله", icon: <FaSchool size="22px" />, to: "/management/questions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاشتراكات", icon: <MdOutlineSubscriptions size="22px" />, to: '/statistics/courses', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض المشاهدات", icon: <MdWatchLater size="22px" />, to: '/statistics/views', allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاكواد", icon: <GiSecretBook size="22px" />, to: "/management/codes", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الكوبونات", icon: <MdOutlineCurrencyPound size="22px" />, to: "/management/coupons", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "انشاء كود", icon: <SiHashicorp size="22px" />, to: "/management/codes/create", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة المجموعات", icon: <MdGroups size="22px" />, to: "/management/groups", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة سياسات الموقع", icon: <RiEditCircleFill size="22px" />, to: "/management/privacy", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "تقارير الطلاب", icon: <TbReportSearch size="22px" />, to: "/management/reports", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "الدفع", icon: <SignupIcon size="22px" />, to: "/management/payments", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], isDisabled: true, info: { title: 'تحت الانشاء', i: 2 }
    },
]
// {
//     name: "احصائيات الموقع", icon: <SignupIcon size="22px" />, to: "/not_found", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], disabled: true
// }, {
//     name: "جوجل تاجس و فيس بوك", icon: <SignupIcon size="22px" />, to: "/not_found", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN], disabled: true
// },
// {
//     name: "مدفوعاتى", icon: <SignupIcon size="22px" />, to: "/user/payments", allowedTo: [user_roles.STUDENT, user_roles.ONLINE]
// },