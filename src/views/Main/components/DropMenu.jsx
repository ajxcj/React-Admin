import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { connect } from 'react-redux';
import { loginFail } from '@/action/index'



const DropMenu = (props) => {
    const handleMenuClick = ({ key }) => {
        if (key == 2) {//退出登录
            props.loginFail();//触发状态机-实现退出功能
        }
    };

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: '个人设置',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '退出登录',
                    key: '2',
                    icon: <UserOutlined />,
                }
            ]}
        />
    );

    return (
        <Space wrap>
            <Dropdown.Button overlay={menu}>
                {props.user.userInfo.username}
            </Dropdown.Button>
        </Space>
    )
};

export default connect(({ user }) => ({ user }), { loginFail })(DropMenu);
