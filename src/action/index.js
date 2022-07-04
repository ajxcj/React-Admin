import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './actionTypes'
import { userLogin } from '../api/user'
export const loginStart = (payload) => {//开启登录
    return {
        type: LOGIN_START,
        payload,
    }
}

export const loginSuccess = (payload) => {//登录成功
    return {
        type: LOGIN_SUCCESS,
        payload,
    }
}

export const loginFail = (payload) => {//登录失败
    return {
        type: LOGIN_FAIL,
        payload,
    }
}

export const loginAsync = (info, history) => {//异步action登录请求,info包含账号密码
    return (dispatch) => {
        dispatch(loginStart())//开启登录
        userLogin(info).then(res => {
            res.data.remember = info.remember
            dispatch(loginSuccess(res.data))//登录成功
            history.push('/admin')
            // console.log(res);
        }).catch(err => {
            // console.log('登录失败', err);
            dispatch(loginFail())//登录失败
        })

    }
}