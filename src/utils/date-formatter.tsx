function convertFromISODate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function convertFromISODateExcludeYear(isoString: string) {
    const date = new Date(isoString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}`;
}

function convertFromISODateWithTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

function convertFromISODateWithTimeToStatistic(isoString: string) {
    const date = new Date(isoString);
    date.setUTCHours(23, 59, 59, 0);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

function convertToISODate(dateString: string) {
    // Chuyển chuỗi 'yyyy-MM-dd' thành đối tượng Date
    const date = new Date(dateString);
    // Đặt giờ, phút, giây mặc định là 00:00:00.000
    date.setUTCHours(23, 59, 59, 0);
    // Chuyển đổi sang định dạng ISO với múi giờ UTC
    return date.toISOString();
}

function convertToISOWithTime(dateString: string) {
    const [time, date] = dateString.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const [day, month, year] = date.split('/').map(Number);
    const isoDate = new Date(year, month - 1, day, hours, minutes, seconds);
    return isoDate.toISOString();
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDayFromISO(isoString: string) {
    const date = new Date(isoString);
    const day = ('0' + date.getDate()).slice(-2);
    return day;
}

function getMonthFromISO(isoString: string) {
    const date = new Date(isoString);
    const month = ('' + (date.getMonth() + 1)).slice(-2);
    return month;
}

function getYearFromISO(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear() + '';
    return year;
}

export {
    convertFromISODate,
    convertFromISODateWithTime,
    convertFromISODateWithTimeToStatistic,
    convertToISODate,
    convertFromISODateExcludeYear,
    getCurrentDate,
    convertToISOWithTime,
    getDayFromISO,
    getMonthFromISO,
    getYearFromISO,
};
