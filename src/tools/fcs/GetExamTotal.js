export const totalDegree = (exam) => {
    const questions = [...exam.questions]
    const total = questions?.reduce((acc, question) => {
        return acc += question.points || 1
    }, 0)

    return total
}


export const getPercentage = (score, total) => {
    const percentage = ((score / total) * 100).toFixed(3)
    const rating = percentage >= 85 ? "ممتاز" : percentage >= 75 ? "جيد" : percentage >= 65 ? "متوسط" : "سئ"
    const ratingColor = percentage >= 85 ? 1 : percentage >= 75 ? 2 : percentage >= 65 ? 2 : 3

    return { score, percentage, rating, total, ratingColor }
}
