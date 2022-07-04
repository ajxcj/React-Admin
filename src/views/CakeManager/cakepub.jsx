import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Spin, Select } from 'antd';
import { cakeAdd } from '@/api/cake'
import RichText from '../../components/RichText';
// import ImgUpload from '../../components/ImgUpload';
import axios from 'axios';
const { Option } = Select;
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

const CakePub = () => {
    let [loading, setLoading] = useState(false)
    const onFinish = (values) => {//表单提交事件
        console.log(values);
        // setLoading(true);
        // bannerAdd(values).then(res => {
        //     // console.log(res);
        //     setLoading(false);
        // })
        //数据转存
        let url = '#'
        axios({
            url,
            headers: {

            }
        }).then(res => {
            // console.log(res);
            cakeAdd(res.data.data.list, values)
        })
    };

    let handleCake = () => {//数据转存
        let url = '#'
        axios({
            url,
            headers: {

            }
        }).then(res => {
            console.log(res);
        })
    }

    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name='cakeid'
                    label="归属分类"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder='请选择分类'
                        style={{
                            width: 120,
                        }}
                    >
                        <Option value="1">蛋糕</Option>
                        <Option value="11">面包</Option>
                        <Option value="6">小食</Option>
                        <Option value="5">配件</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="detail"
                    label="商品详情"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <RichText />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button type="primary" htmlType="submit">
                        数据转存
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default CakePub;