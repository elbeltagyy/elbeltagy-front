import { useEffect, useState } from "react"
import AutoCompleteFixed from "../../style/mui/styled/AutoCompleteFixed"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import { handelObjsOfArr } from "../../tools/fcs/MakeArray"
import CreateTag from "../tags/CreateTag"
import BtnModal from "../ui/BtnModal"
import { useLazyGetTagsQuery } from "../../toolkit/apis/tagsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import useGrades from "../../hooks/useGrades"
 

function AdminTagQs({ filterTags, setFilterTags, setGrade, grade, setReset, reset, setActiveTag }) {// grade, 

    const {grades} = useGrades()

    const [tags, setTags] = useState([])

    const [getTags, { isLoading: tagsLoader }] = useLazyGetTagsQuery()
    const [getTagsFc] = useLazyGetData(getTags)

    useEffect(() => {
        const trigger = async () => {
            const res = await getTagsFc({ grade })
            setTags(res.tags) // as Options
        }

        trigger()
    }, [reset, grade])

    useEffect(() => {
        if (filterTags.length) {
            const tag = tags.find(t => t._id === filterTags[0])
            setActiveTag(tag)
        } else {
            setActiveTag()
        }

    }, [filterTags])

    return (
        <FlexRow gap={'12px'}>
            <AutoCompleteFixed
                sx={{ maxWidth: '350px' }}
                variant={'filled'}
                value={grade}
                multiple={false} setValue={setGrade}
                options={handelObjsOfArr(grades, { label: 'name', id: 'index' })} label={'الصفوف الدراسيه'} />

            <AutoCompleteFixed
                sx={{ maxWidth: '350px' }}
                variant={'filled'}
                reset={[grade]} isLoading={tagsLoader}
                multiple
                value={filterTags} setValue={setFilterTags}
                options={handelObjsOfArr(tags, { label: 'name', id: '_id' })} label={'الروابط/ الدروس'} />

            <BtnModal
                fullWidth={true} btnName={' إنشاء رابط' + ' ' + (grade ? ('للصف ' + grades.find(g => g.index === grade)?.name) : '')}
                component={<CreateTag setReset={setReset} defaultGrade={grade} />}
                size='medium' isFilledHover={true} />
        </FlexRow>
    )
}

export default AdminTagQs
