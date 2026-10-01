import { useSearchParams } from "react-router-dom";
import { OutLinedHoverBtn } from "../../style/buttonsStyles";

function LectureAssetBtn({ asset, locked, notAppear }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const assetId = searchParams.get('assetId')

    const isRunning = asset._id === assetId
    if (notAppear) return
    return (
        <OutLinedHoverBtn size="small" disabled={isRunning || locked}
            colorm={isRunning ? 'white' : 'primary'}
            onClick={() => setSearchParams(prev => {
                const newParams = new URLSearchParams(prev); // copy existing params
                newParams.set('assetId', asset?._id);              // update/add just this one
                return newParams;
            })}> {asset._id === assetId ? 'قيد التشغيل' : locked ? 'عليك اكمال المحاضرات' : 'فتح المحاضره'}</OutLinedHoverBtn>
    )
}

export default LectureAssetBtn