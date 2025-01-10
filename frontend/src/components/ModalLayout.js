import { useState } from "react";
import {NavLink} from "react-router-dom";

import { Modal, Button, Checkbox, Form, Input, Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function ModalLayout() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <button style={{background: "none", border: "none", cursor: "pointer"}} onClick={showModal}>
                <UserOutlined style={{color: "white", fontSize: "20px"}}/>
            </button>
            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <h1 style={{textAlign: "center"}}>Log In</h1>
                <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                    <Form
                        name="login"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            maxWidth: 360,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="">Forgot password</a>
                            </Flex>
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit" onClick={handleCancel}>
                                Log in
                            </Button>
                            <span>You don't have on account? <NavLink to="/registration" onClick={handleCancel}>Sign up</NavLink></span>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}