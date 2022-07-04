
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, InputNumber, Spin, Select } from 'antd';
import { roleGet, userReg } from '@/api/user'
const { Option } = Select

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {//表单验证
    required: '请填写后${label}后再提交',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const UserManager = () => {
    let [loading, setLoading] = useState(false)
    let [roleList, setRoleList] = useState([])
    useEffect(() => {
        roleGet().then(res => {
            setRoleList(res.data.results)
        })
    }, [])
    const onFinish = (values) => {//表单提交事件
        setLoading(true);
        userReg(values).then(res => {
            console.log(res);
            setLoading(false);
        })
    };

    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name='username'
                    label="账号"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='password'
                    label="密码"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='rolecode'
                    label="角色"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        {
                            roleList.map(item => {
                                return <Option value={item.rolecode} key={item.objectId}>{item.rolename}</Option>
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default UserManager;

