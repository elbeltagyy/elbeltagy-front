function Grid({ children, gap = '30px', min = '300px', sx }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${'auto-fit'}, minmax(${min}, 1fr))`, width: '100%',
            gap: gap, justifyItems: 'center', alignContent: 'center', ...sx
        }}>
            {children}
        </div>
    )
}

export default Grid
