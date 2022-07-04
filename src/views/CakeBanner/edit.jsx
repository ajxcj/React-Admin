import React, { useState, useEffect } from 'react'
import { Button, Form, Input, InputNumber, Spin } from 'antd';
import { bannerUpdate } from '@/api/cake'
import ImgUpload from '../../components/ImgUpload';
import qs from 'query-string';
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

const CakeBannerEdit = (props) => {
    let [loading, setLoading] = useState(false)
    let [form] = Form.useForm()
    // useEffect(() => {
    // console.log('BannerEdit的props', props);
    let { search } = props.location
    let obj = qs.parse(search)
    form.setFieldsValue(obj)
    // }, [])
    const onFinish = (values) => {//表单提交事件
        // console.log(obj.objectId, values);
        // setLoading(true);
        bannerUpdate(obj.objectId, values).then(res => {
            // console.log(res);
            setLoading(false);
            props.history.goBack();
        })
    };

    return (
        <Spin spinning={loading}>
            <Form {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
            >
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
                        确认修改
                    </Button>
                    <Button onClick={() => {
                        form.resetFields();
                    }}>重置表单</Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default CakeBannerEdit;