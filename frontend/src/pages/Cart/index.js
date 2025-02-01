import { useSelector } from "react-redux";

import { Col, Divider, Row, Flex } from "antd";

export default function Cart() {
    const themeMode = useSelector((state) => state.theme.themeMode);

    return (
        <>
            <Row>
                <Col flex={3} style={{background: "#ECEDEF", padding: "20px", minHeight: "500px"}}>
                    <h1>Your shopping cart</h1>
                    <Divider />

                    <Flex vertical>
                        <span style={{
                            color: "rgba(17,17,17,0.2)",
                            fontSize: "20px",
                        }}>
                            Shopping cart empty
                        </span>
                    </Flex>
                </Col>

                <Col flex={2} style={{background: "#373B4D", color: "#fff", padding: "20px"}}>
                    <h1>Card Details</h1>
                    <Divider style={{borderColor: "rgba(255,255,255,0.20)"}}/>
                </Col>
            </Row>

        </>
    )
}