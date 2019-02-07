import axios from "axios";

export const api = {
    loginApi: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/login',
    orderList: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/orderList',
    cartList: 'https://www.easy-mock.com/mock/5c56990f0e8d497fa4bc6646/user/cartList'
}

/**
 * 获取订单内容
 * @param { Object } params 获取订单详情的参数
 */
export const getOrderList = params => {
    let { userName, token, type } = params;

    return new Promise((resolve, reject) => {
        axios({
            url: api.orderList,
            params: {
                userName: userName,
                token: token,
                type: type
            },
            method: 'POST'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject();
        });
    })
}

export const getCartList = params => {
    let { userName, token } = params;
    return new Promise((resolve, reject) => {
        axios({
            url: api.cartList,
            params: {
                userName: userName,
                token: token
            },
            method: 'POST'
        }).then(res => {
            res = res.data.result;
            resolve(res);
        }).catch(err => {
            reject();
        });
    })
}