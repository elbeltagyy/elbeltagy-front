import { useState } from 'react'
import { lang } from '../../settings/constants/arlang'
import MakeForm from '../../tools/makeform/MakeForm'

import Section from "../../style/mui/styled/Section"
import * as Yup from "yup"
import MakeSelect from '../../style/mui/styled/MakeSelect'
import sectionConstants from '../../settings/constants/sectionConstants'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import TitleWithDividers from '../ui/TitleWithDividers'
import filePlayers from '../../settings/constants/filePlayers'
import BtnModal from '../ui/BtnModal'
import ExamCreatePage from '../../pages/admin/ExamCreatePage'
import ExamUpdatePage from '../../pages/admin/ExamUpdatePage'

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/;

// const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/;
export const durationRegex = /^(?!^\d+$)(?:(?:\d+[hms]))(?:\s+(?:(?:\d+[hms])))*$/;
const bunnyRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;


function LectureForm({ grade, course, onSubmit, lecture, status, location, setLectures }) {
    const [close, setClose] = useState(false) //forExam create

    const [sectionType, setSectionType] = useState(lecture?.sectionType)
    const [videoPlayer, setVideoPlayer] = useState(lecture?.video?.player)
    const [activeFilePlayer, setActiveFilePlayer] = useState(lecture?.file?.player)

    const lectureInfoInputs = [
        {
            name: 'id',
            label: '',
            value: lecture?._id,
            hidden: true,
            disabled: true
        }, {
            name: 'sectionType',
            label: '',
            value: sectionType,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED)
        }, {
            name: 'grade',
            label: '',
            value: lecture?.grade ?? grade,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED)
        }, {
            name: 'course',
            label: '',
            value: lecture?.course ?? course,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED)
        }, {
            name: 'chapter',
            label: '',
            value: lecture?.chapter ?? '',
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED)
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
            value: lecture?.name,//|| ''
            validation: Yup.string()
                .required(lang.REQUERIED)
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 11,
            value: lecture?.description, //|| ''
            validation: Yup.string()
                .required(lang.REQUERIED)
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'switch',
            value: lecture?.isActive ?? true,
        }, {
            name: 'isSalable',
            label: 'قابله للبيع',
            type: 'switch',
            value: lecture?.isSalable ?? true,
        }, {
            name: 'price',
            label: 'السعر',
            type: 'number',
            value: lecture?.price ?? 0,
        },
    ]

    // ######################### manage videos #########################
    //lecture? with youtube video
    const youtubeInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            label: 'المشغل',
            disabled: true,
            value: filePlayers.YOUTUBE
        }, {
            name: 'url',
            label: 'الصق url',
            type: 'url',
            player: 'youtube',
            validation: Yup.string()
                .required(lang.REQUERIED)
                .matches(youtubeRegex, 'Invalid YouTube URL.'),
            value: lecture?.video?.url
        }, {
            name: 'isButton',
            label: 'تحويله على يوتيوب',
            type: 'switch',
            value: lecture?.video?.isButton,
        }, {
            name: 'duration',
            label: 'الوقت',
            validation: Yup.string()
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
                .required(lang.REQUERIED),
            value: lecture?.video?.duration,
            helperText: 'يرجي كتابه وقت الفيديو بدقه حتي يتم حساب وقت الفيديو اللازم للمشاهده بطريقه صحيحه'
        }, {
            name: 'minDuration',
            label: 'نسبه الفيديو اللازم مشاهدتها (اختياري)',
            validation: Yup.number()
                .min(0, 'لا يمكن ان يكون بالسالب').max(100, 'القيمه من 0 : 100%'),

            value: lecture?.video?.minDuration,
            startIcon: '%',
            helperText: 'يرجي العلم ان النسبه تحسب  من اجمالي عدد الدقائق المشاهده لذلك يمكن للطالب ان يشاهد الفيديو على سرعه 2x وبالتالي سيكون قد شاهد نصف الفيديو فقط ولكن فى الحقيقه قام بانهاء المحاضره'
        },
    ]

    //lecture? with bunny url
    const bunnyInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            label: 'المشغل',
            disabled: true,
            value: filePlayers.BUNNY
        }, {
            name: 'url',
            label: 'الصق url',
            type: 'iframe',
            player: 'bunny',
            value: lecture?.video?.url,
            validation: Yup.string()
                .matches(bunnyRegex, 'غير صالح')
                .required(lang.REQUERIED),
        }, {
            name: 'duration',
            label: 'الوقت',
            validation: Yup.string()
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
                .required(lang.REQUERIED),
            value: lecture?.video?.duration
        }
    ]

    //lecture? with bunny upload
    const bunnyUploadInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            label: 'نوع المشغل',
            value: filePlayers.BUNNY_UPLOAD,
            disabled: true
        }, {
            name: 'video',
            label: 'اختر فيديو',
            type: 'file',
            value: lecture?.video,
            validation: Yup.mixed().required(lang.REQUERIED)
                .test({
                    message: 'Please provide a supported video typed(mp4)',
                    test: (file, context) => {
                        const isValid = ['video/mp4'].includes(file?.type);
                        if (!isValid) context?.createError();
                        return isValid;
                    }
                })
                .test({
                    message: 'Must be less than 15mg',
                    test: (file) => {
                        const isValid = file?.size < 15 * 1000000;
                        return isValid;
                    }
                })
        }, {
            name: 'duration',
            label: 'الوقت',
            validation: Yup.string()
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
                .required(lang.REQUERIED),
            value: lecture?.video?.duration,
        }
    ]

    //lecture? with server upload
    const videoServerInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            label: '',
            value: filePlayers.SERVER,
            disabled: true
        }, {
            name: 'video',
            label: 'الصق url',
            type: 'file',
            value: lecture?.video,
            validation: Yup.mixed().required(lang.REQUERIED)
                .test({
                    message: 'Please provide a supported video typed(mp4)',
                    test: (file, context) => {
                        const isValid = ['video/mp4'].includes(file?.type);
                        if (!isValid) context?.createError();
                        return isValid;
                    }
                })
                .test({
                    message: 'Must be less than 15mg',
                    test: (file) => {
                        const isValid = file?.size < 15 * 1000000;
                        return isValid;
                    }
                })
        }, {
            name: 'duration',
            label: 'الوقت',
            validation: Yup.string()
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
                .required(lang.REQUERIED),
            value: lecture?.video?.duration,
        }
    ]

    // ######################### manage links #########################
    // start links 
    const linkInputs = [...lectureInfoInputs,
    {
        name: 'url',
        label: 'الصق url',
        validation: Yup.string()
            .url('Invalid URL format')
            .required(lang.REQUERIED),
        value: lecture?.link?.url
    }, {
        name: 'isButton',
        label: 'هل هو فيديو ؟',
        type: 'switch',
        value: lecture?.link?.isButton
    },
    ]

    // ######################### manage file #########################
    // file url
    const fileInputs = [...lectureInfoInputs,
    {
        name: 'player',
        value: filePlayers.GOOGLE_DRIVE,
        disabled: true,
        label: 'المشغل',

    }, {
        name: 'url',
        label: 'url',
        type: 'url',
        player: 'google',
        validation: Yup.string()
            .url('Invalid URL format')
            .required(lang.REQUERIED),
        value: lecture?.file?.url,
    }
    ]

    //file server
    const fileServerInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            value: filePlayers.SERVER,
            disabled: true,
        }, {
            name: 'video', // just for server
            label: 'file here',
            type: 'file',
            value: lecture?.file,
            validation: Yup.mixed()
                .required(lang.REQUERIED)
                .test('fileType', 'Uploaded file must be a PDF', (value) => {
                    if (!value) return false; // If no file, return false
                    const fileType = value.type || value.resource_type; // Get the MIME type of the file
                    return fileType === 'application/pdf'; // Check if it's a PDF
                })
                .test({
                    message: `يجب ان يكون حجم الملف اقل من ${import.meta.env.VITE_MAX_PDF_SIZE || 100} MB `,
                    test: (file) => {
                        if (file && file.size) {
                            const isValid = file?.size <= (import.meta.env.VITE_MAX_PDF_SIZE || 100) * 1024 * 1024; // 3MB
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        }
    ]

    // //file bunny
    // const fileBunnyInputs = [...lectureInfoInputs,
    // {
    //     name: 'player',
    //     label: 'نوع المشغل',
    //     value: activeFilePlayer,
    //     disabled: true
    // }, {
    //     name: 'video',
    //     label: 'اختر file',
    //     type: 'file',
    //     value: lecture?.file,
    // }
    // ]

    const createExamBtnUrl = '/management/courses/' + course + '/exams/create'
    const updateExamUrl = '/management/courses/' + lecture?.course + '/exams/' + lecture?._id

    return (
        <Section>
            <TitleWithDividers title={'اختر القسم المناسب'} />
            <FlexColumn gap={'10px'}>

                <MakeSelect disabled={location === 'update' ? true : false} title={'اختر القسم المناسب'} value={sectionType} setValue={setSectionType}
                    options={[sectionConstants.EXAM, sectionConstants.FILE, sectionConstants.LINK, sectionConstants.VIDEO]}
                />

                {/* Video setup */}
                {sectionType === sectionConstants.VIDEO && (
                    <MakeSelect disabled={location === 'update' ? true : false}
                        disableValue={['bunny']}
                        title={'نوع مشغل الفيديو'} value={videoPlayer} setValue={setVideoPlayer}
                        options={[filePlayers.YOUTUBE, filePlayers.BUNNY]} /> //, filePlayers.BUNNY_UPLOAD, filePlayers.SERVER
                )}

                {sectionType === sectionConstants.VIDEO && videoPlayer && (
                    <>
                        {videoPlayer === filePlayers.YOUTUBE ?
                            <MakeForm status={status} inputs={youtubeInputs} onSubmit={onSubmit} />
                            : videoPlayer === filePlayers.BUNNY ?
                                <MakeForm status={status} inputs={bunnyInputs} onSubmit={onSubmit} />
                                : videoPlayer === filePlayers.BUNNY_UPLOAD ?
                                    <MakeForm status={status} inputs={bunnyUploadInputs} onSubmit={onSubmit} />
                                    :
                                    videoPlayer === filePlayers.SERVER &&
                                    <MakeForm status={status} inputs={videoServerInputs} onSubmit={onSubmit} />}
                    </>
                    // End of videos section
                )}

                {/* file Section */}
                {sectionType === sectionConstants.FILE && (
                    <MakeSelect disabled={location === 'update' ? true : false} title={'نوع مشغل PDF'} value={activeFilePlayer} setValue={setActiveFilePlayer}
                        options={[filePlayers.GOOGLE_DRIVE, filePlayers.SERVER]} />
                )}

                {sectionType === sectionConstants.FILE && activeFilePlayer && (
                    <>
                        {activeFilePlayer === filePlayers.SERVER ? (
                            <MakeForm status={status} inputs={fileServerInputs} onSubmit={onSubmit} />
                        ) : (
                            <MakeForm status={status} inputs={fileInputs} onSubmit={onSubmit} />
                        )}
                    </>
                )}

                {/* exam and link Sections */}
                {sectionType === sectionConstants.LINK ?
                    <MakeForm inputs={linkInputs} onSubmit={onSubmit} status={status} />
                    :
                    sectionType === sectionConstants.EXAM &&
                    sectionType === sectionConstants.EXAM &&
                    <BtnModal
                        close={close}
                        fullScreen allowBackClose={true}
                        btnName={location === 'update' ? "تعديل الاختبار" : 'إنشاء اختبار'}>
                        {location === 'update' ?
                            <ExamUpdatePage lecId={lecture._id} setLectures={setLectures} /> :
                            <ExamCreatePage setClose={setClose} courseIdVar={lecture.course} chapter={lecture.chapter} setLectures={setLectures} />}
                        {/* setClose={setClose} */}
                    </BtnModal>
                    // <Button
                    //     component={Link}
                    //     to={location === 'update' ? updateExamUrl : createExamBtnUrl}>
                    //     {location === 'update' ? "تعديل الاختبار" : 'انشاء اختبار'}
                    // </Button>
                }
            </FlexColumn>
        </Section>
    )
}

// : activeFilePlayer === 'bunny' ?
//     <MakeForm status={status} inputs={fileBunnyInputs} onSubmit={onSubmit} />
export default LectureForm
