import { Skeleton } from '@mui/material'

export default function LoaderSkeleton() {
    // const {lang} = useSelector(s => s.global)
    return (
        <div style={{ margin: "50px 25px", minHeight: '100vh' }}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={80} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={80} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={80} height={80} sx={{ mb: 1 }} />
            {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
            <Skeleton variant="rounded" width={210} height={60} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={210} height={60} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={210} height={60} sx={{ mb: 1 }} />
        </div>
    )
}
