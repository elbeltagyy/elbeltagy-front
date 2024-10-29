import sectionConstants from '../../settings/constants/sectionConstants'
import { FaFilePdf, FaLink, FaVideo } from 'react-icons/fa'
import { ExamIcon } from '../ui/svg/ContentSvgs'

function SectionIcon({ lecture, color = 'orange' }) {
    return (
        <>
            {lecture.sectionType === sectionConstants.VIDEO ? <FaVideo size='1.5rem' color={color} /> :
                lecture.sectionType === sectionConstants.FILE ? <FaFilePdf size='1.5rem' color={color} /> :
                    lecture.sectionType === sectionConstants.EXAM ? <ExamIcon size='1.5rem' color={color} /> :
                        lecture.sectionType === sectionConstants.LINK && <FaLink size='1.5rem' color={color} />}
        </>
    )
}

export default SectionIcon
