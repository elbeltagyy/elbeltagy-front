import { Avatar } from "@mui/material"
import AccordionStyled from "../../style/mui/styled/AccordionStyled"
import ChapterData from "./ChapterData"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function ChapterDnD({ chapter, setChapter, setChapters, deleteChapter, course, grade,chapters }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapter._id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform), //Css from utilies
        // touchAction: 'none'
    }

    return (
        <div style={style} ref={setNodeRef}>
            <AccordionStyled
                beforeTitle={'عدد المحاضرات=' + (chapter.lectures?.length || 0)}
                startIcon={<Avatar
                    {...listeners}
                    {...attributes}
                    sizes='small' sx={{
                        color: 'grey.0', bgcolor: 'primary.dark',
                        cursor: 'grab',        // Shows drag cursor
                        '&:active': { cursor: 'grabbing' },
                    }}>{chapter.index}</Avatar>}
                title={chapter.name}
                desc={chapter.description}
            >
                <ChapterData
                    chapter={chapter} chapters={chapters}
                    setChapter={setChapter} setChapters={setChapters}
                    deleteChapter={deleteChapter}
                    course={course} grade={grade}// unit={unit}
                />
            </AccordionStyled>
        </div>

    )
}

export default ChapterDnD
