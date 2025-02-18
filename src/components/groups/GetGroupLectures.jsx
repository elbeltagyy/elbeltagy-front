import { useState } from 'react'
import { Box } from '@mui/material'

import gradeConstants from '../../settings/constants/gradeConstants'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import usePostData from '../../hooks/usePostData'
import useLazyGetData from '../../hooks/useLazyGetData'


import TabInfo from '../../components/ui/TabInfo'

import { useLazyGetLecturesQuery, useRemoveFromLecturesMutation } from '../../toolkit/apis/lecturesApi';
import { ErrorBtn } from '../../style/buttonsStyles';
import WrapperHandler from '../../tools/WrapperHandler';
import Loader from '../../style/mui/loaders/Loader';
// import CreateUser from '../../components/users/CreateUser'


const exportObj = {
    grade: (row) => {
        return gradeConstants.find(grade => grade.index === row.grade)?.name
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    wallet: (row) => {
        return row.wallet + ' ' + 'جنيه'
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    }
}



function GetGroupLectures({ group, code }) {

    //get users
    const [open, setOpen] = useState(false)

    const [chosenLectures, setChosenLectures] = useState([])
    const [reset, setReset] = useState(false)

    const [getData, { isLoading }] = useLazyGetLecturesQuery()
    const [getLectures] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        let match = params
        if (group) {
            match.groups = group._id
            // match.grade = group.grade
        }

        if (code) {
            match.codes = code._id
        }

        const res = await getLectures(match, false)
        const data = { values: res.lectures, count: res.count }
        return data
    }


    const columns = [
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200,
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            valueGetter: (params) => params.row?.isActive,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (params) => new Date(params.row.createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    const [deleteData, deleteStatus] = useRemoveFromLecturesMutation()
    const [removeLectureFromGroup] = usePostData(deleteData)

    const removeLecturesFc = async (values) => {
        if (group) {
            values.group = group._id
        }
        if (code) {
            values.code = code._id
        }
        await removeLectureFromGroup(values)
        setReset(!reset)
    }

    const deleteFc = async (id) => {
        await removeLecturesFc({ lectures: [id] })
    }

    const deleteMany = async () => {
        await removeLecturesFc({ lectures: chosenLectures })
        setChosenLectures([])
    }

    // if (!group || !code) return <></>
    return (
        <Section>
            <MeDatagrid
                reset={[reset]}
                setSelection={setChosenLectures}
                type={'crud'} exportObj={exportObj} exportTitle={'محاضرات ' + group?.name || code.code}
                columns={columns}
                fetchFc={fetchFc} deleteFc={deleteFc}
                loading={isLoading || deleteStatus.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />


            {chosenLectures.length > 0 && (
                <WrapperHandler status={deleteStatus} showSuccess={true}>
                    <ErrorBtn onClick={() => setOpen(true)} disabled={deleteStatus.isLoading}>
                        {deleteStatus.isLoading ? <Loader color={'#fff'} /> : 'ازاله المحاضرات'}
                    </ErrorBtn>
                    {open && <ModalStyled open={open} setOpen={setOpen} title={"هل انت متاكد من ازاله المحاضرات ؟"} action={deleteMany} />}
                </WrapperHandler>
            )}
        </Section>
    )
}


export default GetGroupLectures
