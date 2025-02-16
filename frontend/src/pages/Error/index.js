import { useNavigate } from "react-router-dom";

import { Button, Flex } from "antd";

import "./style.css";

export default function ErrorNotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <div className="errorPage-container">
            <Flex vertical align="center" gap="20px" style={{paddingTop: "4%"}}>
                <h1 className="error-num">404</h1>
                <span className="errorPage-msg">Oops... looks like you got lost</span>
                <Button
                    color="primary"
                    size="large"
                    variant="filled"
                    className="errorPage-btn"
                    onClick={handleClick}
                >
                    Back to Home
                </Button>
            </Flex>
        </div>
    )
};