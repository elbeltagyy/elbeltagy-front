import { Button } from '@mui/material'
import React, { memo, useMemo, useState } from 'react'

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { amiriFont } from './Amiri-Regular-normal';
import { makeArrWithValueAndLabel } from '../fcs/MakeArray';
import gradeConstants from '../../settings/constants/gradeConstants';
// import { amiriFont } from './AmiriQuran-Regular-normal';
// import { myFont } from './Rubik-Regular-normal';
// import { rubikRegular } from './Rubik-Regular-normal';

function ExportAsPdf({ columns, rows, exportObj = {}, exportTitle = 'مرحبا بكم في تقرير مستر البلتاجى' }) {
    const [isLoading, setLoading] = useState(false)
    const exportPDF = () => {
        setLoading(true)
        const doc = new jsPDF({
            orientation: "landscape",
        });
        // doc.addFileToVFS('Rubik-Regular-normal.ttf', amiriFont);  // Load the font file into jsPDF's virtual file system
        // Add Rubik font to jsPDF
        doc.addFileToVFS('Amiri-Regular.ttf', amiriFont);
        doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
        doc.setFont('Amiri'); // Use Amiri font

        doc.setFontSize(10);

        const arabicText = exportTitle;

        doc.text(arabicText, 100, 10, { font: 'Rubik-Regular', halign: 'right', });
        const selectedColumnsData = columns.filter(col => col.disableExport !== true && col.hidden !== true);

        // Prepare table data

        const tableColumnTitles = selectedColumnsData.map(col => col.headerName).reverse()
        const columnsField = selectedColumnsData.map(col => col.field)

        const exportFc = (rows) => {
            const modify = rows.map(row => {
                let clonedRow = JSON.parse(JSON.stringify(row));
                columnsField.map(field => {
                    if (exportObj[field]) {
                        const fieldMethod = exportObj[field]
                        clonedRow[field] = fieldMethod(row)
                    }
                })
                return clonedRow
            });
            return modify
        }

        const modifiedRows = exportFc(rows)

        const tableRows = modifiedRows.map(row =>
            selectedColumnsData.map(col => row[col.field]).reverse()
        )
        //

        // console.log('tableCOlumns data ==>', tableColumnTitles)
        // console.log('table rows ==>', tableRows)

        // Generate PDF using autoTable
        doc.autoTable({
            head: [tableColumnTitles],
            body: tableRows,
            theme: 'striped',
            styles: {
                halign: 'right', // Right-to-right alignment for Arabic
            },
            headStyles: {
                halign: 'right',
                font: 'Amiri' // Align the header text to the right
            },
            bodyStyles: {
                halign: 'right',
                font: 'Amiri' // Align the body text to the right
            },
            tableWidth: 'auto', // Ensures table width is automatically calculated
            direction: 'rtl'
        });

        doc.save('table.pdf');
        setLoading(false)
    };

    return (
        <Button disabled={isLoading} onClick={() => exportPDF()}>تصدير ك PDF</Button>
    )
}

export default memo(ExportAsPdf)


// This code is used for backwards compatibility with the older jsPDF variable name
// Read more: https://github.com/MrRio/jsPDF/releases/tag/v2.0.0