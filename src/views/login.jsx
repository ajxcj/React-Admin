import React from 'react'
import { Button, Checkbox, Form, Input, Row, Col, Card, Spin } from 'antd';
import { connect } from 'react-redux';
import { user } from '../reducers/user';
import { loginAsync } from '../action/index'

const Login = (props) => {
    // console.log('login组件', props);
    const onFinish = (values) => {
        // console.log('Success:', values);
        props.loginAsync(values, props.history)
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    return (

        <Row align='middle' style={{ background: '#f7f7f7', height: '100vh' }}>
            <Col span={8} offset={8}>
                <Spin spinning={props.user.isLoading}>
                    <Card
                        title="请登录"
                        extra={<a href="#">More</a>}
                    >
                        <Form
                            name="basic"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 20,
                            }}
                            initialValues={{
                                remember: true,
                                username: 'aj',
                                password: '000'
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="账号"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Spin>
            </Col>
        </Row>

    );
};

export default connect(({ user }) => ({ user }), { loginAsync })(Login);