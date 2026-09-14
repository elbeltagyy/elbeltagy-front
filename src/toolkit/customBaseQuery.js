import {
    fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { logout, setGlobalMsg, setUser } from './globalSlice';
import { Mutex } from 'async-mutex'

// Create a new mutex
const mutex = new Mutex();
const defaultErrorMessages = {
    FETCH_ERROR: 'Network error — please check your connection.',
    PARSING_ERROR: 'Unexpected response from server.',
    TIMEOUT_ERROR: 'Request timed out — please try again.',
    CUSTOM_ERROR: 'Something went wrong.',
}


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DB_URI + '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        headers.set('x-client', 'teacher')
        headers.set('x-powered-by', 'Menassty ,')

        const token = getState()?.global?.user?.token
        if (token) {
            headers.set('authorization', token)
        }
        return headers
    },
});

const handledParams = (params) => Array.isArray(params) ? params.filter(v => v !== null && v !== undefined && v !== '') : typeof params === 'object' ? Object.fromEntries(
    Object.entries(params).filter(([k_, v]) => v !== null && v !== undefined && v !== '')
) : params


const customFetchBase = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    if (args.query) {
        args.query = handledParams(args.query)
    }

    let result = await baseQuery(args, api, extraOptions);//main Fc

    if ((result.error?.data)?.message === ' ! Session Ended') {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    { url: '/auth/refresh' }, //credentials: 'include',
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    // Retry the initial query
                    const user = api.getState()?.global?.user
                    api.dispatch(setUser({ ...user, token: refreshResult.data.token }))
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log('from token customBase Query')
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions); // retry after unlock
        }
    }

    if (result.error) {
        //result.error.data ==> Myserver
        //result.error.error ==> RTK
        if (result.error?.data?.isKick === true) {
            api.dispatch(logout())
            api.dispatch(setGlobalMsg({ message: result.error?.data?.message || "sorry!, you have to log in", severity: "error" }))
            // navigate here if you have access to it
            return result
        }
        const { status } = result.error

        // Default message by status type
        const defaultMessage =
            result.error?.data?.message ??
            defaultErrorMessages[status] ??
            result.error.error ??
            '!Check Your internet Connection'


        api.dispatch(setGlobalMsg({
            message: defaultMessage,
            severity: "error"
        }))

        result.error.message = defaultMessage
        return result
    }

    if (result.data?.message) {
        api.dispatch(setGlobalMsg({ message: result.data?.message, severity: "success" }))
    }
    return result;
};

export default customFetchBase;

