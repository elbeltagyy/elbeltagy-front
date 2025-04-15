import { useGetOneCourseQuery } from "../../toolkit/apis/coursesApi"

function CourseName({ course, title }) {

    const { data } = useGetOneCourseQuery({ _id: course, select: 'name' })
    return (
        <span>
            {title}
            {data?.values?.name}
        </span>
    )
}

export default CourseName
