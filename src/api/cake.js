import request from '../utils/request'

export const bannerAdd = (bannerObj) => {//新增
    return request.post('/classes/CakeBanner', bannerObj)
}

export const bannerGet = () => {//列表渲染
    return request.get('/classes/CakeBanner')
}

export const bannerDel = (ObjectId) => {//删除
    return request.delete(`classes/CakeBanner/${ObjectId}`)
}

export const bannerUpdate = (ObjectId, newBnnaer) => {//更新
    return request.put(`classes/CakeBanner/${ObjectId}`, newBnnaer)
}

export const cakeAdd = (CakeList, values) => {//批量录入商品
    let requests = CakeList.map(item => {
        return {
            method: 'POST',
            path: '/1.1/classes/CakeList',
            body: { ...item, ...values }
        }
    })
    return request.post('/batch', { requests })
}


export const areaAdd = (areaObj) => {//新增地图覆盖物
    return request.post('/classes/CakeArea', areaObj)
}

export const areaGet = (city) => {//初始化覆盖物
    return request.get(`/classes/CakeArea?where={"city":"${city}"}`)
}