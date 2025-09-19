import { QRCodeCanvas } from "qrcode.react";

const GenerateQrCode = ({ url }) => {

    return (
        <div style={{ textAlign: "center" }}>
            <h3>Qrcode </h3>
            <h5>بمجرد فحص qrcode سيتم تفعيل الكود تلقائيا </h5>
            <QRCodeCanvas
                value={url}
                size={200} // size in pixels
                bgColor="#ffffff"
                fgColor="#000000"
                level="H" // error correction level
            />
            {/* <p>{url}</p> */}
        </div>
    );
};

export default GenerateQrCode;
