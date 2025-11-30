import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import usePostData from '../../hooks/usePostData'

import UserAvatar from '../users/UserAvatar'
import { useDeleteQuestionMutation, useLazyGetQuestionsQuery, useLinkQuestionToTagsMutation, useUnlinkQuestionToTagsMutation, useUpdateQuestionMutation } from '../../toolkit/apis/questionsApi'
import CreateQuestion from './CreateQuestions'
import BtnModal from '../ui/BtnModal'
import { useMemo, useState } from 'react'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import UpdateQuestion from './UpdateQuestion'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import GetTags from '../tags/GetTags'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FaMinus, FaPlus, FaTags } from "react-icons/fa";
import { TbTagsOff } from "react-icons/tb";
import Loader from '../../style/mui/loaders/Loader'
import TabInfo from '../ui/TabInfo'
import { IconButton } from '@mui/material'
import BtnConfirm from '../ui/BtnConfirm'
import useGrades from '../../hooks/useGrades'
import AdminTagQs from './AdminTagQs'

const exportObj = (grades) => ({
    grade: (row) => {
        return grades.find(grade => grade.index === row.grade)?.name
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    updatedAt: (row) => {
        return getDateWithTime(row.updatedAt)
    }
})


function AdminGetQuestions({ setSelectedQs, allSelected = false, filters = {}, isShowCreate = true, colsIgnored = [], addColumns = [], disableAllActions = false, preReset = [], isShowHeader = false }) {
    const { grades } = useGrades()

    const [reset, setReset] = useState(false)

    const [getData, status] = useLazyGetQuestionsQuery()
    const [getQuestions] = useLazyGetData(getData)

    //removing subscription
    const [sendDelete, { isLoading }] = useDeleteQuestionMutation()
    const [deleteQuestion] = usePostData(sendDelete)

    const deleteFc = async (id) => {
        await deleteQuestion({ _id: id })
    }

    const [sendUpdate, updateStatus] = useUpdateQuestionMutation()
    const [updateQuestion] = usePostData(sendUpdate)

    const updateFc = async (data) => {
        await updateQuestion({ id: data._id, ...data })
        return data
    }
    const [filterTags, setFilterTags] = useState([])
    const [grade, setGrade] = useState()

    const fetchFc = async (params) => {
        const filterByTags = filterTags.length ? filterTags : filters?.tags || []
        const res = await getQuestions({ ...params, ...filters, tags: filterByTags }, false)
        const data = { values: res.questions, count: res.count }
        return data
    }


    //Linking
    const [chosenTags, setChosenTags] = useState([])

    const [linkQuestion, linkStatus] = useLinkQuestionToTagsMutation()
    const [linkToTags] = usePostData(linkQuestion)

    //UnLinking
    const [unLinkedTags, setUnLinkedTags] = useState([])

    const [unLinkQs, unLinkStatus] = useUnlinkQuestionToTagsMutation()
    const [UnLinksTags] = usePostData(unLinkQs)

    const columns = [
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.image?.url} />
            }
        },
        {
            field: 'title',
            headerName: 'عنوان السؤال',
            width: 200,
            editable: true
        }, {
            field: 'hints',
            headerName: "ملاحظات",
            width: 150,
            editable: true
        }, {
            field: 'points',
            headerName: "النقاط",
            type: 'number',
            width: 150,
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            editable: true,
            filterable: true,
            valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                                : <TabInfo count={lang.NOT_ACTIVE} i={3} />
                        }
                    </>
                )
            }
        }, {
            field: 'tags',
            headerName: 'الروابط',
            width: 150,
            type: "actions",
            disableExport: true,

            renderCell: (params) => {
                let tagsIds = params.row.tags || []
                if (params.row?.tags?.length === 0 || !params.row?.tags?.length) {
                    tagsIds = 'emptyArray'
                }
                const unLinkFc = async (tag = null) => {
                    await UnLinksTags({ tags: tag ? [tag] : unLinkedTags, _id: params.row._id })
                    setUnLinkedTags([])
                    setReset(!reset)
                }

                const addColumns = {
                    field: 'someFcs',
                    type: 'actions',
                    getActions: (params) => {
                        return [
                            <BtnConfirm
                                modalInfo={{
                                    desc: 'سيتم ازاله هذا الرابط من السؤال'
                                }}
                                btn={<IconButton color='error' onClick={() => unLinkFc(params?.row?._id)}>
                                    <FaMinus></FaMinus>
                                </IconButton>} key={0} />
                        ]
                    }
                }

                return <BtnModal
                    btnName={'عرض الروابط'}
                    icon={<FaTags />}
                    color={'success'}
                    fullScreen={true}
                    titleInSection={'روابط السؤال : ' + params.row.title}
                    component={<FlexColumn>
                        <GetTags
                            addColumns={addColumns}
                            disableAllActions={true}
                            colsIgnored={['questions', 'notQuestions']}
                            preReset={[params.row?.tags]}
                            filters={{ _id: tagsIds }}
                            setSelectedTags={setUnLinkedTags} isShowCreate={false}
                        />

                        {unLinkedTags.length > 0 && (
                            <BtnConfirm
                                btn={<FilledHoverBtn onClick={() => unLinkFc()} disabled={unLinkStatus.isLoading}>
                                    {unLinkStatus.isLoading ? <Loader /> : `ازاله ${unLinkedTags.length} روابط`}
                                </FilledHoverBtn>} />
                        )}
                    </FlexColumn>} //, grade: params.row.grade
                />
            }
        }, {
            field: 'notTags',
            type: "actions",
            headerName: 'ايضافه رابط',
            disableExport: true,

            width: 200,
            renderCell: (params) => {
                const modifiedTags = params.row.tags?.map((tag) => {
                    return '!=_split_' + tag
                })
                const linkFc = async (tag = null) => {
                    await linkToTags({ tags: tag || chosenTags, _id: params.row._id })
                    setChosenTags([])
                    setReset(!reset)
                }

                const addColumns = {
                    field: 'someFcs',
                    type: 'actions',
                    getActions: (params) => {
                        return [
                            <BtnConfirm
                                modalInfo={{
                                    desc: 'سيتم اضافه هذا الرابط الي السؤال'
                                }}
                                btn={<IconButton color='success' onClick={() => linkFc(params?.row?._id)}>
                                    <FaPlus></FaPlus>
                                </IconButton>} key={0} />
                        ]
                    }
                }


                return <BtnModal
                    btnName={'روابط غير مضافه'}
                    color={'error'}
                    icon={<TbTagsOff />}
                    fullScreen={true}
                    titleInSection={'ربط السؤال: ' + params.row.title}
                    component={<FlexColumn>
                        <GetTags
                            disableAllActions={true} addColumns={addColumns}
                            defaultGrade={params.row.grade}
                            colsIgnored={['questions', 'notQuestions']}
                            preReset={[params.row.tags]} filters={{ _id: modifiedTags, grade: params.row.grade }}
                            setSelectedTags={setChosenTags} isShowCreate={true}
                        />
                        {chosenTags.length > 0 && (
                            <BtnConfirm
                                btn={<FilledHoverBtn onClick={() => linkFc()} disabled={linkStatus.isLoading}>
                                    {linkStatus.isLoading ? <Loader /> : `ربط السؤال ب ${chosenTags.length} روابط`}
                                </FilledHoverBtn>}
                            />

                        )}
                    </FlexColumn>} //, grade: params.row.grade
                />
            }
        }, {
            field: 'createdAt',
            headerName: "تاريخ الانشاء",
            type: 'date',
            width: 150,
            valueGetter: (createdAt) => new Date(createdAt)
        },
    ]

    const [viewData, setViewData] = useState()
    const [open, setOpen] = useState(false)
    const viewFc = (data) => {
        setViewData(data)
        setOpen(true)
    }

    // Filter out columns whose `field` is in `colsIgnored`
    const modifiedCols = useMemo(() => {
        if (colsIgnored?.length > 0) {
            return columns.filter(col => !colsIgnored.includes(col.field));
        } else {
            return columns
        }
    }, [colsIgnored])
    const [activeTag, setActiveTag] = useState()

    return (
        <Section>
            {isShowHeader && (
                <AdminTagQs
                    filterTags={filterTags}
                    setFilterTags={setFilterTags}
                    grade={grade} setGrade={setGrade}
                    setReset={setReset}
                    reset={reset} setActiveTag={setActiveTag}
                />
            )}

            {isShowCreate && (
                <BtnModal btnName={'انشاء سؤال' + ' ' + (activeTag ? activeTag.name : '')}
                    component={<CreateQuestion defaultQuestion={{
                        grade: activeTag?.grade ?? grade, tags: activeTag
                    }} setReset={setReset} />}
                    size='medium' isFilledHover={true} />
            )}

            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'تفاصيل المشاهدات'}
                columns={modifiedCols} addColumns={addColumns} disableAllActions={disableAllActions}
                reset={[reset, ...preReset, filterTags]}
                loading={status.isLoading || updateStatus.isLoading || isLoading}
                fetchFc={fetchFc}
                deleteFc={deleteFc} updateFc={updateFc} viewFc={viewFc}
                setSelection={setSelectedQs} allSelected={allSelected}

                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
            <ModalStyled open={open} setOpen={setOpen}>
                <UpdateQuestion question={viewData} setReset={setReset} />
            </ModalStyled>
        </Section>
    )
}

export default AdminGetQuestions
