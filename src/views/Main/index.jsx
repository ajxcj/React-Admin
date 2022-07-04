import { Breadcrumb, Layout, Row, Col } from 'antd';
import React from 'react';
import './index.css'
import { Route } from 'react-router-dom';//菜单切换内容区域
import { adminRoutes } from '../../router'//路由数据包
import SideMenu from './components/SideMenu';
import DropMenu from './components/DropMenu';
import { connect } from 'react-redux';


const { Header, Content, Sider } = Layout;


let filterRoutes = () => {//将路由处理成符合Route使用的格式
    let arr = []
    adminRoutes.forEach(item => {
        if (item.children) {
            arr = [...arr, ...item.children]
        } else {
            arr.push(item)
        }
    })
    return arr
}


const Main = (props) => {
    let { rolecode } = props.user.userInfo
    return (
        <Layout className='main-cont'>
            <Header className="header">
                <Row justify='space-between'>
                    <Col>
                        <div className="logo" />
                    </Col>
                    <Col>
                        {/* 个人中心 */}
                        <DropMenu />
                    </Col>
                </Row>

            </Header>

            <Layout>
                <Sider width={200} className="site-layout-background">
                    {/* 侧边菜单 */}
                    <SideMenu />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {
                            filterRoutes().map((item, index) => {
                                let bool = item.roles.includes(rolecode)//权限判断
                                return bool ? <Route {...item} key={index} /> : ''
                            })
                        }

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};

export default connect(({ user }) => ({ user }))(Main);