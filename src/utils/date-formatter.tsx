function convertFromISODate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function convertFromISODateWithTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function convertToISODate(dateString: string) {
    // Chuyển chuỗi 'yyyy-MM-dd' thành đối tượng Date
    const date = new Date(dateString);
    // Đặt giờ, phút, giây mặc định là 00:00:00.000
    date.setUTCHours(0, 0, 0, 0);
    // Chuyển đổi sang định dạng ISO với múi giờ UTC
    return date.toISOString();
}

export { convertFromISODate, convertFromISODateWithTime, convertToISODate };
