import React from 'react'
import RowInfo from '../../components/ui/RowInfo'
import TabInfo from '../../components/ui/TabInfo'
import InfoInCircle from '../../components/ui/InfoInCircle'

function TestDate() {

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', }
    const shortOptions = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', }


    //day
    //month => start from 0 || new Date().getMonth() 8 = 9
    //day of month   from 1 || new Date().getDate()  26 = 26
    //day of week    from 0 || new Date().getDay()   sunday = 0
    // ("2024-09-25").getMonth()         ==> 9
    //  new Date(2024, 9, 25).getMonth() ==> 8

    const ar = new Date(2003, 10, 11).toLocaleDateString("ar-EG", shortOptions)
    console.log(new Date(2024, 9, 25).toLocaleDateString("ar-EG", shortOptions))
    return (
        <div>
            <h1>complete date :</h1> <p>{new Date(2003, 10, 11).toLocaleDateString("en", dateOptions)}</p>
            <h1>complete short :</h1>
            <RowInfo title={'date'} desc={ar} icon={'icona'} />
            <TabInfo title={'date'} count={ar} icon={'||'} i={1} />
            <InfoInCircle title={'date'} count={ar} icon={'||'} i={1} />
        </div>
    )
}

export default TestDate
