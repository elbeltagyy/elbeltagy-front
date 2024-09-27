import React from 'react'
import { encrypt, decrypt, compare } from 'n-krypta';


function EncryptPage() {

    const __secretKey = '50515151305151501secretjnfdjnsjnfjdnsjfsdf'

    const user = {
        name: 'mahmoud ahamd',
        userName: 'elawadii',
        avatar: {
            url: 'https://www.google.com'
        },
        wallet: 30,
        subscriptons: ['course 1', 'course 2'],
        role: 'student'
    }

    if (localStorage.getItem('testora')) {
        const fromLocalStorage = localStorage.getItem('testora')
        const decryptedObj = decrypt(fromLocalStorage, __secretKey)
        console.log('fromLocalStorage +>>', decryptedObj)

        console.log('is valid', Boolean(decryptedObj?.name))
        console.log('role', decryptedObj.role)

    } else {
        const encryptesObj = encrypt(user, __secretKey)
        localStorage.setItem('testora', encryptesObj)
        console.log('encryption +>>', encryptesObj)
    }

    return (
        <div>

        </div>
    )
}

export default EncryptPage
