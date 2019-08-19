/**
 * 将毫秒数转换成时分秒
 * @param mss
 * @returns
 */
function millsToHmsConverter(mills) {
    var days = parseInt(mills / (1000 * 60 * 60 * 24));
    var hours = parseInt((mills % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mills % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mills % (1000 * 60)) / 1000;
    days = days!=0?days+ " 天 ":"";
    hours = hours!=0?hours+ " 小时 ":"";
    minutes = minutes!=0?minutes+ " 分钟 ":"";
    seconds = seconds!=0?seconds+ " 秒 ":"";
    return days + hours + minutes + seconds;
}