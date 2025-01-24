import { useDispatch } from "react-redux";
import {Form, Field, Formik} from "formik";

import { pushUser } from "../../store/slices/authSlice";

import ModalLayout from "../../components/ModalLayout";

import {Button, Divider, Flex, Input,} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function Registration() {
    const dispatch = useDispatch();

    const initialValues = {
        email: null,
        password: null,
    }

    const handleRegistration = (values, { resetForm }) => {
        dispatch(pushUser(values));

        resetForm();
    };

    const validate = (values) => {

    }

    const openModal = () => {
        return (
            <ModalLayout />
        )
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleRegistration}
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
                        <Field name="email">
                            {({field}) => (
                                <Input {...field} size="large" style={{marginBottom: "20px"}}
                                       placeholder="Pleas anter your email*"
                                       prefix={<MailOutlined/>}/>
                            )}
                        </Field>
                        <Field name="password">
                            {({field}) => (
                                <Input {...field} size="large" style={{marginBottom: "20px"}}
                                       placeholder="Pleas anter password*"
                                       prefix={<LockOutlined/>}/>
                            )}
                        </Field>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            style={{width: "100%", marginBottom: "20px"}}
                        >
                            Continue
                        </Button>
                        <span>Already have an account? <a>Sign in</a></span>
                        <Divider>or</Divider>
                    </Form>
                )}
            </Formik>
            <Flex style={{width: "25%", marginLeft: "auto", marginRight: "auto"}} vertical align="center">
                <h1>Sign Up</h1>
                <Input size="large" style={{marginBottom: "20px" }} placeholder="Pleas anter your email*" prefix={<MailOutlined />}/>
                <Input size="large" style={{marginBottom: "20px" }} placeholder="Pleas anter password*" prefix={<LockOutlined />}/>
                <Button size="large" type="primary" htmlType="submit" style={{width: "100%", marginBottom: "20px"}} onClick={handleRegistration}>Continue</Button>
                <span>Already have an account? <a>Sign in</a></span>
                <Divider>or</Divider>
            </Flex>
        </>
    )
}