import {
    fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout, setUser } from './globalSlice';


// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DB_URI + '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
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
            api.dispatch(logout());
        }
    }

    return result;
};
// const customFetchBase = async (args, api, extraOptions) => {
//     // wait until the mutex is available without locking it
//     await mutex.waitForUnlock();
//     let result = await baseQuery(args, api, extraOptions);//main Fc

//     if ((result.error?.data)?.message === ' ! Session Ended') {
//         if (!mutex.isLocked()) {
//             const release = await mutex.acquire();

//             try {
//                 const refreshResult = await baseQuery(
//                     { credentials: 'include', url: '/auth/refresh' },
//                     api,
//                     extraOptions
//                 );

//                 if (refreshResult.data) {
//                     // Retry the initial query
//                     const user = api.getState()?.global?.user
//                     api.dispatch(setUser({ ...user, token: refreshResult.data.token }))
//                     result = await baseQuery(args, api, extraOptions);
//                 } else {
//                     api.dispatch(logout());
//                 }
//             } finally {
//                 // release must be called once the mutex should be released again.
//                 release();
//             }
//         } else {
//             // wait until the mutex is available without locking it
//             await mutex.waitForUnlock();
//             result = await baseQuery(args, api, extraOptions);
//         }
//     }

//     return result;
// };

export default customFetchBase;

