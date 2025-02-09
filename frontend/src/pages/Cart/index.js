import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import CardInput from "./CardInput";

import {Col, Divider, Row, Flex, Button} from "antd";

export default function Cart() {
    const themeMode = useSelector((state) => state.theme.themeMode);

    return (
        <>
            <Row>
                <Col flex="60%" style={{background: "#ECEDEF", padding: "30px", minHeight: "500px"}}>
                    <h1>Shopping cart</h1>
                    <Divider />

                    <CartItem/>
                </Col>

                <Col flex="40%" style={{background: "#373B4D", color: "#fff", padding: "30px"}} className="hover-animate">
                    <h1>Card Details</h1>
                    <Divider style={{borderColor: "rgba(255,255,255,0.20)"}}/>

                    <CardInput />
                </Col>
            </Row>
        </>
    )
}