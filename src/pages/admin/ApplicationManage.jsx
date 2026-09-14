import { Button } from "@mui/material"
import BtnModal from "../../components/ui/BtnModal"
import TabInfo from "../../components/ui/TabInfo"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import UserAvatar from "../../components/users/UserAvatar"

import { lang } from "../../settings/constants/arlang"
import { getFullDate } from "../../settings/constants/dateConstants"
import Section from "../../style/mui/styled/Section"
import { useDeleteApplicationMutation, useLazyGetApplicationsQuery, useUpdateApplicationMutation } from "../../toolkit/apis/applicationsApi"
import FullComponent from "../../tools/datagrid/FullComponent"

import CreateApplication from "../../components/application/CreateApplication"
import Courses from "../../components/all/Courses"
import UpdateApplication from "../../components/application/UpdateApplication"
import { useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"
import GenerateQrCode from "../../components/qrcodes/GenerateQrCode"
import QRCode from "qrcode";
import InfoText from "../../components/ui/InfoText"



//User Manage
function ApplicationManage() {
    const [reset, setReset] = useState(false)

    const columns = [
        // {
        //     field: "avatar",
        //     headerName: lang.IMAGE,
        //     disableExport: true,
        //     filterable: false,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return (
        //             <UserAvatar user={params.row.book} />
        //         )
        //     }
        // },
        {
            field: 'title',
            headerName: 'اسم الاستماره',
            width: 200,
        }, {
            field: 'description',
            headerName: 'الوصف',
            width: 200,
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            isSwitch: true,
        },
        {
            field: 'code',
            headerName: "الرابط",
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                const link = location.origin + '/applications?id=' + params.row._id
                return <CopyToClipboard text={link} onCopy={() => alert("تم النسخ بنجاح")}>
                    <Button startIcon={<FaCopy size={'1.5rem'} />} sx={{ color: 'neutral.0' }} onClick={() => {
                    }}>
                        {link}
                    </Button >
                </CopyToClipboard>

            }
        }, {
            field: 'qrcode',
            headerName: "Qrcode",
            width: 170,
            type: 'actions',
            qrcode: async (row) => {
                const url = window.location.origin + '/application?id=' + row._id
                const qrdata = await QRCode.toDataURL(url);
                return qrdata
            },
            renderCell: (p) => {
                const url = window.location.origin + '/application?id=' + p.row._id
                return <BtnModal btnName={'عرض qrcode'}>
                    <InfoText label={'الرابط'} description={url} />
                    < GenerateQrCode url={url} />
                </BtnModal >
            }
        },
        //  {
        //     field: "grade",
        //     headerName: lang.GRADE,
        //     type: 'singleSelect',
        //     width: 200,
        //     valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        // }, 
        {
            field: "numbers",
            headerName: 'عدد مرات الاستخدام',
            type: 'number',
        }, {
            field: "courses",
            headerName: 'الكورسات',
            type: 'actions',
            width: 200,
            renderCell: (p) => {
                return <BtnModal btnName={'عرض الكورسات'} component={<Courses selections={p.row.courses} />} />
            }
        }, {
            field: "edit",
            headerName: 'تعديل',
            type: 'actions',
            width: 200,
            renderCell: (p) => {
                return <BtnModal btnName={'تعديل الاستماره'} color={'warning'}
                    component={<UpdateApplication application={p.row} setReset={setReset} />} />
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (createdAt) => new Date(createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]


    return (
        <Section>
            <TitleWithDividers title={'اداره الاستمارات'} />
            <BtnModal btn={<Button variant="contained">انشاء استماره</Button>} component={<CreateApplication setReset={setReset} />} />
            <FullComponent data={{
                useFetch: useLazyGetApplicationsQuery,
                useUpdate: useUpdateApplicationMutation,
                useDelete: useDeleteApplicationMutation,
                resKey: 'applications',
                columns, reset

            }} />
        </Section>
    )
}

export default ApplicationManage