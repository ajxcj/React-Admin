//将路由映射关系定义为JSON数据包
import { RedditOutlined, GithubOutlined, OrderedListOutlined, DingtalkOutlined, SettingOutlined } from '@ant-design/icons'
import CakeBannerPub from "../views/CakeBanner/pub"
import CakeBannerList from "../views/CakeBanner/list"
import CakeBannerEdit from '../views/CakeBanner/edit'
import CakePub from "../views/CakeManager/cakepub"
import CakeList from "../views/CakeManager/cakelist"
import DashBoard from '../views/DashBoard'
import Customicon from '../components/Customicon'
import AreaManager from '../views/AreaManeger'
import RoleManager from '../views/System/role'
import UserManager from '../views/System/user_mageger'

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: DashBoard,
        label: '数量统计',
        key: '/admin/dashboard',
        icon: <Customicon icon='icon-fenlei1' />,
        roles: ['root']
    },
    {
        label: '蛋糕管理',
        key: '/admin/cake',
        icon: <Customicon icon='icon-dangao' />,
        roles: ['root', 'admin', 'normal'],
        children: [
            {
                path: '/admin/cake/list',
                component: CakeList,
                label: '蛋糕列表',
                key: '/admin/cake/list',
                roles: ['root', 'admin'],
            },
            {
                path: '/admin/cake/pub',
                component: CakePub,
                label: '蛋糕发布',
                key: '/admin/cake/pub',
                roles: ['root', 'admin', 'normal'],
            },
        ]
    },
    {
        label: '轮播管理',
        key: '/admin/banner',
        icon: <Customicon icon='icon-lunbotuguanli' />,
        roles: ['root', 'admin', 'normal'],
        children: [
            {
                path: '/admin/banner/list',
                component: CakeBannerList,
                label: '轮播列表',
                key: '/admin/banner/list',
                roles: ['root', 'admin', 'normal'],
            },
            {
                path: '/admin/banner/pub',
                component: CakeBannerPub,
                label: '轮播发布',
                key: '/admin/banner/pub',
                roles: ['root', 'admin', 'normal'],
            },
            {
                path: '/admin/banner/edit',
                component: CakeBannerEdit,
                hide: true,
                key: '/admin/banner/edit',
                roles: ['root', 'admin'],
            },
        ]
    },


    {
        path: '/admin/area',
        component: AreaManager,
        label: '配送范围',
        key: '/admin/area',
        icon: <DingtalkOutlined />,
        roles: ['root', 'admin'],
    },
    {
        label: '系统管理',
        key: '/admin/sys',
        icon: <SettingOutlined />,
        roles: ['root'],
        children: [
            {
                path: '/admin/sys/role',
                component: RoleManager,
                label: '角色管理',
                key: '/admin/sys/role',
                roles: ['root'],
            },
            {
                path: '/admin/sys/user',
                component: UserManager,
                label: '用户管理',
                key: '/admin/sys/user',
                roles: ['root'],
            },
        ]
    },
]