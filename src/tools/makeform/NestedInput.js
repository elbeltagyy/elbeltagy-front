import { Box } from '@mui/material'

import MakeInput from './MakeInput'
import MakeChoosed from './components/MakeChoosed'
import { memo } from 'react'

const abcd = ['أ', 'ب', 'ج', 'د', 'ه', 'و', 'ي']

function NestedInput({ inputName, input, index }) {

    return (
        <Box>
            {input.array && input.array.map((nestedInput, i) => {

                const nestedInputName = `${inputName}.${index}.${nestedInput.name}`

                if (nestedInput.choose) {
                    const fromName = `${inputName}.${index}.${nestedInput.from}`
                    // const fromValue = props.getFieldMeta(fromName).value
                    const nameArr = inputName.split('.')
                    const targetInputName = `${nameArr[0]}.${nameArr[1]}.${nestedInput.choose}`

                    return <MakeChoosed
                        key={i} letter={abcd[index]}
                        input={nestedInput}
                        inputName={nestedInputName} targetInputName={targetInputName} fromInputName={fromName} />
                }

                return (
                    <Box key={i} sx={{ my: '16px' }}>
                        <MakeInput input={nestedInput} nestedInputName={nestedInputName} />
                    </Box>
                )
            })}
        </Box >
    )
}
export default memo(NestedInput)