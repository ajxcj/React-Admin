import request from "../utils/request";

export const userLogin = (info) => {//登录
    return request.post('/login', info)
}

export const userReg = (info) => {//注册，账号分配
    return request.post('/users', info)
}

export const roleAdd = (role) => {//角色新增
    return request.post('/classes/CakeRole', role)
}

export const roleGet = () => {//角色加载
    return request.get('/classes/CakeRole')
}