import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import useLazyGetData from "../../hooks/useLazyGetData";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import InfoText from "../../components/ui/InfoText";
import { FlexRow } from "../../style/mui/styled/Flexbox";
import { PiFilePdf, PiFilePng, PiFileSvg } from "react-icons/pi";
import jsPDF from "jspdf";

function PieChart({ categories, title = 'pie', getData, filters, colors = [] }) {

    const [fetchFc] = useLazyGetData(getData)
    const [series, setSeries] = useState([])

    const [isActive, setActive] = useState(!localStorage.getItem(title))
    const deActive = () => {
        if (!title) return
        if (isActive) {
            localStorage.setItem(title, false)
            setActive(false)
        } else {
            setActive(true)
            localStorage.removeItem(title)
        }
    }

    useEffect(() => {
        const trigger = async () => {
            const data = await fetchFc(filters)
            setSeries(data.series)
        }
        if (fetchFc && isActive && series.length === 0) {
            trigger()
        }
    }, [isActive])
    const color = [
        //⭐ Premium Gradient Palette
        "#667eea",
        "#764ba2",
        "#6a11cb",
        "#2575fc",
        "#ff512f",
        "#dd2476",

        //⭐ Vibrant Dashboard Colors (Most Popular)
        "#3F51B5",
        "#03A9F4",
        "#4CAF50",
        "#FFC107",
        "#FF5722",
        "#9C27B0",

        //⭐ Soft Material Colors
        "#80CBC4",
        "#FFAB91",
        "#F48FB1",
        "#CE93D8",
        "#90CAF9",
        "#A5D6A7",
    ]
    const theme = useTheme()
    /** @type {import('echarts').EChartsOption} */   // ← the magic line
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '0%',
            left: 'center',
            textStyle: {
                color: 'initial',
                fontSize: '13px',
                fontWeight: 500
            },
        },
        series: [
            {
                name: title || 'احصائياتك هذا العام',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    // borderColor: '#fff',
                    // borderType: 'dotted'
                },
                label: {
                    show: true,
                    position: 'inside',
                    // formatter: '{c}',   // only value
                    formatter: '{b}: {c}', // name + value (optional)
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: theme.palette.neutral[0]
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: series.map((item, i) => ({
                    value: item,
                    name: categories[i],
                    itemStyle: {
                        color: colors[i] && color[colors[i]]
                    }
                }))
            }
        ]
    };
    const chartRef = useRef();

    const exportAsImage = (type = "png") => {
        const instance = chartRef.current?.getEchartsInstance();
        if (!instance) return;
        const base64 = instance.getDataURL({ type });
        const link = document.createElement("a");
        link.href = base64;
        link.download = `chart-export.${type}`;
        link.click();
    };

    const exportToPDF = () => {
        const instance = chartRef.current?.getEchartsInstance();
        const base64 = instance.getDataURL({ type: "png" });
        const pdf = new jsPDF();
        pdf.addImage(base64, "PNG", 15, 15, 180, 120); // x, y, width, height
        pdf.save("chart.pdf");
    };
    return (
        <Box sx={{ width: '100%', backgroundColor: 'background.alt', padding: '12px 8px', color: 'neutral.0' }}>
            <Typography onClick={() => deActive()} sx={{ cursor: 'pointer', fontSize: '12px', color: red[400] }}>{isActive ? 'اخفاء' : 'اظهار'}</Typography>
            {title}
            {isActive && (
                <>
                    <InfoText label={'الاجمالي'} description={series.reduce((pre, ele) => pre + ele, 0)} />
                    <ReactECharts
                        ref={chartRef}
                        option={option}
                        style={{ width: "100%" }}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                    <FlexRow gap={'8px'} my={'12px'}>

                        <Button size="small" endIcon={<PiFilePng size={'1.5rem'} />} variant="outlined" sx={{ textTransform: 'none' }} onClick={() => exportAsImage("png")}>
                            Export as PNG
                        </Button>
                        <Button size="small" color="warning" endIcon={<PiFileSvg size={'1.5rem'} />} variant="outlined" sx={{ textTransform: 'none' }} onClick={() => exportAsImage("svg")}>
                            Export as svg
                        </Button>
                        <Button color="secondary" endIcon={<PiFilePdf size={'1.5rem'} />} size="small" variant="contained" sx={{ textTransform: 'none' }} onClick={() => exportToPDF()}>
                            Export as PDF
                        </Button>
                    </FlexRow>
                </>
            )}
        </Box>
    )
}

export default PieChart
