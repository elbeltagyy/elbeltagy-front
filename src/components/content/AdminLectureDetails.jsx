import { FlexRow } from '../../style/mui/styled/Flexbox'
import TabInfo from '../ui/TabInfo'
import { lang } from '../../settings/constants/arlang'
import InfoText from '../ui/InfoText'
import BtnModal from '../ui/BtnModal'
import MakeForm from '../../tools/makeform/MakeForm'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { Link as LinkMui } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import sectionConstants from '../../settings/constants/sectionConstants'
import { user_roles } from '../../settings/constants/roles'

function AdminLectureDetails({ isNativeLecture, lecture, changeStatus, isLoading, courseId }) {
    const navigate = useNavigate()
    return (
        <FlexRow gap={'8px'}>
            {!isNativeLecture && (
                <div>
                    <TabInfo count={lecture.course.name} title={'مربوط بكورس : '} isBold={false} i={1} />
                </div>
            )}
            <TabInfo count={lecture.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} i={lecture.isActive ? 1 : 3} />
            {isNativeLecture && (
                <>
                    <InfoText label={'الوصف'} description={lecture.description} />
                    <FlexRow>
                        <InfoText label={'سعر المحاضره'} description={lecture.price + ' ' + 'جنيه'} />
                        <BtnModal
                            btn={<TabInfo sx={{ cursor: 'pointer', margin: '0 8px' }} count={'اضغط لتعديل السعر'} i={2} />}
                            component={<MakeForm inputs={[
                                { name: 'price', label: 'السعر الجديد', type: 'number' }
                            ]} onSubmit={changeStatus} status={{ isLoading }} formDirection={'row'} btnStyle={{ width: 'fit-content' }} />}
                        />
                        <SwitchStyled label={"قابله للبيع"} checked={lecture.isSalable} onChange={(value) => changeStatus({ isSalable: value })} isLoading={isLoading} />
                    </FlexRow>

                    <SwitchStyled label={"الحاله"} checked={lecture.isActive} onChange={(value) => changeStatus({ isActive: value })} isLoading={isLoading} />
                    <SwitchStyled label={"جعل المحاضره مجانيه"} checked={lecture.isFree} onChange={(val) => changeStatus({ isFree: val })} isLoading={isLoading} />

                    <div>
                        <LinkMui href={"/management/codes?lecture=" + lecture._id} underline="hover" mr={'auto'} onClick={(e) => {
                            e.preventDefault()
                            navigate("/management/codes?lecture=" + lecture._id)
                        }}>
                            اكواد المحاضره
                        </LinkMui>
                    </div>

                    {/* <Separator sx={{ my: '4px', borderWidth: '1px' }} /> */}
                    {/* <Typography sx={{ width: '100%', textAlign: 'center', textDecoration: 'underline' }} variant='subtitle2'>خاص بطلاب السنتر</Typography> */}
                    <SwitchStyled label={"تفعيله لطلاب السنتر"} checked={lecture.isCenter} onChange={(val) => changeStatus({ isCenter: val })} isLoading={isLoading} />

                    {lecture.sectionType === sectionConstants.EXAM && (
                        <div>
                            <LinkMui href={'/management/attempts?courseId=' + courseId + '&lectureId=' + lecture._id + '&attemptRole=' + user_roles.STUDENT}
                                underline="hover" onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/management/attempts?courseId=' + courseId + '&lectureId=' + lecture._id + '&attemptRole=' + user_roles.STUDENT)
                                }}>
                                احصائيات طلاب السنتر
                            </LinkMui>
                        </div>
                    )}

                    {lecture.sectionType === sectionConstants.VIDEO && (
                        <div>
                            <LinkMui href={'/statistics/views?role=' + user_roles.STUDENT + '&course=' + courseId + '&lecture=' + lecture._id}
                                underline="hover" onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/statistics/views?role=' + user_roles.STUDENT + '&course=' + courseId + '&lecture=' + lecture._id)
                                }}>
                                احصائيات طلاب السنتر
                            </LinkMui>
                        </div>
                    )}
                </>
            )}
        </FlexRow>
    )
}

export default AdminLectureDetails
