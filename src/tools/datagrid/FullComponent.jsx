
import useLazyGetData from '../../hooks/useLazyGetData'
import MeDatagrid from './MeDatagrid'
import usePostData from '../../hooks/usePostData'
import Section from '../../style/mui/styled/Section'
import { useMemo, useState } from 'react'
import TabInfo from '../../components/ui/TabInfo'

const fallbackHook = () => [null, {}]

const sanitizeData = (data) => ({
    ...data,
    fetchFilters: data.fetchFilters || {},
    useFetch: data.useFetch || fallbackHook,
    useUpdate: data.useUpdate || fallbackHook,
    useDelete: data.useDelete || fallbackHook,
    useDeleteMany: data.useDeleteMany || fallbackHook
})


// const data = {
//     useFetch: useLazyGetAnswersQuery,
//     resKey: 'answers',
//     fetchFc,
//     useUpdate: useUpdateAnswerMutation,
//     useDelete: useRemoveAnswerMutation,
//     columns, reset, loading,fetchFilters,
//      viewFc, deleteFc, updateFc,
//      allStatuses
// }

function FullComponent({ data }) {

    const [count, setCount] = useState()
    const sanitizedData = useMemo(() => sanitizeData(data), [data])

    const [getData, { isLoading }] = sanitizedData.useFetch()
    const [getFc] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        if (!getFc) return { values: [], count: 0 }

        let res = await getFc({ ...params, ...sanitizedData.fetchFilters }, false) //, ...data.fetchParams
      
        if (sanitizedData.fetchFc) {
            // data.invoices = modified ==> give error in main compo
            res = sanitizedData.fetchFc(res)
        }
        const modified = { values: res[sanitizedData.resKey], count: res.count }
        setCount(modified.count)
        return modified
    }

    //Updated
    const [sendData, { isLoading: updateLoader = false }] = sanitizedData.useUpdate()
    const [sendUpdate] = usePostData(sendData)

    const updateFc = async (values) => {
        const user = await sendUpdate(values, data.isMultiPart || false)
        return { ...values, ...user }
    }

    //Delete
    const [sendDelete, { isLoading: deleteLoader = false }] = sanitizedData.useDelete()
    const [deleteData] = usePostData(sendDelete)

    const deleteFc = async (id) => {
        await deleteData({ _id: id })
    }

    const [sendDeleteMany, { isLoading: manyLoader = false }] = sanitizedData.useDeleteMany()
    const [deleteMany] = usePostData(sendDeleteMany)

    return (
        <Section>
            {sanitizedData.showCount && <TabInfo count={count} i={1} title={sanitizedData.showCount} />}

            <MeDatagrid
                reset={sanitizedData.reset} massActions={sanitizedData.massActions} allStatuses={sanitizedData.allStatuses}
                setSelection={sanitizedData.setSelection && sanitizedData.setSelection} 
                selections={sanitizedData.selections}
                type={'crud'} exportObj={sanitizedData.exportObj && sanitizedData.exportObj} exportTitle={sanitizedData.exportTitle}
                columns={sanitizedData.columns} addColumns={sanitizedData.addColumns}
                viewFc={sanitizedData.viewFc} fetchFc={fetchFc}
                ViewRow={sanitizedData.ViewRow}
                updateFc={sanitizedData.updateFc ? sanitizedData.updateFc : sendUpdate && updateFc}
                deleteFc={sanitizedData.deleteFc ? sanitizedData.deleteFc : deleteData && deleteFc}
                deleteMany={sendDeleteMany && deleteMany}

                loading={isLoading || updateLoader || deleteLoader || sanitizedData.loading || manyLoader || false}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: sanitizedData.exportObj && true
                    }
                }
            />
        </Section>
    )
}

export default FullComponent
