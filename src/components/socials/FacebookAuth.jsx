import { Button, Typography } from "@mui/material"
import { FlexBetween } from "../../style/mui/styled/Flexbox"
import { Add, Delete } from "@mui/icons-material"
import BtnConfirm from "../ui/BtnConfirm"
import Loader from "../../style/mui/loaders/Loader"
import { useLazyLoginFacebookQuery, useLogoutFacebookMutation } from "../../toolkit/apis/socials/facebookApi"
import usePostData from "../../hooks/usePostData"

function FacebookAuth({ pages, setPage, setPages, type, isShow = true }) {
    const [loginToFacebook, { isLoading }] = useLazyLoginFacebookQuery()

    const login = async () => {
        const { data } = await loginToFacebook({ type })
        location.href = data.values
    }

    const [sendLogout] = useLogoutFacebookMutation()
    const [logoutFacebook] = usePostData(sendLogout)

    const logout = async () => {
        await logoutFacebook({ type })
        setPage()
        setPages([])
    }

    return (
        <FlexBetween mb={1} gap={'12px'}>
            <Typography variant="h5" fontWeight={800}> الصفحات التي تم ربطها</Typography>
            {pages?.length ?
                <BtnConfirm btn={
                    <Button variant='contained' color='error' disabled={isLoading} startIcon={isLoading ? <Loader /> : <Delete />} onClick={logout} >ازاله صفحه الفيسبوك</Button>
                } />
                : isShow &&
                <BtnConfirm btn={
                    <Button variant='contained' disabled={isLoading} startIcon={isLoading ? <Loader /> : <Add />} onClick={login} >ربط بصفحه الفيسبوك</Button>
                } />
            }
        </FlexBetween>
    )
}

export default FacebookAuth