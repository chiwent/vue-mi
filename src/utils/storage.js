/**
 * @author chiwent
 */

/**
 * 设置本地存储
 * @param { Object } params 
 */
export const setStorage = params => {
    let { name, content, type } = params;
    if (!type) {
        type = 'local';
    }
    let obj = {
        dataType: Object.prototype.toString.call(content).slice(8, -1),
        content: content,
        type: type,
        date: new Date().getTime()
    };
    if (type === 'session') {
        return window.sessionStorage.setItem(name, JSON.stringify(obj));
    } else if (type === 'local') {
        return window.localStorage.setItem(name, JSON.stringify(obj));
    }
}

/**
 * 获取本地存储
 * @param { Object } params 
 */
export const getStorage = params => {
    let { name, type } = params;
    if (!type) {
        type = 'local';
    }
    if (name) {
        if (type === 'session') {
            return JSON.parse(window.sessionStorage.getItem(name))
        } else if (type === 'local') {
            return JSON.parse(window.localStorage.getItem(name));
        }
    } else {
        return null;
    }
}

/**
 * 根据键名删除本地存储
 * @param { Object } params 
 */
export const removeStorage = params => {
    let { name, type } = params;
    if (!type) {
        type = 'local';
    }
    if (type === 'session') {
        window.sessionStorage.removeItem(name);
    } else if (type === 'local') {
        window.localStorage.removeItem(name);
    }
}

/**
 * 删除指定类型的全部存储
 * @param { String } type 存储的类型
 */
export const clearStorage = (type = 'local') => {
    if (type === 'session') {
        window.sessionStorage.clear();
    } else if (type === 'local') {
        window.localStorage.clear();
    }
}