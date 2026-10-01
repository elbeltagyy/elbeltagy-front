import { useGetGradesQuery } from "../toolkit/apis/gradesApi";

const useGrades = (filter = {}) => {
    const { data = [], ...status } = useGetGradesQuery(filter);

    return {
        grades: data?.values?.grades || [],
        ...status
    }
}

export default useGrades