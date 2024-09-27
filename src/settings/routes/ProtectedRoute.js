import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import NotFoundPage from '../../pages/errors/NotFoundPage'

function ProtectedRoute({ children, allowedTo = [] }) {

    const user = useSelector(s => s.global.user)


    if (allowedTo.length > 0 && !allowedTo?.includes(user?.role)) { return <NotFoundPage /> }

    if (user) return children
}

export default ProtectedRoute
