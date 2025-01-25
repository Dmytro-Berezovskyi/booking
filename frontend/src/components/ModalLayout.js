import { useState } from "react";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth } from "../firebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";

import { Modal, Button, Checkbox, Input, Flex } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

export default function ModalLayout() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const users = useSelector((state) => state.users);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    }

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email =
                <div>
                    <span>Enter your email address</span>
                </div>
        }

        if (!values.password) {
            errors.password =
                <div>
                    <span>Enter your password</span>
                </div>
        }

        return errors;
    }
    console.log(users);
    const handleLogin =  async (values, { resetForm }) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            alert("Login successful!");
            resetForm();
            setOpen(false);
        } catch (err) {
            alert("Login failed: " + err.message);
            console.log(err);
        }
        //setSubmitting(false);
    }

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
                <UserOutlined style={{color: (themeMode === "dark" ? "#ffffff" : "rgba(0,0,0,0.85)"), fontSize: "20px"}}/>
            </button>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleLogin}
            >
                {({ setFieldValue, setFieldTouched, isSubmitting, values }) => (

                    <Modal
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <h1 style={{textAlign: "center"}}>Log In</h1>
                        <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                            <Form style={{maxWidth: "360px", display: "flex", flexDirection: "column", gap: "25px"}}>

                                <Flex vertical gap="2px">
                                    <Field name="email">
                                        {({field}) => (
                                            <Input {...field} prefix={<MailOutlined />} placeholder="Email"/>
                                        )}
                                    </Field>
                                    <ErrorMessage name="email" component="div" style={{color: "red"}}/>
                                </Flex>

                                <Flex vertical gap="2px">
                                    <Field name="password">
                                        {({field}) => (
                                            <Input {...field} prefix={<LockOutlined />} type="password" placeholder="Password"/>
                                        )}
                                    </Field>
                                    <ErrorMessage name="password" component="div" style={{color: "red"}}/>
                                </Flex>

                                <Flex justify="space-between" align="center">
                                    <Checkbox>Remember me</Checkbox>
                                    <a href="">Forgot password</a>
                                </Flex>

                                <Button block type="primary" htmlType="submit" loading={isSubmitting}>
                                    Log in
                                </Button>
                                <span>You don't have on account? <NavLink to="/registration" onClick={handleCancel}>Sign up</NavLink></span>
                            </Form>
                        </div>
                    </Modal>
                )}
            </Formik>

        </>
    )
}