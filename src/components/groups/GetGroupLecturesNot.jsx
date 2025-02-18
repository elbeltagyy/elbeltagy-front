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

import TabInfo from '../ui/TabInfo'

import { useAddToLecturesMutation, useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi';
import { FilledHoverBtn } from '../../style/buttonsStyles';
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



function GetGroupLecturesNot({ group, code }) {


    //get users
    const [chosenLectures, setChosenLectures] = useState([])
    const [open, setOpen] = useState(false)

    const [reset, setReset] = useState(false)

    const [getData, { isLoading }] = useLazyGetLecturesQuery()
    const [getLectures] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        let match = params
        if (group) {
            match.groups = '!=_split_' + group._id
            match.grade = group.grade
        }

        if (code) {
            match.codes = '!=_split_' + code._id
        }
        const res = await getLectures({ ...match }, false)
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

    //removing subscription
    const [sendData, addStatus] = useAddToLecturesMutation()
    const [addLecturesTo] = usePostData(sendData)

    const addLecturesToFC = async (values) => {
        if (group) {
            values.group = group._id
        }
        if (code) {
            values.code = code._id
        }
        await addLecturesTo(values)
        setReset(!reset)
    }

    const addLecture = async (lecture) => {
        await addLecturesToFC({ lectures: [lecture?._id] })
    }

    const addManyLectures = async () => {
        await addLecturesToFC({ lectures: chosenLectures })
        setChosenLectures([])
    }

    return (
        <Section>
            <MeDatagrid
                reset={[reset]}
                setSelection={setChosenLectures}
                type={'crud'} exportObj={exportObj} exportTitle={'محاضرات غير مضافه لمجموعه ' + group?.name || code.code}
                columns={columns}
                fetchFc={fetchFc} viewFc={addLecture}
                loading={isLoading || addStatus.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            {chosenLectures.length > 0 && (
                <WrapperHandler status={addStatus} showSuccess={true}>
                    <FilledHoverBtn onClick={() => setOpen(true)} disabled={addStatus.isLoading}>
                        {addStatus.isLoading ? <Loader color={'#fff'} /> : 'ايضافه المحاضرات'}
                    </FilledHoverBtn>
                    {open && <ModalStyled open={open} setOpen={setOpen} title={"هل انت متاكد من ايضافه المحاضرات ؟"} action={addManyLectures} />}
                </WrapperHandler>
            )}
        </Section>
    )
}


export default GetGroupLecturesNot