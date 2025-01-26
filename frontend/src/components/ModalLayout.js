import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser, setLoading, setError } from "../store/slices/authSlice";
import * as Yup from "yup";

import { Modal, Button, Checkbox, Input, Flex } from "antd";
import { LockOutlined, MailOutlined, UserOutlined, CheckCircleFilled } from "@ant-design/icons";

export default function ModalLayout() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [loading, setLoadingState] = useState(false);

    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    });

    const handleSubmit =  async (values, { resetForm }) => {
        dispatch(setLoading(true));
        setLoadingState(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            dispatch(setUser({ email: user.email, uid: user.uid }));
            resetForm();
            setSuccessfulLogin(true);
            setTimeout(() => {
                setOpen(false);
                setSuccessfulLogin(false);
            }, 2000);
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
            setLoadingState(false);
        }
    }

    const showModal = () => {
        if (localStorage.getItem("user")) {
            setOpen(false);
            navigate("/account");
        } else {
            setOpen(true);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <button style={{background: "none", border: "none", cursor: "pointer"}} onClick={showModal}>
                <UserOutlined style={{color: (themeMode === "dark" ? "#ffffff" : "rgba(0,0,0,0.85)"), fontSize: "20px"}}/>
            </button>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, setFieldTouched, isSubmitting, values }) => (

                    <Modal
                        open={open}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        footer={null}
                        loading={loading}
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
                                {(successfulLogin === true ?
                                        <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                                            <CheckCircleFilled style={{color: "green", fontSize: "20px"}}/>
                                            <span>Successful</span>
                                        </div>
                                        : null
                                )}
                                <span>You don't have on account? <NavLink to="/registration" onClick={handleCancel}>Sign up</NavLink></span>
                            </Form>
                        </div>
                    </Modal>
                )}
            </Formik>

        </>
    )
}