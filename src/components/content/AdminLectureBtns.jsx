import { BiSolidShow } from "react-icons/bi"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import BtnModal from "../ui/BtnModal"
import LectureUpdate from "./LectureUpdate"
import { FilledHoverBtn, OutLinedHoverBtn } from "../../style/buttonsStyles"
import sectionConstants from "../../settings/constants/sectionConstants"
import { Link } from "react-router-dom"
import { lang } from "../../settings/constants/arlang"
import { FcStatistics } from "react-icons/fc"
import { Button, IconButton } from "@mui/material"
import Loader from "../../style/mui/loaders/Loader"
import { MdDelete } from "react-icons/md"
import { red } from "@mui/material/colors"
import BtnConfirm from "../ui/BtnConfirm"
import Section from "../../style/mui/styled/Section"
import ChangeLectureChapter from "../chapters/ChangeLectureChapter"

function AdminLectureBtns({ isNativeLecture, lecture, setLectures, isLoading, courseId, triggerDelete, chapters, changeLectureChapter, changeChapterStatus }) {

    return (
        <FlexRow gap={'12px'}>
            {isNativeLecture && (
                <BtnModal
                    component={<Section>
                        <ChangeLectureChapter chapters={chapters} lecture={lecture} changeLectureChapter={changeLectureChapter} status={changeChapterStatus} />
                    </Section>}
                    btn={<Button color="error" size="small" endIcon={<BiSolidShow />} disabled={isLoading}>
                        تغيير الفصل
                    </Button>} />
            )}

            {isNativeLecture && (
                <BtnModal
                    component={<LectureUpdate lecture={lecture} setLectures={setLectures} />}
                    btn={<FilledHoverBtn endIcon={<BiSolidShow />} disabled={isLoading}>
                        عرض التفاصيل
                    </FilledHoverBtn>} />
            )}

            {lecture.sectionType === sectionConstants.EXAM && (
                <OutLinedHoverBtn
                    colorm='orange'
                    component={Link} to={'/management/attempts?courseId=' + courseId + '&lectureId=' + lecture._id}
                    endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
            )}

            {lecture.sectionType === sectionConstants.VIDEO && (
                <OutLinedHoverBtn
                    colorm='orange'
                    component={Link} to={'/statistics/views?course=' + courseId + '&lecture=' + lecture._id} endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
            )}

            {isNativeLecture && (
                <BtnConfirm btn={<IconButton disabled={isLoading} onClick={() => triggerDelete()} sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: red[500], opacity: .8 } }}>
                    {isLoading ? <Loader /> : <MdDelete color='#fff' />}
                </IconButton>} />
            )}
        </FlexRow>
    )
}

export default AdminLectureBtns
