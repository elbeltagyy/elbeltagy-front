import * as Yup from 'yup'

export const imageTypeValid = {
    message: 'Please provide a supported image typed(jpg or png or webp)',
    test: (file, context) => {
        if (file && !file.url) {
            if (file?.url) {
                file.type = file.resource_type + "/" + file.format
            }
            const isValid = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file?.type);
            if (!isValid) context?.createError();
            return isValid;
        } else {
            return true
        }
    }
}

export const imageSizeValid = {
    message: `يجب ان يكون حجم الملف اقل من ${(import.meta.env.VITE_MAX_IMAGE_SIZE || 3)} ميغا`,
    test: (file) => {
        if (file && file.size) {
            const isValid = file?.size <= (import.meta.env.VITE_MAX_IMAGE_SIZE || 3) * 1024 * 1024; // 3MB
            // const isValid = file?.size < 3 * 1024 * 1024;
            return isValid;
        } else {
            return true
        }
    }
}

const imageValidation = Yup.mixed().required('مطلوب صوره')
    .test(imageTypeValid)
    .test(imageSizeValid)


export default imageValidation