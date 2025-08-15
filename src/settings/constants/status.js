const statusConstants = {
    SUCCESS: "success",
    FAILED: "failed",
    ERROR: "error",
    PENDING: 'pending',
    PAID: 'paid',
    REJECTED: "rejected"
}
// 200, 201 ==> added 400 ===> bad request client error 401 ==> not authorized 404 notfound
// status,  data, msg, (statusCode),

export default statusConstants