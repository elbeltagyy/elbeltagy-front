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
import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'

function GetSubscriptionsCourse() {

    const { courseId } = useParams()
    const { data, isLoading } = useGetOneCourseQuery({ _id: courseId })

    if (isLoading) return <LoaderSkeleton />
    const tabs = [
        { label: 'الطلاب المشتركون', component: <GetSubscriptions courseId={courseId} /> },
        { label: 'الطلاب الغير مشتركين', component: <GetSubscriptionsNot grade={data?.values?.grade} /> },

    ]
    return (
        <Section>
            <TitleWithDividers title={'اسم الكورس : ' + data?.values?.name} />
            <TabsAutoStyled originalTabs={tabs} />
        </Section>
    )
}

export default GetSubscriptionsCourse
