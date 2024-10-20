export const totalDegree = (exam) => {
    const questions = [...exam.questions]
    const total = questions?.reduce((acc, question) => {
        return acc += question.points || 1
    }, 0)

    return total
}
