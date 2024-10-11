import React, { useEffect, useState } from 'react'
import { lang } from '../../settings/constants/arlang'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { AiFillPoundCircle } from 'react-icons/ai'
import { VscSymbolBoolean } from 'react-icons/vsc'
import MakeForm from '../../tools/makeform/MakeForm'
import { useCreateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'

import Section from "../../style/mui/styled/Section"
import * as Yup from "yup"
import { Box, Button, Switch, Typography } from '@mui/material'
import { useField } from 'formik'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import sectionConstants from '../../settings/constants/sectionConstants'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import TitleWithDividers from '../ui/TitleWithDividers'
import { Link } from 'react-router-dom'
import videoPlayers from '../../settings/constants/videoPlayers'
import MakeInput from '../../tools/makeform/MakeInput'
import { formatDuration } from '../../settings/constants/dateConstants'
import filePlayers from '../../settings/constants/filePlayers'


const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/;
const durationRegex = /^(?:(?:\d+)\s*[hms]?)(?:\s+(?:(?:\d+)\s*[hms]))*$/;
const bunnyIframeRegex = /^https:\/\/iframe\.mediadelivery\.net\/.+/;

function LectureForm({ grade, course, onSubmit, lecture, status, location }) {

    const [sectionType, setSectionType] = useState(lecture?.sectionType)
    const [videoPlayer, setVideoPlayer] = useState(lecture?.video?.player)
    const [activeFilePlayer, setActiveFilePlayer] = useState(lecture?.file?.player)

    const lectureInfoInputs = [
        {
            name: 'sectionType',
            label: '',
            value: sectionType,
            hidden: true,
        }, {
            name: 'grade',
            label: '',
            value: lecture?.grade ?? grade,
            hidden: true,
        }, {
            name: 'course',
            label: '',
            value: lecture?.course ?? course,
            hidden: true,
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
            value: lecture?.name || ''
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 11,
            value: lecture?.description || ''
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'switch',
            value: lecture?.isActive ?? true,
        }
    ]

    // ######################### manage videos #########################
    //lecture? with youtube video
    const youtubeInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            label: 'المشغل',
            disabled: true,
            value: videoPlayers.YOUTUBE
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
        }
    ]

    //lecture? with bunny url
    const bunnyInputs = [
        ...lectureInfoInputs,
        {
            name: 'player',
            label: 'المشغل',
            disabled: true,
            value: videoPlayers.BUNNY
        }, {
            name: 'url',
            label: 'الصق url',
            type: 'url',
            player: 'iframe',
            value: lecture?.video?.url
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
            value: videoPlayer,
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
            value: videoPlayer,
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
        value: filePlayers.URL,
        disabled: true,
        label: 'المشغل',

    }, {
        name: 'url',
        label: 'url',
        type: 'url',
        player: 'iframe',
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
                    const fileType = value.type; // Get the MIME type of the file
                    return fileType === 'application/pdf'; // Check if it's a PDF
                })
                .test('fileSize', 'File size is too large', (value) => {
                    if (!value) return false; // If no file, return false
                    return value.size <= 100 * 1024 * 1024; // Check if file size is less than or equal to 10MB
                })
        }
    ]

    //file bunny
    const fileBunnyInputs = [...lectureInfoInputs,
    {
        name: 'player',
        label: 'نوع المشغل',
        value: activeFilePlayer,
        disabled: true
    }, {
        name: 'video',
        label: 'اختر file',
        type: 'file',
        value: lecture?.file,
    }
    ]

    const createExamBtnUrl = '/management/courses/' + course + '/exams/create'
    const updateExamUrl = '/management/courses/' + lecture?.course + '/exams/' + lecture?._id + '/edit'

    return (
        <Section>
            <TitleWithDividers title={'اختر القسم المناسب'} />
            <FlexColumn gap={'10px'}>

                <MakeSelect title={'اختر القسم المناسب'} value={sectionType} setValue={setSectionType}
                    options={[sectionConstants.EXAM, sectionConstants.FILE, sectionConstants.LINK, sectionConstants.VIDEO]}
                />

                {/* Video setup */}
                {sectionType === sectionConstants.VIDEO && (
                    <MakeSelect title={'نوع مشغل الفيديو'} value={videoPlayer} setValue={setVideoPlayer}
                        options={[videoPlayers.YOUTUBE, videoPlayers.BUNNY, videoPlayers.BUNNY_UPLOAD, videoPlayers.SERVER]} />
                )}
                {sectionType === sectionConstants.VIDEO && videoPlayer && (
                    <>
                        {videoPlayer === videoPlayers.YOUTUBE ?
                            <MakeForm status={status} inputs={youtubeInputs} onSubmit={onSubmit} />
                            : videoPlayer === videoPlayers.BUNNY ?
                                <MakeForm status={status} inputs={bunnyInputs} onSubmit={onSubmit} />
                                : videoPlayer === videoPlayers.BUNNY_UPLOAD ?
                                    <MakeForm status={status} inputs={bunnyUploadInputs} onSubmit={onSubmit} />
                                    :
                                    videoPlayer === videoPlayers.SERVER &&
                                    <MakeForm status={status} inputs={videoServerInputs} onSubmit={onSubmit} />}
                    </>
                    // End of videos section
                )}

                {/* file Section */}
                {sectionType === sectionConstants.FILE && (
                    <MakeSelect title={'نوع مشغل PDF'} value={activeFilePlayer} setValue={setActiveFilePlayer}
                        options={[filePlayers.URL, filePlayers.SERVER, 'bunny']} />
                )}

                {sectionType === sectionConstants.FILE && activeFilePlayer && (
                    <>
                        {activeFilePlayer === filePlayers.SERVER ? (
                            <MakeForm status={status} inputs={fileServerInputs} onSubmit={onSubmit} />
                        ) : activeFilePlayer === 'bunny' ?
                            <MakeForm status={status} inputs={fileBunnyInputs} onSubmit={onSubmit} />
                            : (
                                <MakeForm status={status} inputs={fileInputs} onSubmit={onSubmit} />
                            )}
                    </>
                )}

                {/* exam and link Sections */}
                {sectionType === sectionConstants.LINK ?
                    <MakeForm inputs={linkInputs} onSubmit={onSubmit} status={status} />
                    :
                    sectionType === sectionConstants.EXAM &&
                    <Button
                        component={Link}
                        to={location === 'update' ? updateExamUrl : createExamBtnUrl}>
                        {location === 'update' ? "تعديل الاختبار" : 'انشاء اختبار'}
                    </Button>
                }
            </FlexColumn>
        </Section>
    )
}

export default LectureForm
