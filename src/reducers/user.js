import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../action/actionTypes'
let initState = {//登录状态初始值
    userInfo: null,
    isLogin: false,
    isLoading: false,
}
// 提取本地存储
let info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
if (info) {
    initState.userInfo = JSON.parse(info);
    initState.isLogin = true;
}


export const user = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_START://开始登录
            state.isLoading = true;
            return { ...state }
        case LOGIN_SUCCESS://登录成功
            state.isLoading = false;
            state.isLogin = true;
            state.userInfo = action.payload//状态机存储用户信息
            if (action.payload.remember) {
                localStorage.setItem('userInfo', JSON.stringify(action.payload));//本地存储
            } else {
                sessionStorage.setItem('userInfo', JSON.stringify(action.payload));
            }

            return { ...state }
        case LOGIN_FAIL://登录失败、退出登录
            state.isLoading = false;
            state.isLogin = false;
            state.userInfo = null
            localStorage.removeItem('userInfo');
            sessionStorage.removeItem('userInfo');
            return { ...state }
        default:
            return state
    }
}