import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Spin } from 'antd';
import { bannerAdd } from '@/api/cake'
import ImgUpload from '../../components/ImgUpload';
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

const CakeBannerPub = () => {
    let [loading, setLoading] = useState(false)
    const onFinish = (values) => {//表单提交事件
        // console.log(values);
        setLoading(true);
        bannerAdd(values).then(res => {
            // console.log(res);
            setLoading(false);
        })
    };

    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name='bname'
                    label="活动名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='link'
                    label="活动链接"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='imgurl'
                    label="活动图片"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ImgUpload />
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

export default CakeBannerPub;