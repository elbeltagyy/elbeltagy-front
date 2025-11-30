import { useState } from "react"
import useLazyGetData from "../../hooks/useLazyGetData"

import Grid from "../../style/vanilla/Grid"
import { useLazyAnalysisSubscriptionsQuery } from "../../toolkit/apis/statisticsApi"
import { useLazyAnalysisUsersByKeysQuery } from "../../toolkit/apis/usersApi"
import PieChart from "../../tools/charts/PieChart"
import DynamicBarChart from "../../tools/charts/BarChart"

function AdminHome() {
    //this month => New Users, subscriptions, subscribed Versus Not Subscribed
    //analysisUser({grade: 1, createdAt: 'this month'})
    const [getData] = useLazyAnalysisUsersByKeysQuery()
    const categories = ['الطلاب', 'الطلاب الجدد']

    const [analysisSubscriptions] = useLazyAnalysisSubscriptionsQuery()
    const [analysisFc] = useLazyGetData(analysisSubscriptions)
    const [subs, setSubs] = useState({ result: [], categories: [] })
    const trigger = async () => {
        const res = await analysisFc()
        setSubs(res)
    }

    return (
        <Grid>
            <PieChart
                title={"الطلاب الجدد هذا الشهر" + '(' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + ')'}
                categories={categories}
                getData={getData} colors={[11, 9]}
                filters={{ filterByTime: new Date().toISOString() }}
            />
            <PieChart
                title="الطلاب اللي اشتركوا/الطلاب اللي مشتركوش"
                categories={['الطلاب المشتركون', 'الغير مشتركين']}
                getData={getData}
                filters={{ courses: 'size_split_0' }} colors={[4, 7]}
            />
            <DynamicBarChart
                title={'اشتراكات الكورسات'}
                categories={subs.categories} series={subs.result}
                trigger={trigger} />
        </Grid>
    )
}

export default AdminHome
