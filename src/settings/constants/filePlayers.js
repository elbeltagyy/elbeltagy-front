const filePlayersConstants = {
    SERVER: 'رفع على السيرفر',
    YOUTUBE: 'لينك اليوتيوب',
    BUNNY: 'bunny',
    BUNNY_UPLOAD: 'bunny رفع على',
    GOOGLE_DRIVE: 'google drive',
}


export const filePlayers = [
    { id: filePlayersConstants.SERVER, disabled: true, label: 'الحفظ علي المنصه' },
    { id: filePlayersConstants.YOUTUBE },
    { id: filePlayersConstants.GOOGLE_DRIVE, info: 'لا يمكن الوصول الي سرعه الطالب - مده المشاهده' },
    { id: filePlayersConstants.BUNNY },
]

export default filePlayersConstants