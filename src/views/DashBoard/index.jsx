import React, { useEffect } from 'react'
import './index.less'
import axios from 'axios'
export default function DashBoard() {
    useEffect(() => {
        axios.get('/hehe/product/home').then(res => {
            // console.log(res);
        })
    }, [])
    return (
        <div className='box'>
            <span>DashBoard</span>
            <strong>1111</strong>
        </div>
    )
}
