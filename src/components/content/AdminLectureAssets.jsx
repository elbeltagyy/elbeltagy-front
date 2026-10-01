import { Alert } from "@mui/material"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import Section from "../../style/mui/styled/Section"
import TitleWithDividers from "../ui/TitleWithDividers"

import BtnModal from "../ui/BtnModal"
import { OutLinedHoverBtn } from "../../style/buttonsStyles"
import { lang } from "../../settings/constants/arlang"
import LectureCreate from "./LectureCreate"
import LectureDnd from "./LectureDnd"
import { useCallback } from "react"

function AdminLectureAssets({ lecture, setLectures, courseId }) {
    const assets = lecture.children || []

    // Same call signature as a normal useState setter (accepts a value
    // or an updater function), but scoped to this lecture's children.
    const setAssets = useCallback((update) => {
        setLectures(lectures => lectures.map(lec => {
            if (lec._id !== lecture._id) return lec
            const currentChildren = lec.children || []
            const newChildren = typeof update === 'function'
                ? update(currentChildren)
                : update
            return { ...lec, children: newChildren }
        }))
    }, [lecture._id, setLectures])

    return (
        <Section>
            <TitleWithDividers title={'ملحقات المحاضره: ' + lecture.name} />
            <FlexColumn gap={'16px'}>
                <BtnModal
                    btn={<OutLinedHoverBtn sx={{ m: '16px auto', width: '100%' }}>
                        {lang.ADD_LECTURE}
                    </OutLinedHoverBtn>}
                    component={<LectureCreate
                        setLectures={setAssets}
                        parent={lecture._id}
                        grade={lecture.grade}
                    />}
                />
                {assets.map((asset, i) => (
                    <LectureDnd
                        key={asset._id}
                        lecture={asset}
                        allowEdit
                        i={i}
                        courseId={courseId}
                        setLectures={setAssets}
                    />
                ))}
                {assets.length === 0 && <Alert severity="warning">لا يوجد ملحقات لهذه المحاضره</Alert>}
            </FlexColumn>
        </Section>
    )
}

export default AdminLectureAssets