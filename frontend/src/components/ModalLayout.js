import {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {auth, db} from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";

import { setUser, setLoading, setError } from "../store/slices/authSlice";

import { Modal, Button, Checkbox, Input, Flex } from "antd";
import { LockOutlined, MailOutlined, UserOutlined, CheckCircleFilled } from "@ant-design/icons";

import "./style.css";

export default function ModalLayout() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user);
    const [userData, setUserData] = useState(false);

    const [open, setOpen] = useState(false);

    const [loading, setLoadingState] = useState(false);

    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser || !currentUser.user || !currentUser.user.uid) {
                return;
            }

            const docRef = doc(db, "users", currentUser.user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        };
        fetchUserData();
    }, [currentUser]);

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
            {(localStorage.getItem("user") ? <span>Hello {userData.name}!</span> : null)}
            <Button onClick={showModal} className="custom-button" icon={<UserOutlined className="custom-icon" />}>
                <span className="custom-text">Account</span>
            </Button>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, setFieldTouched, isSubmitting, values }) => (

                    <Modal
                        open={open}
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