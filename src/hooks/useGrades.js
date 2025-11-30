import { useGetGradesQuery } from "../toolkit/apis/gradesApi";

const useGrades = () => {
    const { data = {}, ...status } = useGetGradesQuery();

    return {
        grades: data?.values?.grades || [],
        ...status
    }
}

export default useGrades