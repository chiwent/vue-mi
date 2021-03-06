import axios from "axios";

export const api = {
    loginApi: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/login',
    orderList: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/orderList',
    cartList: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/cartList',
    product: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/product',
    like: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/like',
    addCart: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/addCart',
    stock: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/stock'
}

/**
 * 获取订单内容
 * @param { Object } params 获取订单详情的参数
 */
export const getOrderList = params => {
    let { userName, type } = params;

    return new Promise((resolve, reject) => {
        axios({
            url: api.orderList,
            params: {
                userName: userName,
                // token: token,
                type: type
            },
            method: 'POST'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    })
}

/**
 * 获取购物车详情
 * @param { Object } params 获取购物车详情参数
 */
export const getCartList = params => {
    let { userName } = params;
    return new Promise((resolve, reject) => {
        axios({
            url: api.cartList,
            params: {
                userName: userName,
                // token: token
            },
            method: 'POST'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    })
}

/**
 * 获取商品详情
 * @param { String } id 商品详情页ID
 */
export const getProductDetail = id => {
    return new Promise((resolve, reject) => {
        axios({
            url: api.product,
            params: {
                id: id
            },
            method: 'GET'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * 点赞
 * @param { Object } params 点赞的参数
 */
export const getLike = params => {
    let { userName, like } = params;
    return new Promise((resolve, reject) => {
        axios({
            url: api.like,
            params: {
                userName: userName,
                // token: token,
                like: like
            },
            method: 'GET'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    })
}

/**
 * 获取库存状态
 * @param { Object } province 省份
 */
export const getStock = province => {
    return new Promise((resolve, reject) => {
        axios({
            url: api.stock,
            params: {
                province: province
            },
            method: 'GET'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}