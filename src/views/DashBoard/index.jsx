/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react'
import './index.less'
import axios from 'axios'
// import Logo from './1.JPG'
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
            {/* <img src={Logo} alt="" style={{ width: '100px', height: '100px' }} /> */}
        </div>
    )
}
