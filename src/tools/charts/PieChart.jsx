import ReactECharts from "echarts-for-react";

function PieChart({categories}) {

    /** @type {import('echarts').EChartsOption} */   // ← the magic line
    const option = {

        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '0%',
            left: 'center',

        },
        series: [
            {
                name: 'احصائياتك هذا العام',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderType:'dotted'
                },
                label: {
                    show: false,
                    position: 'center',
                    
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'عدد الاختبارات' },
                    { value: 735, name: 'عدد الاختبارات الغير متبقيه' },
                    { value: 580, name: 'عدد المشاهدات' },
                    { value: 484, name: 'عدد المحاضرات المتبقيه' },
                ]
            }
        ]
    };
    return (
        <div>
            <ReactECharts
                option={option}
                style={{ width: "100%" }}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    )
}

export default PieChart
