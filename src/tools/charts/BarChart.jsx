import { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button, Typography, useTheme } from "@mui/material";
import jsPDF from "jspdf";

import * as echarts from 'echarts/core';
import Grid from "../../style/vanilla/Grid";
import { FlexRow } from "../../style/mui/styled/Flexbox";
import { PiFilePdf, PiFilePng, PiFileSvg } from "react-icons/pi";
import { red } from "@mui/material/colors";
import InfoText from "../../components/ui/InfoText";
// import { BarChart } from 'echarts/charts';
// import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]);
/**
 * DynamicBarChart Component
 * -------------------------------------------------------------
 * Props
 * -----
 * @param {string[]} categories  – labels along the x‑axis (e.g. ["Mon", "Tue", ...])
 * @param {Array<{ name: string; data: number[] }>} series – each bar series to plot
 * @param {string}  height       – css height of the chart container (default "400px")
 */

const getColor = (val) => {
    const color = val || ''
    if (color.startsWith('linear')) {
        const degrees = color.split('(')[1].split(')')[0].split(',')
        const gradients = degrees.map((degree, i) => {
            return { offset: ((i + 1) / degrees.length), color: degree }
        })
        const gradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, gradients)
        return gradient
    } else {
        return color
    }
}

export default function DynamicBarChart({ categories = [], series = [], height = "400px", title, trigger }) {

    const theme = useTheme()
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
        if (trigger && isActive && series.length === 0) {
            trigger()
        }
    }, [isActive])


    /** @type {import('echarts').EChartsOption} */   // ← the magic line
    const option = useMemo(() => ({
        textStyle: {
            color: theme.palette.neutral[0],
        },
        legend: {
            top: 10, //label in the top,

            textStyle: {
                color: theme.palette.neutral[0],
            },
        },
        tooltip: { //When Column Hover
            trigger: "axis",
            axisPointer: { type: "shadow" },
            formatter: params =>
                params
                    .map(
                        p => `${p.marker} ${p.seriesName}: <b>${p.value}</b><br/>`
                    )
                    .join("") + `<b>Total in: ${params.reduce((sum, p) => sum + p.value, 0)}</b>`,
        },

        grid: { //Padding
            left: "3%",
            right: "4%",
            bottom: "0%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                data: categories,
                axisTick: { alignWithLabel: true },
                // axisLine: {
                //     lineStyle: { color: "#ccc" },
                //   },
            }
        ],
        yAxis: [ //Horz Line from Vert
            {
                type: "value",
                splitLine: {
                    lineStyle: {
                        color: theme.palette.neutral[500],
                        type: "dashed",
                    },
                },
            }
        ],
        series: series.map(s => ({
            ...s,
            type: "bar",
            name: s.name,
            // stack: "total", // 👈 Enables stacked bars
            emphasis: { focus: "series" },
            data: s.data,
            animationDuration: 600,
            animationEasing: "cubicOut",
            itemStyle: {
                color: getColor(s.color)
            },
        }))
    }), [categories, series]);

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
        <div style={{ width: '100%', backgroundColor: theme.palette.background.alt, padding: '12px 8px' }}>
            <Typography onClick={() => deActive()} sx={{ cursor: 'pointer', fontSize: '12px', color: red[400] }}>{isActive ? 'اخفاء' : 'اظهار'}</Typography>
            {title}
            {isActive && (
                <>
                    <InfoText label={'الاجمالي'} description={series.reduce((pre, ele) => pre + ele.data.reduce((preNum, num) => preNum + num, 0), 0)} />
                    <ReactECharts
                        ref={chartRef}
                        option={option}
                        style={{ width: "100%", height }}
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
        </div>
    );
}

/*
[
{ offset: 0, color: "#e66465" },
{ offset: 1, color: "#188df0" },
]
*/