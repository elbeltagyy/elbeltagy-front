import { Box, Button } from "@mui/material"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import DataWith3Items from "../ui/DataWith3Items"
import LectureAssetBtn from "./LectureAssetBtn"
import SectionIcon from "./SectionIcon"
import { useSearchParams } from "react-router-dom"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"
import CommunityPage from "../../pages/user/CommunityPage"

function LectureAssets({ lecture, currentLecture, currentCourse }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const assetId = searchParams.get('assetId')
    const removeAssetId = () => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)
            newParams.delete('assetId')
            return newParams
        })
    }

    const tabs = [
        {
            label: 'الملحقات',
            component: <FlexColumn sx={{ width: '100%', gap: '12px', mt: '16px' }}>
                <Button variant='contained' disabled={!assetId} onClick={removeAssetId}>فتح المحاضره الاولي {lecture.name}</Button>
                {lecture?.children?.map((asset, i) => {
                    return <DataWith3Items
                        action={<LectureAssetBtn asset={asset} />}
                        key={i}
                        title={asset.name} desc={asset.description}
                        icon={<SectionIcon lecture={asset} color='inherit' />}
                    />
                })}
            </FlexColumn>, isActive: lecture?.children?.length
        }, {
            label: 'اسئله الطلاب', component:
                <Box sx={{ mt: '16px', overflow: 'auto', maxHeight: '100vh', scrollbarGutter: 'stable' }}>
                    <CommunityPage
                        isShowCourses={false}
                        filters={{ lectures: lecture?._id, courses: 'all' }}
                        preCourse={currentCourse?._id} preLecture={lecture?._id}
                        forceMobile />,
                </Box>,
            isActive: lecture.isCommunity ?? false
        }, {
            label: 'ملخص المحاضره', component: <p
                style={{
                    whiteSpace: "pre-wrap",
                }}
            >
                {currentLecture.summary}
            </p>, isActive: currentLecture.summary ?? false
        },
    ]
    return (
        <TabsAutoStyled originalTabs={tabs} style={{ maxWidth: '550px' }} searchVal="lectureCommunity" />
    )
}

export default LectureAssets