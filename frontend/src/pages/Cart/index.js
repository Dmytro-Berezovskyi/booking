import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import CardInput from "./CardInput";

import {Col, Divider, Row, Flex, Button} from "antd";
import {useState} from "react";

export default function Cart() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const [clickedDetails, setClickedDetails] = useState(false);
    const [clickedCart, setClickedCart] = useState(true);

    const handleClickDetails = () => {
        setClickedDetails(true);
        setClickedCart(false);
    }
    const handleClickCart = () => {
        setClickedDetails(false);
        setClickedCart(true);
    }

    return (
        <>
            <Row>
                <Col
                    style={{
                        background: "#ECEDEF",
                        padding: "30px",
                        minHeight: "500px",
                        width: clickedCart ? "60%" : "40%",
                        transition: "width 0.8s ease"
                }}
                    onClick={handleClickCart}
                >
                    <h1>Shopping cart</h1>
                    <Divider />

                    <CartItem/>
                </Col>

                <Col style={{
                    background: "#373B4D",
                    color: "#fff",
                    padding: "30px",
                    width: clickedDetails ? "60%" : "40%",
                    transition: "width 0.8s ease"
                }}
                     onClick={handleClickDetails}
                >
                    <h1>Card Details</h1>
                    <Divider style={{borderColor: "rgba(255,255,255,0.20)"}}/>

                    <CardInput />
                </Col>
            </Row>
        </>
    )
}