import { Button } from '@mui/material'
import React, { memo, useMemo, useState } from 'react'

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { amiriFont } from './Amiri-Regular-normal';
// import { amiriFont } from './AmiriQuran-Regular-normal';
// import { myFont } from './Rubik-Regular-normal';
// import { rubikRegular } from './Rubik-Regular-normal';

function ExportAsPdf({ columns, rows }) {

    // console.log('our columns ==>', columns)
    const exportPDF = () => {


        const doc = new jsPDF({
            orientation: "landscape",
        });
        // doc.addFileToVFS('Rubik-Regular-normal.ttf', amiriFont);  // Load the font file into jsPDF's virtual file system
        // Add Rubik font to jsPDF
        doc.addFileToVFS('Amiri-Regular.ttf', amiriFont);
        doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
        doc.setFont('Amiri'); // Use Amiri font

        doc.setFontSize(8);

        const arabicText = 'مرحبا بكم في تقريرنا';

        doc.text(arabicText, 100, 10, { font: 'Rubik-Regular', halign: 'left' });
        const selectedColumnsData = columns.filter(col => col.disableExport !== true && col.hidden !== true);

        // Prepare table data
        const tableColumnTitles = selectedColumnsData.map(col => col.headerName);

        const tableRows = rows.map(row =>
            selectedColumnsData.map(col => row[col.field])
        );
        // Generate PDF using autoTable
        doc.autoTable({
            head: [tableColumnTitles],
            body: tableRows,
            theme: 'striped',
            headStyles: { font: 'Amiri' },
            bodyStyles: { font: 'Amiri' },
            styles: {
                halign: 'right', // Right-to-left alignment for Arabic
            },
        });

        doc.save('table.pdf');
    };

    return (
        <Button onClick={() => exportPDF()}>تصدير ك PDF</Button>
    )
}

export default memo(ExportAsPdf)


// This code is used for backwards compatibility with the older jsPDF variable name
// Read more: https://github.com/MrRio/jsPDF/releases/tag/v2.0.0