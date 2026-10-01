
import { useNavigate, useParams } from 'react-router-dom';

import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import LectureBody from '../../components/grades/LectureBody';
import { useLazyGetLectureForCenterQuery } from '../../toolkit/apis/lecturesApi';
import Section from '../../style/mui/styled/Section';
import { FlexColumn } from '../../style/mui/styled/Flexbox';
import { FilledHoverBtn } from '../../style/buttonsStyles';
import useLazyGetData from '../../hooks/useLazyGetData';
import { useEffect, useState } from 'react';
import LectureAssets from '../../components/content/LectureAssets';
import useCurrentAsset from '../../hooks/useCurrentLecture';
import Grid from '../../style/vanilla/Grid';

function LectureCenterPage() {

    const navigate = useNavigate()
    const params = useParams()
    const [getData] = useLazyGetLectureForCenterQuery()
    const [getLecture] = useLazyGetData(getData)

    const [lecture, setLecture] = useState()
    const trigger = async () => {
        const res = await getLecture({ id: params.lectureId })
        setLecture(res)
    }

    useEffect(() => {
        if (!lecture) {
            trigger()
        }
    }, [lecture])

    const currentLecture = useCurrentAsset(lecture)

    if (!lecture) return <LoaderSkeleton />

    return (
        <Section>
            <FlexColumn sx={{ backgroundColor: 'background.alt', p: '16px', gap: '12px' }}>
                <Grid>
                    <LectureBody lecture={currentLecture} />
                    <LectureAssets lecture={lecture} currentLecture={currentLecture} />
                </Grid>

                <FilledHoverBtn onClick={() => navigate(-1)}>رجوع</FilledHoverBtn>
            </FlexColumn>
        </Section>
    )
}

export default LectureCenterPage
