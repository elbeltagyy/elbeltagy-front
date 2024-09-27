import { styled } from '@mui/material';
import React from 'react';

export function LoginIcon({ size = '1.5rem' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path strokeDasharray={32} strokeDashoffset={32} d="M13 4L20 4C20.5523 4 21 4.44772 21 5V19C21 19.5523 20.5523 20 20 20H13"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0"></animate></path><path strokeDasharray={12} strokeDashoffset={12} d="M3 12h11.5" opacity={0}><set attributeName="opacity" begin="0.5s" to={1}></set><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0"></animate></path><path strokeDasharray={6} strokeDashoffset={6} d="M14.5 12l-3.5 -3.5M14.5 12l-3.5 3.5" opacity={0}><set attributeName="opacity" begin="0.7s" to={1}></set><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"></animate></path></g>
        </svg>
    );
}

export function SignupIcon({ size = '1.5rem' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 506 512">
            <path fill="currentColor" d="M336.742.004c-5.732-.12-12.481 2.453-19.86 9.18c-46.533 64.308-24.742 112.637.669 195.094c27.589 89.525 3.311 151.023-96.922 122.124l13.974 45.02C356.01 389.67 380.316 301.64 363.98 225.555c-22.331-104.015-54.152-129.427-9.84-196.19c5.233-11.154-2.753-29.053-17.4-29.36M377.2 45.64c-8.08 4.781-10.91 11.338-11.192 25.867c32.625 27.345 60.36 65.991 82.18 93.208c-8.074 4.809-18.18 9.25-29.263 7.892c-10.334-14.493-37.847-47.05-58.236-66.709c1.662 17.845 6.535 31.115 8.014 46.572c31.968 35.89 33.665 54.176 33.665 54.176c41.241 2.092 76.028-15.901 99.24-36.808c12.519-10.748-4.996-39.884-27.34-19.885c-30.184-37.486-61.414-73.664-97.068-104.313m-135.397 90.39c-64.648-.737-110.817 48.596-107.626 112.728c5.05 56.142 30.399 92.912 34.463 138.263l-27.758-31.354c-10.855-1.19-20.37-2.676-32.085 3.792l58.532 61.95c-1.583 9.517-4.242 19.559-8.264 30.318c-22.906-22.013-49.869-55.033-79.44-87.009c-17.09 3.793-26.497 13.47-26.672 13.76l93.326 100.594c-24.194 26.779 17.503 44.953 36.45 23.433c65.193-75.952 14.961-165.88-6.389-252.319l47.519 51.681c16.752 9.187 39.172 8.919 47.482 3.836l-91.225-94.87c4.713-10.523 9.684-13.146 21.044-18.759l88.982 92.74c5.634-10.584 14.017-20.687 3.397-43.3l-57.92-64.106c9.893-3.314 31.811 3.576 48.981 8.943l-14.05-46.836c-9.899-2.252-19.512-3.379-28.747-3.484M98.745 300.054c-45.42-.472-70.368 18.213-91.777 37.05c-19.17 16.978 5.015 47.966 26.71 32.057c27.197-24.263 50.117-37.07 93.589-33.961l-7.754-33.715c-7.374-.905-14.28-1.363-20.768-1.43" />
        </svg>
    );
}


export function RtArrow({ size = '1.5rem', style }) {
    return (<svg style={style} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={20} strokeDashoffset={20} d="M21 12H3.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate></path><path strokeDasharray={12} strokeDashoffset={12} d="M3 12L10 19M3 12L10 5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="12;0"></animate></path></g></g></svg>);
}