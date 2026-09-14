function Grid({ children, gap = '24px', min = '260px', maxCols = 4, sx }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(max(${min}, calc((100% - ${maxCols - 1}*${gap})/${maxCols})), 1fr))`,
            width: '100%',
            gap: gap,
            justifyItems: 'center',
            alignContent: 'start',
            ...sx
        }}>
            {children}
        </div>
    )
}

export default Grid