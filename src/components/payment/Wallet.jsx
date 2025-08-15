import { useSelector } from "react-redux"

function Wallet({ price }) {
    const user = useSelector(s => s.global.user)
    return (
        <div>
            سيتم خصم {price} جنيه من محفظتك ({user.wallet} متاح)
        </div>
    )
}

export default Wallet
