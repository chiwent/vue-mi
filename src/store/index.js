
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { getStorage, setStorage, removeStorage } from "../utils/storage";
import { api, getCartList } from '../utils/api';

Vue.use(Vuex);

let initUserInfo = getStorage({
    name: 'userName',
    type: 'session'
});

let initUserTokenInfo = getStorage({
    name: 'token',
    type: 'session'
});

const initUserName = !!initUserInfo ? JSON.parse(JSON.stringify(initUserInfo)).content : '';

const initUserToken = !!initUserTokenInfo ? JSON.parse(JSON.stringify(initUserTokenInfo)).content : '';

const initStatus = !!initUserName;

/*
let initProduct, initProductNum;
(() => {
    if (initStatus) {
        getCartList({
            userName: initUserName,
            token: initUserToken
        }).then(res => {
            initProduct = res.cartList;
            initProductNum = initProduct.reduce((prev, next) => {
                return prev.num + next.num;
            });
        });
    }
})();
*/

export default new Vuex.Store({
    state: {
        status: initStatus,
        userName: initUserName,
        token: initUserToken,
        /*
        product: initProduct,
        cartNum: initProductNum
        */
        product: [],
        cartNum: 0,
        addProducts: {}
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading';
        },
        AUTH_SUCCESS(state, payload) {
            state.status = 'success';
            state.userName = payload.userName;
            state.token = payload.token;
        },
        AUTH_ERROR(state) {
            state.status = 'error';
        },
        LOGOUT(state) {
            state.status = '';
            state.userName = '';
            state.token = '';
        },
        INITCART(state, payload) {
            state.product = payload;
            state.cartNum = state.product.reduce((prev, next) => {
                return prev.num + next.num;
            });
        },
        CLEARCART(state, payload) {
            state.product = [];
            state.cartNum = 0;
        },
        ADDTOCART(state, payload) {
            state.product.filter((item, index) => {
                if (item.productId === payload.productId) {
                    item.num++;
                } else {
                    state.product.push(payload)
                }
            });
            state.cartNum = state.product.reduce((prev, next) => {
                return prev.num + next.num;
            });
        },
        ADDTOCART(state, payload) {
            state.addProducts = payload;
        },
    },
    actions: {
        login({ commit, state, dispatch }, payload) {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST');
                axios({
                    url: api.loginApi,
                    params: {
                        userName: payload.userName,
                        password: payload.sms
                    },
                    method: 'POST'
                }).then(res => {
                    const token = res.data.result.token;
                    const username = res.data.result.userName;
                    const status = res.data.result.status;
                    if (status) {
                        setStorage({
                            name: 'userName',
                            content: username,
                            type: 'session'
                        });
                        setStorage({
                            name: 'token',
                            content: token,
                            type: 'session'
                        });
                    }
                    axios.defaults.headers.common['Authorization'] = token;
                    commit('AUTH_SUCCESS', { userName: username, token: token });
                    resolve(res);
                }).catch(err => {
                    commit('AUTH_ERROR');
                    removeStorage({
                        name: 'userName',
                        type: 'session'
                    });
                    removeStorage({
                        name: 'token',
                        type: 'session'
                    });
                    reject(err);
                });
            });
        },
        register({ commit }, payload) {
            return new Promise((reoslve, reject) => {
                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(userName)) {
                    reject();
                    return;
                }
                axios({
                    url: api.register,
                    params: {
                        userName: payload.userName,
                        password: payload.password
                    },
                    method: 'POST'
                }).then(res => {
                    const username = res.data.result.userName;
                    const status = res.data.result.status;
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('LOGOUT');
                removeStorage({
                    name: 'userName',
                    type: 'session'
                });
                removeStorage({
                    name: 'token',
                    type: 'session'
                });
                delete axios.defaults.headers.common['Authorization'];
                commit('CLEARCART');
                resolve();
            })
        },
        initCart({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('INITCART', payload);
            })
        },
        addToCart({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: api.addCart,
                    params: {
                        userName: payload.userName,
                        token: payload.token,
                        para: payload.para
                    },
                    method: 'POST'
                }).then(res => {
                    res = res.data.result;
                    commit('ADDTOCART', payload);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });

            });
        }
    },
    getters: {
        loginUserName: state => state.userName,
        loginUserToken: state => state.token,
        isLogined: state => !!state.userName,
        authStatus: state => state.status,
        cartNumGetters: state => state.cartNum
    }
});
