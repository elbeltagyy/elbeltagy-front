import React from 'react'
import sectionConstants from '../../settings/constants/sectionConstants'
import { FaFilePdf, FaLink, FaVideo } from 'react-icons/fa'
import { ExamIcon } from '../ui/svg/ContentSvgs'

function SectionIcon({ lecture }) {
    return (
        <>
            {lecture.sectionType === sectionConstants.VIDEO ? <FaVideo size='1.5rem' color='orange' /> :
                lecture.sectionType === sectionConstants.FILE ? <FaFilePdf size='1.5rem' color='orange' /> :
                    lecture.sectionType === sectionConstants.EXAM ? <ExamIcon size='1.5rem' color='orange' /> :
                        lecture.sectionType === sectionConstants.LINK && <FaLink size='1.5rem' color='orange' />}
        </>
    )
}

export default SectionIcon
