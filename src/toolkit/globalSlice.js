import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../hooks/cookies";


const getMode = () => {
    let mode = localStorage.getItem("mode")
    if (mode) {
        if (mode === "light") {
            return mode
        } else {
            mode = "dark"
            return mode
        }
    } else {
        mode = "light"
    }
    return mode
}

const initialState = {
    mode: getMode(),
    globalMsg: null,
    user: getCookie('u')?.role ? getCookie('u') : null
}

const globalSlice = createSlice({
    name: 'global', initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark"
            localStorage.setItem("mode", state.mode)
            return state
        },
        setGlobalMsg: (state, action) => {
            state.globalMsg = action.payload // isTrue , msg
            return state;
        },
        setUser: (state, action) => {
            const user = { ...state.user, ...action.payload }
            setCookie('u', user)
            state.user = user
            sessionStorage.setItem('user', JSON.stringify({ name: state.user.name, userName: state.user.userName }))
             
            return state;
        },
        logout: (state) => {
            console.log('logout')
            removeCookie('u')
            sessionStorage.clear()
            state.user = null
            return state;
        },
    }
})

export const { setMode, setGlobalMsg, setUser, logout } = globalSlice.actions
export default globalSlice.reducer