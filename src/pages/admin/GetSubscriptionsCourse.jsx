import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Section from '../../style/mui/styled/Section'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { useGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import Separator from '../../components/ui/Separator'
import GetSubscriptionsNot from './GetSubscriptionsNot'
import { red } from '@mui/material/colors'
import GetSubscriptions from '../../components/subscriptions/GetSubscriptions'

function GetSubscriptionsCourse() {

    const { courseId } = useParams()
    const { data, isLoading } = useGetOneCourseQuery({ _id: courseId })

    if (isLoading) return <LoaderSkeleton />

    return (
        <Section>
            <TitleWithDividers title={'اسم الكورس : ' + data?.values?.name} />

            <GetSubscriptions courseId={courseId} />
            <Separator color={red[500]} sx={{ width: '300px' }} />
            <GetSubscriptionsNot grade={data?.values?.grade} />

        </Section>
    )
}

export default GetSubscriptionsCourse
