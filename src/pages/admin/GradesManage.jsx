import { Button } from "@mui/material"
import CreateGrade from "../../components/grades/CreateGrade"
import BtnModal from "../../components/ui/BtnModal"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import UserAvatar from "../../components/users/UserAvatar"
import { lang } from "../../settings/constants/arlang"
import Section from "../../style/mui/styled/Section"
import { useDeleteGradeMutation, useLazyGetGradesQuery, useUpdateGradeMutation } from "../../toolkit/apis/gradesApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import { useState } from "react"
import UpdateGrade from "../../components/grades/UpdateGrade"

//grade frontend to be fetched globally
//Models use Grade
//Fix Data
function GradesManage() {
    const [reset, setReset] = useState(false)

    const columns = [
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.image?.url} />
            }
        }, {
            field: 'index',
            headerName: 'index',
            editable: true
        }, {
            field: 'name',
            headerName: 'الاسم',
            editable: true
        }, {
            field: 'description',
            headerName: 'الوصف',
            flex: 1,
            editable: true


        }, {
            field: 'isActive',
            headerName: 'فعال ؟',
            type: 'boolean',
            isSwitch: true
        }, {
            field: 'update',
            headerName: 'تعديل',
            type: 'actions',
            renderCell: (p) => {

                return <BtnModal btnName={'تعديل'} component={<UpdateGrade setReset={setReset} grade={p.row} />} />

            }
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'إدارة المواد الاساسيه'} />
            <BtnModal btnName={'إنشاء ماده جديده'}>
                <CreateGrade setReset={setReset} />
            </BtnModal>

            <FullComponent data={{
                useFetch: useLazyGetGradesQuery,
                useDelete: useDeleteGradeMutation,
                resKey: 'grades', reset,
                useUpdate: useUpdateGradeMutation, isMultiPart: true,
                columns
            }} />
        </Section>
    )
}

export default GradesManage
