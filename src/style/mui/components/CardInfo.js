import { useEffect, useState } from 'react'
import { FlexBetween, FlexColumn } from '../styled/Flexbox'
import { Box, Typography, useTheme } from '@mui/material'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

function AnimatedCounter({ from, to, duration = 1.5 }) {
    const count = useMotionValue(from)
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())
    const [display, setDisplay] = useState(from)

    useEffect(() => {
        const unsubscribe = rounded.on('change', (v) => setDisplay(v))
        return () => unsubscribe()
    }, [rounded])

    useEffect(() => {
        const controls = animate(count, to, { duration, ease: 'easeOut' })
        return controls.stop
    }, [from, to])

    return <span>{display}</span>
}

function CardInfo({ icon, caption, desc, estimated }) {
    const theme = useTheme()
    const hasEstimated = estimated !== undefined && estimated !== null
    const [phase, setPhase] = useState(hasEstimated ? 'estimated' : 'real')

    useEffect(() => {
        if (!hasEstimated) return
        // Show estimated counter, then after delay animate to real value
        const timer = setTimeout(() => setPhase('real'), 5600)
        return () => clearTimeout(timer)
    }, [hasEstimated])

    const isNumeric = hasEstimated && !isNaN(Number(estimated)) && !isNaN(Number(desc))

    return (
        <FlexBetween
            sx={{
                bgcolor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px 22px',
                boxShadow: theme.shadows[3],
                mt: '10px',
                color: 'grey.1000',
                width: '150px',
            }}
        >
            <FlexColumn m={'0 auto'}>
                <Box>{icon}</Box>
                <Typography fontSize={'.89rem'} variant='caption' noWrap>
                    {caption}
                </Typography>

                <Typography variant='caption' component='div'>
                    {isNumeric ? (
                        phase === 'estimated' ? (
                            // Phase 1: count up from 0 to estimated
                            <motion.span
                                key="estimated"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'inline-block', color: '#888' }}
                            >
                                <AnimatedCounter from={0} to={Number(estimated)} duration={1.2} />
                                <span style={{ fontSize: '0.9em', marginLeft: 2, opacity: 0.7 }}>+قريبا</span>
                            </motion.span>
                        ) : (
                            // Phase 2: animate from estimated to real desc
                            <motion.span
                                key="real"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'inline-block' }}
                            >
                                <AnimatedCounter
                                    from={Number(estimated)}
                                    to={Number(desc)}
                                    duration={1.2}
                                />
                            </motion.span>
                        )
                    ) : (
                        // No estimated prop — just show desc as-is
                        desc
                    )}
                </Typography>
            </FlexColumn>
        </FlexBetween>
    )
}

export default CardInfo