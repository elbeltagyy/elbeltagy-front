import {
    fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { logout, setUser } from './globalSlice';

// Create a new mutex

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

const customFetchBase = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    let result = await baseQuery(args, api, extraOptions);//main Fc

    if ((result.error?.data)?.message === ' ! Session Ended') {
        const refreshResult = await baseQuery(
            { credentials: 'include', url: '/auth/refresh' },
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
    }

    return result;
};

export default customFetchBase;

