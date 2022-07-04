import React from 'react'
import { Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { adminRoutes } from '@/router'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
const { SubMenu } = Menu;
// let filterRoutes = () => {
//     let arr = []
//     adminRoutes.forEach(item => {
//         if (!item.hide) {
//             if (item.children) {
//                 item.children.forEach((itm, idx) => {
//                     if (itm.hide) {
//                         item.children.splice(idx, 1);
//                     }
//                 })
//             }
//             arr.push(item);
//         }
//     })
//     return arr
// }
function SideMenu(props) {
    let handleMenu = ({ key }) => {
        // console.log(key, props);
        props.history.push(key)
    }
    let { rolecode } = props.user.userInfo//获取当前登录用户的角色账号
    return (
        // <Menu
        //     mode="inline"
        //     defaultSelectedKeys={['1']}
        //     defaultOpenKeys={['sub1']}
        //     style={{
        //         height: '100%',
        //         borderRight: 0,
        //     }}
        //     items={adminRoutes}
        //     onClick={handleMenu}
        // />

        <Menu
            onClick={handleMenu}
            defaultSelectedKeys={['/admin/dashboard']}
            mode="inline"
            theme='dark'
        >
            {adminRoutes.map(item => {

                let bool = item.roles.includes(rolecode)
                if (!bool) { return '' }//根据权限控制主菜单渲染
                if (item.children) {
                    return <SubMenu
                        key={item.key}
                        title={item.label}
                        icon={item.icon}
                    >
                        {
                            item.children.map(itm => {
                                let bool = itm.roles.includes(rolecode)
                                return !itm.hide && bool ? <Menu.Item key={itm.key}>{itm.label}</Menu.Item> : ''
                            })
                        }
                    </SubMenu>
                }
                return <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
            })
            }


        </Menu>
    )
}
export default connect(({ user }) => ({ user }))(withRouter(SideMenu))