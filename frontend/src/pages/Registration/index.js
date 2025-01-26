import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import * as Yup from "yup";

import { setUser, setLoading, setError } from "../../store/slices/authSlice";

import ModalLayout from "../../components/ModalLayout";

import { Button, Divider, Input, Radio } from "antd";
import {UserOutlined, MailOutlined, LockOutlined, CheckCircleFilled} from "@ant-design/icons";
import { useState } from "react";

const options = [
    {
        label: 'Male',
        value: 'Male',
    },
    {
        label: 'Female',
        value: 'Female',
    },
];

export default function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoadingState] = useState(false);
    const [successfulRegister, setSuccessfulRegister] = useState(false);


    const initialValues = {
        name: "",
        email: "",
        password: "",
        gender: "",
    }

    const handleSubmit= async (values, { resetForm }) => {
        dispatch(setLoading(true));
        setLoadingState(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: values.name,
                gender: values.gender,
                email: values.email,
            });

            dispatch(setUser({ email: user.email, uid: user.uid, name: values.name, gender: values.gender }));
            resetForm();
            setSuccessfulRegister(true)
            setTimeout(() => {
                navigate("/");
            }, 2000)
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
            setLoadingState(false);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        gender: Yup.string().required("Gender is required"),
    })

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, setFieldTouched, values }) => (
                    <Form style={{
                        width: "25%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        <h1>Sign Up</h1>
                        <Field name="name">
                            {({field}) => (
                                <Input {...field} size="large" style={{marginBottom: "20px"}}
                                       placeholder="Pleas enter your name*"
                                       prefix={<UserOutlined />}/>
                            )}
                        </Field>
                        <Field name="email">
                            {({field}) => (
                                <Input {...field} size="large" style={{marginBottom: "20px"}}
                                       placeholder="Pleas enter your email*"
                                       prefix={<MailOutlined/>}/>
                            )}
                        </Field>
                        <ErrorMessage name="email" component="div" style={{color: "red",  marginTop: "-25px"}}/>
                        <Field name="password">
                            {({field}) => (
                                <Input {...field} size="large" style={{marginBottom: "20px"}}
                                       placeholder="Pleas enter password*"
                                       prefix={<LockOutlined/>}/>
                            )}
                        </Field>
                        <ErrorMessage name="password" component="div" style={{color: "red", marginTop: "-25px"}}/>

                        <Field name="gender">
                            {() => (
                                <Radio.Group
                                    block options={options} optionType="button"
                                    onChange={(e) => setFieldValue("gender", e.target.value)}
                                    value={values.gender}
                                    size="medium"
                                    style={{width:'100%', marginBottom:'10px'}}
                                />
                            )}
                        </Field>

                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            style={{width: "100%", marginBottom: "20px"}}
                            loading={loading}
                        >
                            Register
                        </Button>
                        {(successfulRegister === true ?
                            <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "-15px"}}>
                                <CheckCircleFilled style={{color: "green", fontSize: "20px"}}/>
                                <span>Successful</span>
                            </div>
                            : null
                        )}
                        <span>Already have an account? <a>Sign in</a></span>
                        <Divider>or</Divider>
                    </Form>
                )}
            </Formik>
        </>
    )
}