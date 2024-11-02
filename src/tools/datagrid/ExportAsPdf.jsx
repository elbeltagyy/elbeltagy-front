import { Box, Button } from '@mui/material'
import { memo, useState } from 'react'

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { amiriFont } from './Amiri-Regular-normal';
// import { amiriFont } from './AmiriQuran-Regular-normal';
// import { myFont } from './Rubik-Regular-normal';
// import { rubikRegular } from './Rubik-Regular-normal';

function ExportAsPdf({
    fetchFc, sort = {}, filter = {},
    columns, rows,
    exportObj = {}, exportTitle = 'مرحبا بكم في تقرير مستر البلتاجى', paginationModel = false
}) {

    const [isLoading, setLoading] = useState(false)

    const fetchAll = async () => {
        setLoading(true)
        let res = await fetchFc(
            { ...sort, ...filter }
        )
        setLoading(false)
        return res.values
    }

    const exportPDF = async (isAll = false) => {
        try {
            setLoading(true)
            console.log('hello')
            const doc = new jsPDF({
                orientation: "landscape",
            });
            // doc.addFileToVFS('Rubik-Regular-normal.ttf', amiriFont);  // Load the font file into jsPDF's virtual file system
            // Add Rubik font to jsPDF
            doc.addFileToVFS('Amiri-Regular.ttf', amiriFont);
            doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
            doc.setFont('Amiri'); // Use Amiri font

            doc.setFontSize(10);
            let arabicText = exportTitle;

            // manage header for rows
            const selectedColumnsData = columns.filter(col => col.disableExport !== true && col.hidden !== true);

            // Prepare table data
            const tableColumnTitles = selectedColumnsData.map(col => col.headerName).reverse()
            const columnsField = selectedColumnsData.map(col => col.field)

            //manage row 
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

            let modifiedRows = []
            if (isAll) {
                let res = await fetchAll()
                modifiedRows = exportFc(res)
            } else {
                modifiedRows = exportFc(rows)
            }

            //reverse row to be RTL
            const tableRows = modifiedRows.map(row =>
                selectedColumnsData.map(col => row[col.field]).reverse()
            )

            if (paginationModel) {
                let pageText = "الصفحه " + (paginationModel.page + 1) + 'و العدد ' + tableRows.length
                if (!isAll) {
                    pageText += ' و اقصى عدد فى الملف ' + paginationModel.pageSize
                }

                arabicText = arabicText + ' ' + pageText
            }
            //
            // console.log('tableCOlumns data ==>', tableColumnTitles)
            // console.log('table rows ==>', tableRows)

            // Generate PDF using autoTable
            const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
            const textWidth = doc.getTextWidth(arabicText); // Get the width of the text
            const x = (pageWidth - textWidth) / 2; // Calculate the x position for center alignment

            doc.text(arabicText, x, 10, { font: 'Rubik-Regular', halign: 'center' }); // Now it is centered

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

            doc.save(arabicText);
            setTimeout(() => {
                setLoading(false)
            }, 5000)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Button disabled={isLoading} onClick={() => exportPDF()}>
                {isLoading ? 'يتم تصدير الملف ...' : 'تصدير ك PDF'}
            </Button>

            <Button disabled={isLoading} onClick={() => {
                exportPDF(true)
            }}>
                {isLoading ? 'يتم تصدير الملف ...' : 'تصدير الكل'}
            </Button>
        </Box>
    )
}

export default memo(ExportAsPdf)


// This code is used for backwards compatibility with the older jsPDF variable name
// Read more: https://github.com/MrRio/jsPDF/releases/tag/v2.0.0