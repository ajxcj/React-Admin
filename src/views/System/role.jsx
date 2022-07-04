
import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Spin } from 'antd';
import { roleAdd } from '@/api/user'


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

const RoleManager = () => {
    let [loading, setLoading] = useState(false)
    const onFinish = (values) => {//表单提交事件
        setLoading(true);
        roleAdd(values).then(res => {
            console.log(res);
            setLoading(false);
        })
    };

    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name='rolename'
                    label="角色名称"
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
                    label="角色代号"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div>此处通过Tree组件，动态勾选当前角色能够访问的菜单</div>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default RoleManager;