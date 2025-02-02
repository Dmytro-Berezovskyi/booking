import { useSelector } from "react-redux";

import CartItem from "./CartItem";

import { Col, Divider, Row, Flex } from "antd";

export default function Cart() {
    const themeMode = useSelector((state) => state.theme.themeMode);

    return (
        <>
            <Row>
                <Col flex={3} style={{background: "#ECEDEF", padding: "30px", minHeight: "500px"}}>
                    <h1>Shopping cart</h1>
                    <Divider />

                    <Flex vertical gap="20px">
                        <CartItem/>
                    </Flex>
                </Col>

                <Col flex={2} style={{background: "#373B4D", color: "#fff", padding: "30px"}}>
                    <h1>Card Details</h1>
                    <Divider style={{borderColor: "rgba(255,255,255,0.20)"}}/>
                </Col>
            </Row>

        </>
    )
}