import {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {auth, db} from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";

import { logIn, setLoading, setError, openModal, saveUserData } from "../../store/slices/authSlice";

import { Modal, Button, Checkbox, Input, Flex } from "antd";
import { LockOutlined, MailOutlined, CheckCircleFilled } from "@ant-design/icons";

import "./style.css";

export default function ModalLogIn() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.user);
    const open = useSelector(state => state.user.openModal);

    const [loading, setLoadingState] = useState(false);

    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser?.uid) {
                return;
            }

            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                dispatch(saveUserData(docSnap.data()));
                localStorage.setItem("userData", JSON.stringify(docSnap.data()));
            }

        };
        fetchUserData();
    }, [currentUser, dispatch]);


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

            dispatch(logIn({ email: user.email, uid: user.uid }));
            resetForm();
            setSuccessfulLogin(true);
            setTimeout(() => {
                dispatch(openModal(false));
                setSuccessfulLogin(false);
            }, 2000);
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
            setLoadingState(false);
        }
    }

    const handleCancel = () => {
        dispatch(openModal(false));
    };

    return (
        <>
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