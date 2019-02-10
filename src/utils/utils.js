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

/**
 * 验证6位短信验证码
 * @param { String } sms 短信验证码
 */
export const validateSMS = sms => {
    let reg = /^[0-9]{6}$/;
    return reg.test(parseInt(sms));
}

/**
 * 判断元素是否含类名
 * @param { Object } ele 节点元素
 * @param { String } cls 类名
 */
export const hasClass = (ele, cls) => {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 元素增加类名
 * @param { Object } ele 节点元素
 * @param { String } cls 类名
 */
export const addClass = (ele, cls) => {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * 元素删除类名
 * @param { Object } ele 节点元素
 * @param { String } cls 类名
 */
export const removeClass = (ele, cls) => {
    if (hasClass(ele, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
