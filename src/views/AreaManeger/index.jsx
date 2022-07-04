/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import { Button } from 'antd'
import { areaAdd, areaGet } from '../../api/cake'
let AMap = window.AMap;
export default function AreaManager() {
    let [cityname, setCityName] = useState('')
    let mapRef = useRef()
    var polyEditor
    var polygon
    function createPolygon() {
        //新增覆盖物
        polyEditor.close();
        polyEditor.setTarget();
        polyEditor.open();
    }

    function handleSeve() {
        //获取地图矢量图信息的经纬度,并提交到数据库
        // console.log(polygon.getPath());
        let pathArr = polygon.getPath().map(item => {
            return [item.lng, item.lat]
        })
        console.log(pathArr);
        areaAdd({
            city: '重庆市',
            path: pathArr
        })
    }
    //获取用户所在城市信息
    function showCityInfo(map) {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === "complete" && result.info === "OK") {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    console.log(cityinfo, citybounds);
                    setCityName(cityinfo)
                    //地图显示当前城市
                    map.setBounds(citybounds);
                }
            } else {
                console.log(result.info);
            }
        });
    }
    useEffect(() => {
        // var map = new AMap.Map(mapRef.current)
        var map = new AMap.Map(mapRef.current, {//初始化地图地形
            center: [106.55, 29.57],//坐标
            zoom: 10
        });
        // 显示城市地址
        // showCityInfo(map)
        areaGet('重庆市').then(res => {//发请求初始化矢量图
            // console.log(res);
            let { results } = res.data
            let ployArr = []//收集矢量图对象
            results.forEach(({ city, path }) => {
                let polygon = new AMap.Polygon({ path })
                polygon.on('dblclick', () => {
                    polyEditor.setTarget(polygon);
                    polyEditor.open();
                })
                ployArr.push(polygon)
            })
            map.add(ployArr);//将覆盖矢量图添加到地图上
            // map.setFitView();
            polyEditor = new AMap.PolygonEditor(map);
            polyEditor.addAdsorbPolygons(ployArr);
            polyEditor.on('add', function (data) {
                polygon = data.target;//新增的矢量图对象
                polyEditor.addAdsorbPolygons(polygon);
                polygon.on('dblclick', () => {
                    polyEditor.setTarget(polygon);
                    polyEditor.open();
                })
            })
        })
    }, [])
    return (
        <>
            <Button type='primary' onClick={createPolygon}>
                新增覆盖物
            </Button>
            <Button type='primary' onClick={handleSeve}>
                确认并上传范围
            </Button>
            <h2>城市：{cityname}</h2>
            <div ref={mapRef} style={{ height: '350px' }}>配送范围地图</div>
        </>
    )
}
