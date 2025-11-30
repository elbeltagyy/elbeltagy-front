
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { lang } from '../../settings/constants/arlang'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'


import TabInfo from '../ui/TabInfo'


import BtnModal from '../ui/BtnModal'

import { FaMinus, FaPlus, FaUsers } from "react-icons/fa";
import { useDeleteTagMutation, useLazyGetTagsQuery, useLinkTagMutation, useUnLinkTagMutation, useUpdateTagMutation } from '../../toolkit/apis/tagsApi'
import Section from '../../style/mui/styled/Section'
import CreateTag from './CreateTag'
import { useMemo, useState } from 'react'
import AdminGetQuestions from '../questions/AdminGetQuestions'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { IconButton } from '@mui/material'
import BtnConfirm from '../ui/BtnConfirm'

import GetCoupons from '../coupons/GetCoupons'
import Users from '../all/Users'
import { useAddToUserMutation } from '../../toolkit/apis/usersApi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import useGrades from '../../hooks/useGrades'


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

function GetTags({ filters = {}, setSelectedTags, preReset = [], addColumns, disabledActions = {}, disableAllActions, colsIgnored = [], isShowCreate = true, defaultGrade }) {
    const [reset, setReset] = useState(false)
    const { grades } = useGrades()

    const [getData, status] = useLazyGetTagsQuery()
    const [getTags] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getTags({ ...params, ...filters }, false)
        const data = { values: res.tags, count: res.count }
        return data
    }

    const [sendUpdate, updateStatus] = useUpdateTagMutation()
    const [updateTag] = usePostData(sendUpdate)

    const updateFc = async (data) => {
        await updateTag({ id: data._id, ...data })
        return data
    }

    //removing subscription
    const [sendData, sendStatus] = useDeleteTagMutation()
    const [deleteTag] = usePostData(sendData)
    const removeFc = async (id) => {
        await deleteTag({ _id: id })
    }


    //Linking
    const [chosenQs, setChosenQs] = useState([])

    const [linkQuestions, linkStatus] = useLinkTagMutation()
    const [linkTag] = usePostData(linkQuestions)

    //UnLinking
    const [unLinkedQs, setUnLinkedQs] = useState([])

    const [unLinkQs, unLinkStatus] = useUnLinkTagMutation()
    const [unLinkTag] = usePostData(unLinkQs)


    const [sendAdd, sendAddStatus] = useAddToUserMutation()
    const [addToUser] = usePostData(sendAdd)
    const manageUser = async (v) => {
        await addToUser(v)
        setReset(pre => !pre)
    }
    const statuses = [
        sendStatus, linkStatus, unLinkStatus, sendAddStatus
    ]

    const columns = [
        {
            field: "name",
            headerName: 'اسم الرابط',
            width: 200,
            editable: true
        }, {
            field: "description",
            headerName: 'وصف الرابط',
            width: 200,
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            editable: true,
            valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        }, {
            field: "price",
            headerName: 'سعر الرابط',
            type: 'number',
            editable: true,
        }, {
            field: "isFree",
            headerName: 'مجانى ؟',
            width: 200,
            type: 'boolean',
            isSwitch: true,
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
            field: 'questions',
            headerName: 'الاسئله المضافه',
            width: 150,
            type: 'actions',
            disableExport: true,
            renderCell: (params) => {

                const unLinkFc = async (questionId = null) => {
                    // console.log(unLinkedQs)
                    await unLinkTag({ questions: questionId ? [questionId] : unLinkedQs, _id: params.row._id })
                    setUnLinkedQs([])
                    setReset(!reset)
                }


                const addColumns = {
                    field: 'ulink',
                    type: 'actions',
                    getActions: (params) => {
                        return [
                            <BtnConfirm
                                key={0}
                                modalInfo={{
                                    desc: 'سيتم ازاله هذا السؤال من الرابط'
                                }}
                                btn={<IconButton color='error' onClick={() => unLinkFc(params?.row._id)}>
                                    <FaMinus></FaMinus>
                                </IconButton>}
                            />
                        ]
                    }
                }
                return <BtnModal
                    btnName={'عرض الاسئله'}
                    fullScreen={true}
                    titleInSection={'اسئله : ' + params.row.name}
                    component={<FlexColumn>
                        <AdminGetQuestions
                            disableAllActions={true} addColumns={addColumns}
                            colsIgnored={['tags', 'notTags']}
                            setSelectedQs={setUnLinkedQs}
                            filters={{ tags: params.row._id }}
                            isShowCreate={false}
                            preReset={[reset]}
                        />

                        {unLinkedQs?.length > 0 && (
                            <FilledHoverBtn onClick={() => unLinkFc()}>
                                ازاله {unLinkedQs.length} اسئله
                            </FilledHoverBtn>
                        )}
                    </FlexColumn>}
                    icon={<FaUsers size={'1.2rem'} />} />
            }
        }, {
            field: 'notQuestions',
            headerName: 'ايضافه اسئله',
            width: 150,
            type: 'actions',
            disableExport: true,
            renderCell: (params) => {

                const linkFc = async (question = null) => {
                    await linkTag({ questions: question ? [question] : chosenQs, _id: params.row._id })
                    setChosenQs([])
                    setReset(!reset)
                }

                const addColumns = {
                    field: 'link',
                    type: 'actions',
                    getActions: (params) => {
                        return [
                            <BtnConfirm
                                key={0}
                                modalInfo={{
                                    desc: 'سيتم اضافه هذا السؤال الي الرابط'
                                }}
                                btn={<IconButton color='success' onClick={() => linkFc(params?.row._id)}>
                                    <FaPlus></FaPlus>
                                </IconButton>}
                            />
                        ]
                    }
                }

                return <BtnModal
                    btnName={'الغير مضافه'}
                    color={'error'}
                    fullScreen={true}
                    titleInSection={'ايضافه الي : ' + params.row.name}
                    component={<FlexColumn>
                        <AdminGetQuestions
                            addColumns={addColumns} disableAllActions={true}
                            colsIgnored={['tags', 'notTags']}
                            setSelectedQs={setChosenQs}
                            filters={{ tags: '!=_split_' + params.row._id, grade: params.row.grade }}
                            isShowCreate={false}
                            preReset={[reset]}
                        />

                        {chosenQs.length > 0 && (
                            <FilledHoverBtn onClick={() => linkFc()}>
                                ربط الرابط ب {chosenQs.length} اسئله
                            </FilledHoverBtn>
                        )}
                    </FlexColumn>}
                    icon={<FaUsers size={'1.2rem'} />} />
            }
        }, {
            field: 'updatedAt',
            headerName: 'تاريخ اخر تعديل ',
            width: 200,
            valueGetter: value => new Date(value),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.updatedAt)} i={2} />
            }
        }, {
            field: 'coupons',
            headerName: 'coupons',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                return <BtnModal
                    titleInSection={"كوبونات الرابط" + ' ' + params.row.name}
                    component={<GetCoupons tag={params.row._id}
                        createBtnName={'انشاء كوبون للرابط ' + params.row.name}
                    />}
                    fullScreen={true}
                    btnName={'كوبونات الرابط'}
                />
            }
        }, {
            field: 'users',
            headerName: 'المشتركون',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                const tag = params.row
                return <BtnModal
                    btnName={'الطلاب المشتركون'}
                    titleInSection={"الطلاب المشتركون فى الرابط " + ' ' + params.row.name}
                    component={<Users
                        reset={reset}
                        allStatuses={statuses}
                        deleteFc={(userId) => {
                            manageUser({
                                id: userId, field: 'tags', value: tag._id, action: 'pull'
                            })
                        }}
                        massActions={
                            [
                                {
                                    label: 'ازاله الطلاب',
                                    onClick: (users) => manageUser({
                                        field: 'tags', value: tag._id, ids: users, action: 'pull'
                                    })
                                }
                            ]}

                        filters={{
                            tags: tag._id
                        }}
                    />}
                />
            }
        }, {
            field: 'notUsers',
            headerName: 'الغير مشتركون',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                const tag = params.row
                return <BtnModal
                    btnName={'الغير مشتركون'}
                    color={'error'}
                    titleInSection={"الطلاب الغير مشتركون فى الرابط " + ' ' + tag.name}
                    component={<Users
                        allStatuses={statuses}
                        reset={reset}
                        massActions={[{
                            label: 'ايضافه المستخدمين الي الرابط ' + tag.name,
                            onClick: (chosenUsers) => manageUser({
                                field: 'tags', ids: chosenUsers, value: tag._id
                            })
                        }]}
                        addColumns={[{
                            field: 'add',
                            headerName: 'ازاله الطالب',
                            type: 'actions',
                            getActions: (userParams) => {
                                return [
                                    <BtnConfirm
                                        modalInfo={{
                                            desc: 'سيتم اضافه هذا الطالب الي الرابط'
                                        }}
                                        btn={<IconButton color='success'
                                            onClick={() => manageUser({
                                                field: 'tags', value: tag._id, id: userParams.row._id
                                            })}>
                                            <IoIosAddCircleOutline></IoIosAddCircleOutline>
                                        </IconButton>} key={0} />
                                ]
                            }
                        }]}

                        filters={{
                            tags: '!=_split_' + tag._id, grade: tag.grade
                        }}
                    />}
                />
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            type: "date",
            valueGetter: value => new Date(value),
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        }
    ]
    // Filter out columns whose `field` is in `colsIgnored`
    const modifiedCols = useMemo(() => {
        if (colsIgnored?.length > 0) {
            return columns.filter(col => !colsIgnored.includes(col.field));
        } else {
            return columns
        }
    }, [colsIgnored])

    return (
        <Section>
            {isShowCreate && (
                <BtnModal fullWidth={true} btnName={'انشاء رابط'} component={<CreateTag setReset={setReset} defaultGrade={defaultGrade} />} size='medium' isFilledHover={true} />
            )}

            <MeDatagrid
                type={'crud'}
                reset={[reset, ...preReset]}
                exportObj={exportObj} exportTitle={'الروابط'}
                columns={modifiedCols} addColumns={addColumns}
                // loading={status.isLoading || updateStatus.isLoading || isLoading}
                allStatuses={statuses}
                fetchFc={fetchFc}
                updateFc={updateFc} deleteFc={removeFc}
                disableAllActions={disableAllActions} disabledActions={disabledActions}
                setSelection={setSelectedTags}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
        </Section>
    )
}

export default GetTags
