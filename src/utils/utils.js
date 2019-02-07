/**
 * @author chiwent
 */

/**
 * 判断对象是否为字符串
 * @param { Object } obj 
 */
export const isString = obj => {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'String';
}

/**
 * 验证中国地区的手机号
 * @param { String } phone 手机号码
 * @returns { Boolean } 
 */
export const validatePhone = phone => {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;
    return reg.test(phone);
}

export const validateSMS = sms => {
    let reg = /^[0-9]{6}$/;
    return reg.test(parseInt(sms));
}


