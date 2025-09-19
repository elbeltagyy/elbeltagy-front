import { Button } from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Use default fonts or add custom fonts

import { rubikRegular } from './Rubik-Regular-normal';

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Load default fonts
// console.log(pdfMake)

function MakePdf() {
    const generatePDF = () => {

        pdfMake.vfs = {
            ...pdfMake.vfs, // Preserve existing fonts
            'AmiriQuran.ttf': rubikRegular, // Add Amiri Quran base64 font here
        };
        pdfMake.fonts = {
            AmiriQuran: {
                normal: 'AmiriQuran.ttf',
            },
        };

        const docDefinition = {
            content: [
                { text: 'مرحبا بكم في تقريرنا', style: 'header', alignment: 'right' },
                {
                    table: {
                        body: [
                            [{ text: 'enlgsih', alignment: 'right' }, { text: 'محتوى', alignment: 'right' }],
                            [{ text: 'العنوان 1', alignment: 'right' }, { text: 'محتوى 1', alignment: 'right' }],
                            [{ text: 'العنوان 2', alignment: 'right' }, { text: 'محتوى 2', alignment: 'right' }],
                        ],
                    },
                },
            ],
            defaultStyle: {
                font: 'AmiriQuran', // Use an Arabic-supporting font here
                alignment: 'right', // Set default alignment to right for RTL text
            },
        };

        pdfMake.createPdf(docDefinition).download('example.pdf');
    }

    return (
        <Button onClick={generatePDF}>
            do it
        </Button>
    )
}

export default MakePdf



