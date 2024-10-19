import React from 'react'
import { useGetCodesQuery } from '../../toolkit/apis/codesApi'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { Box } from '@mui/material'
import TitleWithDividers from '../ui/TitleWithDividers'

function UserCodes({ user }) {
    const { data, isLoading } = useGetCodesQuery({ usedBy: user?._id })

    const columns = [
        {
            field: 'code',
            headerName: "الكود",
            width: 180
        }, {
            field: 'price',
            headerName: "السعر",
            width: 170,
            type: 'number',
        }, {
            field: 'type',
            headerName: 'نوع الكود',
            width: 170
        }
    ]

    return (
        <Box sx={{ width: '100%' }}>
            <TitleWithDividers title={'الاكواد المستخدمه'} />
            <MeDatagrid type={'simple'} columns={columns} data={data?.values.codes || []} loading={isLoading || false} />
        </Box>

    )
}

export default UserCodes
