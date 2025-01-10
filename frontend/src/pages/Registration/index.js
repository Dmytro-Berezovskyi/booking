import {NavLink} from "react-router-dom";

import ModalLayout from "../../components/ModalLayout";

import {Button, Divider, Flex, Input,} from "antd";
import { MailOutlined } from "@ant-design/icons";

export default function Registration() {
    const openModal = () => {
        return (
            <ModalLayout />
        )
    }

    return (
        <>
            <Flex style={{width: "25%", marginLeft: "auto", marginRight: "auto"}} vertical align="center">
                <h1>Sign Up</h1>
                <Input size="large" style={{marginBottom: "20px" }} placeholder="Pleas anter your email*" prefix={<MailOutlined />}/>
                <Button size="large" type="primary" htmlType="submit" style={{width: "100%", marginBottom: "20px"}}>Continue</Button>
                <span>Already have an account? <a>Sign in</a></span>
                <Divider>or</Divider>
            </Flex>
        </>
    )
}