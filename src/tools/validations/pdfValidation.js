import * as Yup from 'yup'

export const pdfTypeValid = {
    message: 'Please provide a supported file type (pdf)',
    test: (file, context) => {
        if (file && !file.url) {
            if (file?.url) {
                file.type = file.resource_type + "/" + file.format
            }
            const isValid = ['application/pdf'].includes(file?.type);
            if (!isValid) context?.createError();
            return isValid;
        } else {
            return true
        }
    }
}

export const pdfSizeValid = {
    message: `يجب ان يكون حجم الملف اقل من ${(import.meta.env.VITE_MAX_PDF_SIZE || 5)} ميغا`,
    test: (file) => {
        if (file && file.size) {
            const isValid = file?.size <= (import.meta.env.VITE_MAX_PDF_SIZE || 5) * 1024 * 1024; // 5MB
            return isValid;
        } else {
            return true
        }
    }
}

const pdfValidation = Yup.mixed().required('مطلوب ملف')
    .test(pdfTypeValid)
    .test(pdfSizeValid)

export default pdfValidation